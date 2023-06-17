import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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

WebBrowser.maybeCompleteAuthSession();

function Login() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '1008577757913-o6a7v8l3ieur5ig8qlqsbq19j1unj9e9.apps.googleusercontent.com',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function openTermsOfService() {
    await Linking.openURL('http://google.com/search?q=terms+of+service');
  }

  useEffect(() => {
    async function handleSignIn(credential: OAuthCredential) {
      await signInWithCredential(auth, credential);
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      handleSignIn(credential);
    }
  }, [response]);

  async function handleLogin() {
    try {
      setIsLoading(true);
      await promptAsync({ useProxy: true });
    } catch (error) {
      console.error(error);
      alert('Something went wrong with logging in.');
    } finally {
      setIsLoading(false);
    }
  }

  const renderButtonText = isLoading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <>
      <GoogleIcon />
      <Text className="ml-1 text-white font-semibold">Sign in with your school email</Text>
    </>
  );

  return (
    <AuthWrapper>
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
