import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ContentWrapper from '../icons/components/ContentWrapper';
import ArrowIcon from '../icons/components/ArrowIcon';
import EmojiIcon from '../icons/components/EmojiIcon';
import ReturnIcon from '../icons/components/ReturnIcon';
import { Message } from '../../messages/types';
import { formatTime } from '../../helpers/date'


function Chat(): React.FC {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  function handleSend() {
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
  }


  const renderMessages = messages.map((message) => {
    const textBackground = message.user._id === 1 ? 'bg-white' : 'bg-blue-900';
    const textAlign = message.user._id === 1 ? 'self-end' : 'self-start';
    const messageStyle = message.user._id === 1 ? 'text-gray-900' : 'text-white';
    const dateTextStyle = `text-${message.user._id === 1 ? 'gray-500' : 'gray-900'} text-xs self-end`;
  
    return (
      <View className={`${textBackground} rounded-2xl p-4 mb-4 ${textAlign}`}  key={message._id}>
        <Text className={messageStyle}>{message.text}</Text>
        <Text className={dateTextStyle}>{formatTime(message.createdAt)}</Text>
      </View>
    );
  });
  

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
          {renderMessages}
        </ScrollView>
        <View className="flex-row items-center p-4 bg-white h-24">
          <View className="mr-4">
            <TouchableOpacity>
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
              onPress={handleSend}
            >
              <ArrowIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ContentWrapper>
  );
}

export default Chat;
