import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ContentWrapper from '../../components/ContentWrapper';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';

function Home({ navigation }: RootNavigationProps) {
  function handleGoLogin() {
    navigation.navigate(Routes.LOGIN);
  }

  return (
    <ContentWrapper className="px-0">
      <Header />
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold text-lg">Home</Text>
        <TouchableOpacity
          className="p-2 my-2 border rounded"
          onPress={handleGoLogin}
        >
          <Text>Go to Login</Text>
        </TouchableOpacity>
      </View>
    </ContentWrapper>
  );
}

export default Home;
