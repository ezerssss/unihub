import { View } from 'react-native';
import React from 'react';
import ContentWrapper from '../ContentWrapper';
import UniHubIcon from '../icons/UniHubIcon';

export default function Login() {
  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1 items-center justify-center bg-primary-100">
        <UniHubIcon />
      </View>
    </ContentWrapper>
  );
}
