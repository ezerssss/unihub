import { collection, getDocs, query, where } from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';
import { Transaction } from '../types/transaction';
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
