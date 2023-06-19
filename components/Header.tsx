import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Search from './Search';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import { BagIcon } from './icons';
import { MenuModal } from './modals';

import { Routes } from '../enums/routes';

function Header() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function onSearch(query: string) {
    // eslint-disable-next-line no-console
    console.log(query);
  }

  function goToChat() {
    navigation.navigate(Routes.CHAT);
  }

  return (
    <View className="bg-primary-400 pb-8 pt-14">
      <View className="flex-row items-center justify-between px-4">
        <View className="w-1/6">
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons color="white" name="menu" size={30} />
          </TouchableOpacity>
        </View>
        <Search onSearch={onSearch} />
        <View className="w-1/6 flex-row justify-end">
          <TouchableOpacity onPress={goToChat}>
            <BagIcon />
          </TouchableOpacity>
        </View>
      </View>

      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </View>
  );
}

export default Header;
