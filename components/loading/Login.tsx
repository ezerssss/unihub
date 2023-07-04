import { View } from 'react-native';
import React from 'react';
import ContentWrapper from '../ContentWrapper';
import { UniHubLoginIcon } from '../icons';

export default function Login() {
  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1 items-center justify-center">
        <UniHubLoginIcon />
      </View>
    </ContentWrapper>
  );
}
