import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';
import { Transaction } from '../types/transaction';
import { Message } from '../types/messages';

/**
 *
 * @param transaction - Transaction object
 * @param msg - Message object
 *
 * @throws Error if transaction is not found based on sellerEmail and buyerEmail
 *
 * this function adds a message object to the 'chats' sub-collection in a transaction
 */
export async function sendMessage(transaction: Transaction, msg: Message) {
  // find the transaction path\
  const transactionCollection = collection(db, DB.TRANSACTIONS);
  const transactionQuery = query(
    transactionCollection,
    where('sellerEmail', '==', transaction.sellerEmail),
    where('buyerEmail', '==', transaction.buyerEmail)
  );

  const transactionSnapshot = await getDocs(transactionQuery);
  if (!transactionSnapshot.empty) {
    const transactionDocument =
      transactionSnapshot.docs[0].data() as Transaction;
    const transactionId = transactionSnapshot.docs[0].id;

    transactionDocument.lastMessage = msg.text;
    transactionDocument.date = new Date();

    // update last message
    const transactionRef = doc(db, DB.TRANSACTIONS, transactionId);
    await updateDoc(transactionRef, {
      ...transactionDocument,
    });

    // find the transaction/chats path
    // add a message
    const chatsRef = collection(db, DB.TRANSACTIONS, transactionId, DB.CHATS);
    await addDoc(chatsRef, msg);
  } else {
    throw new Error(
      `Transaction for product: ${transaction.product.title} was not found.`
    );
  }
}
