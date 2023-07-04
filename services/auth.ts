import { doc, setDoc } from 'firebase/firestore';
import { DB } from '../enums/db';
import db from '../firebase/db';
import { generateErrorMessage } from '../helpers/error';
import { UserInterface } from '../types/user';
import { User } from 'firebase/auth';

export async function recordUserToDB(user: User) {
  try {
    const docRef = doc(db, DB.USERS, user.uid);

    const userDocument: UserInterface = {
      displayName: user.displayName ?? '-',
      email: user.email ?? '-',
    };
    await setDoc(docRef, userDocument, {
      merge: true,
    });
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with saving your account.'
    );

    throw new Error(message);
  }
}
