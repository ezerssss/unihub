import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import Search from './Search';
import { MaterialIcons } from '@expo/vector-icons';
import { BagIcon } from './icons';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const menuHeight = screenHeight / 2;

  const modalAnimation = new Animated.Value(screenHeight);

  function openMenu() {
    setMenuOpen(true);
    Animated.spring(modalAnimation, {
      toValue: screenHeight - menuHeight,
      useNativeDriver: true,
    }).start();
  }

  function closeMenu() {
    Animated.spring(modalAnimation, {
      toValue: screenHeight,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
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

      <Modal transparent visible={isMenuOpen}>
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1"
          onPress={closeMenu}
        >
          <Animated.View
            className="rounded-b-3xl bg-white absolute top-0 left-0 right-0"
            style={{
              height: menuHeight,
              transform: [
                {
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, screenHeight - menuHeight],
                    outputRange: [-menuHeight, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <Text>Menu</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Header;
