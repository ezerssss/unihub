import { doc, getDoc } from 'firebase/firestore';
import { DB } from '../../enums/db';
import { sendMessage } from '../../helpers/sendMessage';
import { Message } from '../../types/messages';
import db from '../../firebase/db';
import { Transaction } from '../../types/transaction';
import { firebaseConfig } from '../../firebase/firebase';

describe('sendMessage', () => {
  it("should send a message to the transaction's chats collection", async () => {
    console.log(firebaseConfig);

    const transaction = doc(db, DB.TRANSACTIONS, 'MQ36lOHMqJMDCh0ZFGYb');
    const transactionSnap = await getDoc(transaction);

    const newMessage: Message = {
      _id: 0,
      text: 'hello babbyy',
      user: {
        _id: 0,
      },
      createdAt: new Date(),
    };

    const transactionData = transactionSnap.data();
    console.log(transactionData);

    if (transactionData) {
      await sendMessage(transactionData as Transaction, newMessage);
    } else {
      fail('transaction not found');
    }
  });
});
