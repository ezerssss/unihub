import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import { RootNavigationProps } from '../../types/navigation';
import ContentWrapper from '../../components/ContentWrapper';
import { Routes } from '../../enums/routes';

function Login({ navigation }: RootNavigationProps) {
  function handleGoHome() {
    navigation.navigate(Routes.HOME);
  }

function OpenToS(): void {
  Linking.openURL('http://google.com/search?q=terms+of+service');
}

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1 items-center bg-primary-100 justify-center">
        <View className="flex-none items-center justify-center bg-white w-11/12 h-5/6 rounded-3xl">
          <Image 
          className="w-24 h-24 flex"
          source={require('../../assets/cpu_unihub_squarelogo_transparentbg.png')}
          />
          <Text className="t text-primary-100 text-xl font-bold mt-7">Welcome</Text>
          <View className="flex w-64 h-14">
            <Text className="text-center">
            By signing in you are agreeing to our{'\n'}
              <Text 
              className="text-center color-primary-100" 
              onPress={OpenToS}>
              terms and privacy policies
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            className="p-2 my-28 border rounded-3xl h-12 w-64 bg-primary-100 justify-center items-center flex-row"
            onPress={handleGoHome}
          >
            <Image
            className="w-6 h-6"
            source={require('../../assets/google-icon.png')}
            />
            <Text className="text-white ml-2">Sign in with your school email</Text>

          </TouchableOpacity>
        </View>
      </View>
    </ContentWrapper>
  );
}

export default Login;
