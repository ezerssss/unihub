import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { androidVibrationPattern } from '../constants/notification';
import { generateErrorMessage } from '../helpers/error';
import { ExpoPushMessage } from '../types/notification';
import axios from 'axios';
import { Transaction } from '../types/transaction';

async function handleRegisterAndroidNotifications() {
  await Notifications.setNotificationChannelAsync('Product Alert Channel', {
    name: 'Product Alert Channel',
    description: 'Get alerts about your product transactions.',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: androidVibrationPattern,
    lightColor: '#FFFFFF',
    enableLights: true,
  });
}

export async function registerForPushNotifications(): Promise<string> {
  if (Platform.OS === 'android') {
    await handleRegisterAndroidNotifications();
  }

  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications.');

    return '';
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');

    return '';
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

export async function sendProductPushNotification(
  expoPushToken: string,
  body: string,
  transaction: Transaction
) {
  try {
    const message: ExpoPushMessage = {
      to: expoPushToken,
      sound: 'default',
      body,
      data: { ...transaction },
    };

    await axios.post('http://192.168.0.108:3000/api', { ...message });
  } catch (error) {
    console.error(error);
    const message = generateErrorMessage(
      error,
      'Something went wrong with sending the notification.'
    );

    throw new Error(message);
  }
}
