import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import UniHubIcon from '../../components/icons/UniHubIcon';
import GoogleIcon from '../../components/icons/GoogleIcon';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  OAuthCredential,
  signInWithCredential,
} from 'firebase/auth';
import auth from '../../firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import AuthWrapper from '../../components/AuthWrapper';
import UserContext from '../../context/UserContext';
import { RootNavigationProps } from '../../types/navigation';
import { generateErrorMessage } from '../../helpers/error';

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }: RootNavigationProps) {
  const { user } = useContext(UserContext);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.OAUTH_CLIENT_ID,
    androidClientId: process.env.ANDROID_OAUTH_ID,
    iosClientId: process.env.IOS_OAUTH_ID,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function openTermsOfService() {
    await Linking.openURL('http://google.com/search?q=terms+of+service');
  }

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
    } else if (user && navigation.getState().index > 0) {
      navigation.popToTop();
    }
  }, [user]);

  useEffect(() => {
    async function handleSignIn(credential: OAuthCredential) {
      await signInWithCredential(auth, credential);
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      handleSignIn(credential);
    } else {
      setIsLoading(false);
    }
  }, [response]);

  async function handleLogin() {
    try {
      setIsLoading(true);
      await promptAsync();
    } catch (error) {
      console.error(error);
      const message = generateErrorMessage(
        error,
        'Something went wrong with logging in.'
      );

      alert(message);
    }
  }

  const renderButtonText = isLoading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <>
      <GoogleIcon />
      <Text className="ml-1 font-semibold text-white">
        Sign in with your school email
      </Text>
    </>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false} hasLightStatusBar={true}>
        <View className="flex-1 items-center justify-center bg-primary-400">
          <View className="h-5/6 w-11/12 flex-none items-center justify-center rounded-3xl bg-white">
            <UniHubIcon />
            <Text className="t mt-7 text-xl font-bold text-primary-400">
              Welcome
            </Text>
            <View className="flex h-14 w-64">
              <Text className="text-center">
                By signing in you are agreeing to our{'\n'}
                <Text
                  className="color-primary-400 text-center"
                  onPress={openTermsOfService}
                >
                  terms and privacy policies
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              className="mt-28 h-12 w-64 flex-row items-center justify-center rounded-3xl border bg-primary-400 p-2"
              disabled={!request || isLoading}
              onPress={handleLogin}
            >
              {renderButtonText}
            </TouchableOpacity>
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Login;
