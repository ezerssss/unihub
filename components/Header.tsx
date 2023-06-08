import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Search from './Search';
import { MaterialIcons } from '@expo/vector-icons';
import { BagIcon } from './icons';
import { MenuModal } from './modals';

function Header() {
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

  return (
    <View className="bg-primary-100 pt-14 pb-8">
      <View className="px-4 flex-row items-center justify-between">
        <View className="w-1/6">
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons color="white" name="menu" size={30} />
          </TouchableOpacity>
        </View>
        <Search onSearch={onSearch} />
        <View className="w-1/6 flex-row justify-end">
          <TouchableOpacity>
            <BagIcon />
          </TouchableOpacity>
        </View>
      </View>

      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </View>
  );
}

export default Header;
