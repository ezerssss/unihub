import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ContentWrapper from '../../components/ContentWrapper';
import ArrowIcon from '../../components/icons/ArrowIcon';
import EmojiIcon from '../../components/icons/EmojiIcon';
import ReturnIcon from '../../components/icons/ReturnIcon';
import { Message } from '../../types/messages';
import useGoBack from '../../hooks/useGoBack';
import { formatTime } from '../../helpers/date';
import AuthWrapper from '../../components/AuthWrapper';
import { Transaction } from '../../types/transaction';
import { sendMessage } from '../../interactors/sendMessage';

function Chat(transaction: Transaction) {
  const goBack = useGoBack();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  async function handleSend() {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage: Message = {
      _id: messages.length + 1,
      text: inputText,
      user: { _id: 1 },
      createdAt: new Date(),
    };

    try {
      await sendMessage(transaction, newMessage);
    } catch (error) {
      alert((error as Error).message);
    }

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
  }

  const renderMessages = messages.map((message) => {
    const textBackground = message.user._id === 1 ? 'bg-white' : 'bg-blue-900';
    const textAlign = message.user._id === 1 ? 'self-end' : 'self-start';
    const messageStyle =
      message.user._id === 1 ? 'text-gray-900' : 'text-white';
    const dateTextStyle = `text-${
      message.user._id === 1 ? 'gray-500' : 'gray-900'
    } text-xs self-end`;

    return (
      <View
        className={`${textBackground} mb-4 rounded-2xl p-4 ${textAlign}`}
        key={message._id}
      >
        <Text className={messageStyle}>{message.text}</Text>
        <Text className={dateTextStyle}>{formatTime(message.createdAt)}</Text>
      </View>
    );
  });

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
            <Text className="text-2xl font-bold text-gray-900">TedTeddy</Text>
          </View>
          <ScrollView className="flex-grow p-4">{renderMessages}</ScrollView>
          <View className="h-24 flex-row items-center bg-white p-4">
            <View className="mr-4">
              <TouchableOpacity>
                <EmojiIcon />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TextInput
                className="h-10 rounded-lg bg-white px-4"
                placeholder="Type a message..."
                value={inputText}
                onChangeText={setInputText}
              />
            </View>
            <View className="ml-4">
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-white"
                onPress={handleSend}
              >
                <ArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Chat;
