import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ContentWrapper from '../../components/ContentWrapper';
import ArrowIcon from '../../components/icons/ArrowIcon';
import { StatusEnum } from '../../enums/status';
import ReturnIcon from '../../components/icons/ReturnIcon';
import { Message } from '../../types/messages';
import useGoBack from '../../hooks/useGoBack';
import { formatTime } from '../../helpers/date';
import AuthWrapper from '../../components/AuthWrapper';
import { getTransactionDocID } from '../../helpers/message';
import { ChatNavigationProps } from '../../types/navigation';
import UserContext from '../../context/UserContext';
import {
  Timestamp,
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import TransactionButton from './TransactionButton';
import { seenMessages, sendMessage } from '../../services/chat';
import { generateErrorMessage } from '../../helpers/error';

function Chat({ route }: ChatNavigationProps) {
  const { user } = useContext(UserContext);
  const { transaction } = route.params;
  const { product } = transaction;
  const { seller } = product;

  const goBack = useGoBack();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [transactionID, setTransactionID] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatEnabled, setChatEnabled] = useState(true);

  const handleGetTransactionDocID = useCallback(getTransactionDocID, [
    user?.email,
    transaction,
  ]);

  useEffect(() => {
    (async () => {
      if (!user?.email) {
        return;
      }

      const transactID = await handleGetTransactionDocID(
        user.email,
        transaction
      );
      setTransactionID(transactID);
    })();
  }, [user]);

  const handleSeenMessages = useCallback(
    async (unsubscribe: Unsubscribe) => {
      try {
        if (!user?.email) {
          return;
        }

        await seenMessages(user.email, user.uid, transaction);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      } finally {
        unsubscribe();
      }
    },
    [user?.email, user?.uid, transaction]
  );

  useEffect(() => {
    if (!user || !transactionID) {
      return;
    }

    const chatsCollectionRef = collection(
      db,
      DB.USERS,
      user.uid,
      DB.TRANSACTIONS,
      transactionID,
      DB.CHATS
    );

    const q = query(chatsCollectionRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatArray: Message[] = [];

      querySnapshot.forEach((doc) => {
        chatArray.push(doc.data() as Message);
      });

      setMessages(chatArray);
      setIsLoading(false);
    });

    return () => {
      handleSeenMessages(unsubscribe);
    };
  }, [user, transactionID]);

  const handleSend = useCallback(async () => {
    if (inputText.trim() === '' || !user?.email || !isChatEnabled) {
      return;
    }

    try {
      setIsSending(true);
      setInputText('');

      const newMessage: Message = {
        content: inputText,
        from: user.email,
        date: new Date(),
      };
      await sendMessage(transaction, newMessage, user);
    } catch (error) {
      const message = generateErrorMessage(error);
      alert(message);
    } finally {
      setIsSending(false);
    }
  }, [inputText, transaction, user, isChatEnabled]);

  function handleRender(message: Message) {
    const { content, from, date } = message;
    const textBackground = from === user?.email ? 'bg-white' : 'bg-blue-900';
    const textAlign = from === user?.email ? 'self-end' : 'self-start';
    const messageStyle = from === user?.email ? 'text-gray-900' : 'text-white';
    const dateTextStyle = `text-${
      from === user?.email ? 'gray-500' : 'blue-500'
    } text-xs self-end`;
    const dateObject = (date as unknown as Timestamp).toDate();

    return (
      <View
        className={`${textBackground} mb-4 rounded-2xl p-4 ${textAlign}`}
        key={content}
      >
        <Text className={messageStyle}>{content}</Text>
        <Text className={dateTextStyle}>{formatTime(dateObject)}</Text>
      </View>
    );
  }

  const renderLoading = isLoading && (
    <ActivityIndicator className="mt-5" size="large" />
  );
  const renderButton = isSending ? <ActivityIndicator /> : <ArrowIcon />;
  const renderTransactionButton = user?.email === transaction.sellerEmail && (
    <TransactionButton transaction={transaction} />
  );

  let otherName = seller;
  if (otherName === user?.displayName) {
    otherName = transaction.buyer;
  }

  if (
    transaction.status === StatusEnum.SUCCESS ||
    transaction.status === StatusEnum.DENY
  ) {
    setChatEnabled(false);
  }

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <View className="flex-1 bg-secondary-400">
          <View className="mt-10 flex-row items-center justify-center bg-yellow-50 p-4">
            <View className="absolute left-0">
              <TouchableOpacity className="ml-4" onPress={goBack}>
                <ReturnIcon />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-gray-900">
              {otherName}
            </Text>
          </View>
          {renderLoading}
          <FlatList
            inverted
            className="p-4"
            data={messages}
            renderItem={({ item }) => handleRender(item)}
          />
          {renderTransactionButton}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View className="h-24 flex-row items-center bg-white p-4">
              <View className="flex-1">
                <TextInput
                  className="h-10 rounded-lg bg-white px-4"
                  editable={isChatEnabled}
                  placeholder="Type a message..."
                  value={inputText}
                  onChangeText={setInputText}
                />
              </View>
              <View className="ml-4">
                <TouchableOpacity
                  className="h-10 w-10 items-center justify-center rounded-full bg-white"
                  disabled={isSending || !isChatEnabled}
                  onPress={handleSend}
                >
                  {renderButton}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Chat;
