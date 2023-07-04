import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DB } from '../enums/db';
import { StatusEnum } from '../enums/status';
import db from '../firebase/db';
import { getTransactionDocID } from '../helpers/message';
import { getStatusSellerText } from '../helpers/status';
import { getUserDocID } from '../helpers/user';
import { Message } from '../types/messages';
import { Transaction } from '../types/transaction';
import { sendMessage } from './chat';
import { User } from 'firebase/auth';
import { generateErrorMessage } from '../helpers/error';
import { uploadProductPhotos } from './product';
import { Categories } from '../enums/categories';
import { Product } from '../types/product';

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

    await updateDoc(sellerDocRef, { status: newStatus });
    await updateDoc(buyerDocRef, { status: newStatus, isSeen: false });

    const message: Message = {
      content: getStatusSellerText(newStatus, user.displayName ?? '-'),
      from: user.email ?? '-',
      date: new Date(),
    };

    await sendMessage(transaction, message, user);
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with updating the status of the product.'
    );

    throw new Error(message);
  }
}

export async function sell(
  imageURIs: string[],
  title: string,
  price: string,
  description: string,
  selectedCategory: string,
  time: Date,
  location: string,
  user: User
): Promise<Product> {
  try {
    const images = await uploadProductPhotos(imageURIs);

    const product: Product = {
      images,
      title,
      price: parseFloat(price),
      description,
      category: selectedCategory as Categories,
      meetup: {
        time,
        location,
      },
      seller: user?.displayName ?? '-',
    };

    const productsRef = collection(db, DB.PRODUCTS);
    const userRef = collection(db, DB.USERS, user.uid, DB.PRODUCTS);

    await addDoc(productsRef, product);
    await addDoc(userRef, product);

    return product;
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with posting your product.'
    );

    throw new Error(message);
  }
}

export async function buy(product: Product, user: User): Promise<Transaction> {
  try {
    const userRef = collection(db, DB.USERS);
    const sellerQuery = query(
      userRef,
      where('displayName', '==', product.seller)
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
    };

    const buyerRef = collection(db, DB.USERS, buyer.uid, DB.TRANSACTIONS);
    const sellerRef = collection(db, DB.USERS, sellerUid, DB.TRANSACTIONS);

    const pendingTransactionQuery = query(
      sellerRef,
      where('product.title', '==', product.title),
      where('sellerEmail', '==', sellerEmail),
      where('buyerEmail', '==', buyerEmail)
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
  user: User
): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  const { title, seller } = product;

  const sellerTransactionsRef = collection(
    db,
    DB.USERS,
    user.uid,
    DB.TRANSACTIONS
  );
  const transactionQuery = query(
    sellerTransactionsRef,
    where('product.title', '==', title),
    where('product.seller', '==', seller),
    where('status', '!=', StatusEnum.SUCCESS)
  );

  const transactionsSnapshot = await getDocs(transactionQuery);

  return transactionsSnapshot.docs;
}
