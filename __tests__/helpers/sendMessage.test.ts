import { doc, getDoc } from 'firebase/firestore';
import { DB } from '../../enums/db';
import { Message } from '../../types/messages';
import db from '../../firebase/db';
import { firebaseConfig } from '../../firebase/firebase';

// disable test muna as of now
describe('sendMessage', () => {
  it("should send a message to the transaction's chats collection", async () => {
    // eslint-disable-next-line no-console
    console.log(firebaseConfig);

    const transaction = doc(db, DB.TRANSACTIONS, 'MQ36lOHMqJMDCh0ZFGYb');
    const transactionSnap = await getDoc(transaction);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newMessage: Message = {
      content: 'hello babbyy',
      from: 'eimagbanua@up.edu.ph',
      date: new Date(),
    };

    const transactionData = transactionSnap.data();
    // eslint-disable-next-line no-console
    console.log(transactionData);

    if (transactionData) {
      // await sendMessage(transactionData as Transaction, newMessage);
    } else {
      fail('transaction not found');
    }
  });
});
