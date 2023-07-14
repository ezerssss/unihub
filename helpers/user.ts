import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';

export async function getUserDocID(email: string): Promise<string> {
  const usersCollectionRef = collection(db, DB.USERS);
  const userQuery = query(
    usersCollectionRef,
    where('email', '==', email),
    limit(1)
  );
  const querySnapshot = await getDocs(userQuery);

  if (querySnapshot.empty) {
    return '';
  }

  const doc = querySnapshot.docs[0];

  return doc.id;
}
