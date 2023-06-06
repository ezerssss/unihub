import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RootNavigationProps } from '../../types/navigation';
import ContentWrapper from '../../components/ContentWrapper';
import { Routes } from '../../enums/routes';

function Login({ navigation }: RootNavigationProps) {
  function handleGoHome() {
    navigation.navigate(Routes.HOME);
  }

  return (
    <ContentWrapper>
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold text-lg">Login</Text>
        <TouchableOpacity
          className="p-2 my-2 border rounded"
          onPress={handleGoHome}
        >
          <Text className="text-primary-100">Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ContentWrapper>
  );
}

export default Login;
