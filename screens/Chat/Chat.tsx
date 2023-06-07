import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ContentWrapper from '../../components/ContentWrapper';
import ArrowIcon from '../../components/ArrowIcon';
import EmojiIcon from '../Icons/components/EmojiIcon';
import ReturnIcon from '../Icons/components/ReturnIcon';

interface Message {
  _id: number;
  text: string;
  user: {
    _id: number;
  };
  createdAt: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const onSend = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage: Message = {
      _id: messages.length + 1,
      text: inputText,
      user: { _id: 1 },
      createdAt: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
  };

  const formatDate = (date: Date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  };


  return (
    <ContentWrapper>
      <View className="flex-1 bg-yellow-50">
        <View className="flex-row bg-yellow-50 items-center justify-center p-4 mt-10">
          <View className="absolute left-0">
            <ReturnIcon />
          </View>
          <Text className="text-2xl font-bold text-gray-900">TedTeddy</Text>
        </View>
        <ScrollView className="flex-grow p-4" contentContainerClassName="pb-10" inverted={true}>
          {messages.map((message) => (
            <View
              key={message._id}
              className={`bg-${message.user._id === 1 ? 'white' : 'blue-900'} rounded-2xl p-4 mb-4 ${
                message.user._id === 1 ? 'self-end' : 'self-start'
              }`}
            >
              <Text
                className={`text-${message.user._id === 1 ? 'gray-900' : 'white'}`}
              >
                {message.text}
              </Text>
              <Text
                className={`text-${message.user._id === 1 ? 'gray-500' : 'gray-900'} text-xs self-end`}
              >
                {formatDate(message.createdAt)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View className="flex-row items-center p-4 bg-white h-24">
          <View className="mr-4">
            <TouchableOpacity >
              <EmojiIcon />
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TextInput
              className="h-10 bg-white rounded-lg px-4"
              placeholder="Type a message..."
              value={inputText}
              onChangeText={setInputText}
            />
          </View>
          <View className="ml-4">
            <TouchableOpacity
              className="bg-white w-10 h-10 rounded-full justify-center items-center"
              onPress={onSend}
            >
              <ArrowIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ContentWrapper>
);
}

export default Chat