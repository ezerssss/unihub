import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Search from './Search';
import { MaterialIcons } from '@expo/vector-icons';
import { BagIcon } from './icons';
import { MenuModal } from './modals';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../enums/routes';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

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

  function handleToTransactions() {
    navigation.navigate(Routes.TRANSACTIONS);
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
          <TouchableOpacity onPress={handleToTransactions}>
            <BagIcon />
          </TouchableOpacity>
        </View>
      </View>

      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </View>
  );
}

export default Header;
