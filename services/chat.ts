import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getTransactionDocID } from '../helpers/message';
import { Transaction } from '../types/transaction';
import db from '../firebase/db';
import { DB } from '../enums/db';
import { generateErrorMessage } from '../helpers/error';
import { Message } from '../types/messages';
import { User } from 'firebase/auth';
import { getUserDocID } from '../helpers/user';

export async function seenMessages(
  email: string,
  uid: string,
  transaction: Transaction
) {
  try {
    const transactionDocID = await getTransactionDocID(email, transaction);

    const transactionDocRef = doc(
      db,
      DB.USERS,
      uid,
      DB.TRANSACTIONS,
      transactionDocID
    );

    await updateDoc(transactionDocRef, { isSeen: true });
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      'Something went wrong with handling the messages.',
      error
    );
    throw new Error(message);
  }
}

async function updateChatCollection(
  transaction: Transaction,
  chat: Message,
  email: string,
  uid: string,
  isSeen: boolean
) {
  const { content } = chat;

  const transactionDocID = await getTransactionDocID(email, transaction);
  const transactionRef = doc(
    db,
    DB.USERS,
    uid,
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
    uid,
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

    await updateChatCollection(transaction, chat, user.email, user.uid, true);

    let otherEmail = sellerEmail;
    if (otherEmail === user.email) {
      otherEmail = buyerEmail;
    }
    const otherUID = await getUserDocID(otherEmail);
    await updateChatCollection(transaction, chat, otherEmail, otherUID, false);
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      'Something went wrong with sending your message.',
      error
    );

    throw new Error(message);
  }
}
