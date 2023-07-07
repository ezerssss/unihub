import React, { useCallback, useContext } from 'react';
import { Routes } from '../enums/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LoginLoading } from './loading';
import UserContext from '../context/UserContext';

import * as Notifications from 'expo-notifications';
import useExpoNotification from '../hooks/useExpoNotification';
import useAuthHandler from '../hooks/useAuthHandler';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
}

export default function AuthWrapper(props: PropsInterface) {
  const { children } = props;
  const { user } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        navigation.navigate(Routes.LOGIN);
      }
    }, [user, navigation])
  );

  useExpoNotification();
  const isLoading = useAuthHandler();

  if (isLoading) {
    return <LoginLoading />;
  }

  return <>{children}</>;
}
