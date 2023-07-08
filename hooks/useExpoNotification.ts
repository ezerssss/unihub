import { useContext, useEffect } from 'react';
import NotificationContext from '../context/NotificationContext';
import { registerForPushNotifications } from '../services/notification';
import * as Notifications from 'expo-notifications';
import { Transaction } from '../types/transaction';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import { Routes } from '../enums/routes';

export default function useExpoNotification() {
  const { setExpoPushToken } = useContext(NotificationContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useEffect(() => {
    if (!setExpoPushToken) {
      return;
    }

    (async () => {
      const expoPushToken = await registerForPushNotifications();

      if (expoPushToken) {
        setExpoPushToken(expoPushToken);
      }
    })();

    const notificationSubscription =
      Notifications.addNotificationResponseReceivedListener(
        ({ notification }) => {
          const { request } = notification;
          const data = request.content.data as Transaction;

          if (!data.status) {
            return;
          }

          navigation.navigate(Routes.CHAT, { transaction: data });
        }
      );

    return () => notificationSubscription.remove();
  }, [setExpoPushToken]);
}
