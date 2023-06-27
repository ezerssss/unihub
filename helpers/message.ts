import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';
import { Transaction } from '../types/transaction';
import { Message } from '../types/messages';
import { User } from 'firebase/auth';
import { getUserDocID } from './user';

export async function getTransactionDocID(
  email: string,
  transaction: Transaction
): Promise<string> {
  const { buyerEmail, sellerEmail, product } = transaction;
  const { title } = product;
  const userDocID = await getUserDocID(email);

  if (!userDocID) {
    return '';
  }

  const transactionsCollectionRef = collection(
    db,
    DB.USERS,
    userDocID,
    DB.TRANSACTIONS
  );
  const transactionQuery = query(
    transactionsCollectionRef,
    where('buyerEmail', '==', buyerEmail),
    where('sellerEmail', '==', sellerEmail),
    where('product.title', '==', title)
  );
  const querySnapshot = await getDocs(transactionQuery);

  if (querySnapshot.empty) {
    return '';
  }

  const doc = querySnapshot.docs[0];

  return doc.id;
}

async function handleDBUpdate(
  transaction: Transaction,
  chat: Message,
  email: string,
  userUID: string,
  isSeen: boolean
) {
  const { content } = chat;

  const transactionDocID = await getTransactionDocID(email, transaction);
  const transactionRef = doc(
    db,
    DB.USERS,
    userUID,
    DB.TRANSACTIONS,
    transactionDocID
  );

  await setDoc(
    transactionRef,
    {
      isSeen,
      lastMessage: content,
    },
    { merge: true }
  );

  const ownChatCollectionRef = collection(
    db,
    DB.USERS,
    userUID,
    DB.TRANSACTIONS,
    transactionDocID,
    DB.CHATS
  );

  await addDoc(ownChatCollectionRef, chat);
}

export async function sendMessage(
  transaction: Transaction,
  chat: Message,
  user: User
) {
  const { sellerEmail, buyerEmail } = transaction;

  try {
    if (!user.email) {
      throw new Error('User email not found!');
    }

    await handleDBUpdate(transaction, chat, user.email, user.uid, true);

    let otherEmail = sellerEmail;
    if (otherEmail === user.email) {
      otherEmail = buyerEmail;
    }
    const otherUID = await getUserDocID(otherEmail);
    await handleDBUpdate(transaction, chat, sellerEmail, otherUID, false);
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong with sending your message.');
  }
}
