import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DB } from '../enums/db';
import { StatusEnum } from '../enums/status';
import db from '../firebase/db';
import { getTransactionDocID } from '../helpers/message';
import {
  getNextStatusText,
  getNotificationSellerText,
  getStatusSellerText,
} from '../helpers/status';
import { getUserDocID } from '../helpers/user';
import { Message } from '../types/messages';
import { Transaction } from '../types/transaction';
import { sendMessage } from './chat';
import { User } from 'firebase/auth';
import { generateErrorMessage } from '../helpers/error';
import { Product } from '../types/product';

import { saveAsSearchableItem } from './search';
import { sendProductPushNotification } from './notification';

interface BuyerAndSellerTransactionRef {
  buyerDocRef: DocumentReference<DocumentData>;
  sellerDocRef: DocumentReference<DocumentData>;
}

export async function getBuyerAndSellerTransactionRef(
  user: User,
  transaction: Transaction
): Promise<BuyerAndSellerTransactionRef> {
  const { buyerEmail, sellerEmail } = transaction;

  const sellerTransactionDocID = await getTransactionDocID(
    sellerEmail,
    transaction
  );
  const buyerTransactionDocID = await getTransactionDocID(
    buyerEmail,
    transaction
  );

  const sellerDocRef = doc(
    db,
    DB.USERS,
    user.uid,
    DB.TRANSACTIONS,
    sellerTransactionDocID
  );

  const buyerUid = await getUserDocID(buyerEmail);
  const buyerDocRef = doc(
    db,
    DB.USERS,
    buyerUid,
    DB.TRANSACTIONS,
    buyerTransactionDocID
  );

  return {
    buyerDocRef,
    sellerDocRef,
  };
}

export async function updateTransactionProduct(
  user: User,
  transaction: Transaction,
  product: Product
) {
  try {
    const { buyerDocRef, sellerDocRef } = await getBuyerAndSellerTransactionRef(
      user,
      transaction
    );

    await updateDoc(buyerDocRef, { product });
    await updateDoc(sellerDocRef, { product });
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with updating the product.'
    );

    throw new Error(message);
  }
}

export async function updateTransactionStatus(
  user: User,
  transaction: Transaction,
  newStatus: StatusEnum
) {
  try {
    const { sellerDocRef, buyerDocRef } = await getBuyerAndSellerTransactionRef(
      user,
      transaction
    );

    const { buyerExpoPushToken } = transaction;

    await updateDoc(sellerDocRef, { status: newStatus });
    await updateDoc(buyerDocRef, { status: newStatus, isSeen: false });

    const automatedMessage: Message = {
      content: getStatusSellerText(newStatus),
      from: user.email ?? '-',
      date: new Date(),
      isAutomated: true,
    };

    await sendMessage(transaction, automatedMessage, user);

    const nextStatusText = getNextStatusText(newStatus);
    if (nextStatusText) {
      const secondAutomatedMessage: Message = {
        content: nextStatusText,
        from: user.email ?? '-',
        date: new Date(),
        isAutomated: true,
      };

      await sendMessage(transaction, secondAutomatedMessage, user);
    }

    if (buyerExpoPushToken) {
      await sendProductPushNotification(
        buyerExpoPushToken,
        getNotificationSellerText(newStatus, user.displayName ?? '-'),
        'Your order status has been updated.',
        transaction
      );
    }
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with updating the status of the product.'
    );

    throw new Error(message);
  }
}

export async function sell(product: Product, user: User) {
  try {
    const productsRef = collection(db, DB.PRODUCTS);
    const userRef = collection(db, DB.USERS, user.uid, DB.PRODUCTS);

    const { id } = await addDoc(productsRef, product);
    await addDoc(userRef, product);
    await saveAsSearchableItem(product, id);
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with posting your product.'
    );

    throw new Error(message);
  }
}

export async function buy(
  product: Product,
  user: User,
  expoPushToken?: string
): Promise<Transaction> {
  try {
    const userRef = collection(db, DB.USERS);
    const sellerQuery = query(
      userRef,
      where('displayName', '==', product.seller),
      limit(1)
    );

    const sellerSnapshot = await getDocs(sellerQuery);
    if (sellerSnapshot.empty) {
      throw new Error('Seller not found');
    }

    const seller = sellerSnapshot.docs[0].data() as User;
    const sellerEmail = seller.email ?? '';
    const sellerUid = sellerSnapshot.docs[0].id;

    const buyer = user;
    const buyerDisplayName = buyer.displayName ?? '';
    const buyerEmail = buyer?.email ?? '';

    const transaction: Transaction = {
      buyer: buyerDisplayName,
      buyerEmail: buyerEmail,
      date: new Date(),
      isSeen: false,
      lastMessage: `${buyerDisplayName} has sent a buy request.`,
      product: product,
      sellerEmail,
      status: StatusEnum.CONFIRM,
      ...(expoPushToken && { buyerExpoPushToken: expoPushToken }),
    };

    const buyerRef = collection(db, DB.USERS, buyer.uid, DB.TRANSACTIONS);
    const sellerRef = collection(db, DB.USERS, sellerUid, DB.TRANSACTIONS);

    const pendingTransactionQuery = query(
      sellerRef,
      where('product.title', '==', product.title),
      where('sellerEmail', '==', sellerEmail),
      where('buyerEmail', '==', buyerEmail),
      where('status', '!=', StatusEnum.SUCCESS),
      limit(1)
    );

    const pendingTransactionSnapshot = await getDocs(pendingTransactionQuery);

    if (!pendingTransactionSnapshot.empty) {
      throw new Error(
        'You already have a pending transaction for this product.'
      );
    }

    await addDoc(buyerRef, transaction);
    await addDoc(sellerRef, transaction);

    const firstMessage: Message = {
      content: `${buyerDisplayName} has sent a buy request.`,
      from: buyerEmail,
      date: new Date(),
    };

    await sendMessage(transaction, firstMessage, user);

    const { sellerExpoPushToken } = product;

    if (sellerExpoPushToken) {
      await sendProductPushNotification(
        sellerExpoPushToken,
        `${buyerDisplayName} has sent a buy request for the ${product.title}`,
        'You got an order.',
        transaction
      );
    }

    return transaction;
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;

    if (
      errorMessage ===
      'You already have a pending transaction for this product.'
    ) {
      throw new Error(errorMessage);
    }

    const message = generateErrorMessage(
      error,
      'Something went wrong with posting your product.'
    );

    throw new Error(message);
  }
}

export async function getAllProductTransactionsDocs(
  product: Product,
  user: User,
  excludeMeetupTransactions?: boolean
): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  const { title, seller } = product;

  const sellerTransactionsRef = collection(
    db,
    DB.USERS,
    user.uid,
    DB.TRANSACTIONS
  );

  let transactionQuery = query(
    sellerTransactionsRef,
    where('product.title', '==', title),
    where('product.seller', '==', seller)
  );

  if (excludeMeetupTransactions) {
    transactionQuery = query(
      transactionQuery,
      where('status', '!=', StatusEnum.MEETUP)
    );
  } else {
    transactionQuery = query(
      transactionQuery,
      where('status', '!=', StatusEnum.SUCCESS)
    );
  }

  const transactionsSnapshot = await getDocs(transactionQuery);

  return transactionsSnapshot.docs;
}
