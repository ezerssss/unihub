import React, { useCallback, useContext, useEffect, useState } from 'react';
import auth from '../firebase/auth';
import { Routes } from '../enums/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LoginLoading } from './loading';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/db';
import { DB } from '../enums/db';
import UserContext from '../context/UserContext';
import { isEmailValid } from '../helpers/auth';
import { useFocusEffect } from '@react-navigation/native';
import { recordUserToDB } from '../services/auth';

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
}

export default function AuthWrapper(props: PropsInterface) {
  const { children } = props;
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const route = useRoute();

  function handleSetUser(value: User | null) {
    if (setUser) {
      setUser(value);
    }
  }

  function handleNoUser() {
    handleSetUser(null);
    if (route.name === Routes.LOGIN) {
      setIsLoading(false);
    } else {
      navigation.navigate(Routes.LOGIN);
    }
  }

  const handleAddUserToDB = useCallback(async (user: User) => {
    const docRef = doc(db, DB.USERS, user.uid);
    const isUserRecorded = await (await getDoc(docRef)).exists();
    if (isUserRecorded) {
      handleSetUser(user);
      navigation.navigate(Routes.HOME);
      return;
    }

    await recordUserToDB(user);
    handleSetUser(user);
    navigation.navigate(Routes.HOME);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        navigation.navigate(Routes.LOGIN);
      }
    }, [user, navigation])
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      (async () => {
        try {
          setIsLoading(true);
          if (!user) {
            handleNoUser();
            return;
          }

          if (!isEmailValid(user.email)) {
            alert('Use a CPU email to access the app.');
            handleSetUser(null);
            await auth.signOut();
            return;
          }

          if (route.name === Routes.LOGIN) {
            await handleAddUserToDB(user);
          }
        } catch (error) {
          console.error(error);
          navigation.navigate(Routes.LOGIN);
        } finally {
          setIsLoading(false);
        }
      })();
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoginLoading />;
  }

  return <>{children}</>;
}
