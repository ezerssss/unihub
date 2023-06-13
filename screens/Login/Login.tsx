import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { RootNavigationProps } from '../../types/navigation';
import ContentWrapper from '../../components/ContentWrapper';
import { Routes } from '../../enums/routes';
import UniHubIcon from '../../components/icons/UniHubIcon';
import GoogleIcon from '../../components/icons/GoogleIcon';

function Login({ navigation }: RootNavigationProps) {
  function handleGoHome() {
    navigation.navigate(Routes.HOME);
  }

  function openTermsOfService() {
    Linking.openURL('http://google.com/search?q=terms+of+service');
  }

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1 items-center justify-center bg-primary-100">
        <View className="h-5/6 w-11/12 flex-none items-center justify-center rounded-3xl bg-white">
          <UniHubIcon />
          <Text className="t mt-7 text-xl font-bold text-primary-100">
            Welcome
          </Text>
          <View className="flex h-14 w-64">
            <Text className="text-center">
              By signing in you are agreeing to our{'\n'}
              <Text
                className="color-primary-100 text-center"
                onPress={openTermsOfService}
              >
                terms and privacy policies
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            className="my-28 h-12 w-64 flex-row items-center justify-center rounded-3xl border bg-primary-100 p-2"
            onPress={handleGoHome}
          >
            <GoogleIcon />
            <Text className="ml-2 text-white">
              Sign in with your school email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContentWrapper>
  );
}

export default Login;
