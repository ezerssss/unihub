import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebase';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
