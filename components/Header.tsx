import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Search from './Search';
import { BellIcon, MenuIcon } from './icons';
import { MenuModal } from './modals';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../enums/routes';
import UserContext from '../context/UserContext';
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import db from '../firebase/db';
import { DB } from '../enums/db';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [hasNotification, setHasNotification] = useState(false);
  const { user } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleToTransactions() {
    navigation.navigate(Routes.TRANSACTIONS);
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const transactionsCollectionRef = collection(
      db,
      DB.USERS,
      user.uid,
      DB.TRANSACTIONS
    );
    const isSeenQuery = query(
      transactionsCollectionRef,
      where('isSeen', '==', false),
      limit(1)
    );

    const unsubscribe = onSnapshot(isSeenQuery, (snapshot) => {
      if (!snapshot.empty) {
        setHasNotification(true);
      } else {
        setHasNotification(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const renderNotificationBubble = hasNotification && (
    <View className="absolute right-0 top-0 rounded-full bg-red-500 p-1" />
  );

  function handleSearchFocus() {
    navigation.navigate(Routes.SEARCH);
  }

  function getFirstName(
    fullName: string | null | undefined,
    defaultName = 'User'
  ) {
    if (!fullName) {
      return defaultName;
    }

    const [firstName] = fullName.split(' ');
    return firstName;
  }

  return (
    <View className="bg-primary-400 pb-5 pt-16">
      <View className="mx-5 flex flex-row justify-between">
        <Text className="mb-5 text-2xl font-bold uppercase text-secondary-100">
          HELLO, {getFirstName(user?.displayName)}
        </Text>
        <View className="flex flex-row gap-5">
          <TouchableOpacity className="relative" onPress={handleToTransactions}>
            <BellIcon />
            {renderNotificationBubble}
          </TouchableOpacity>
          <TouchableOpacity onPress={openMenu}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center justify-between px-4">
        <Search onFocus={handleSearchFocus} />
      </View>

      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </View>
  );
}

export default Header;
