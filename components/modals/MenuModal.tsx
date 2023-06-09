import React from 'react';
import {
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import { Ionicons } from '@expo/vector-icons';
import { ProfileIcon, ShopIcon, ProductIcon, SettingsIcon } from '../icons';
import { BlurView } from 'expo-blur';

import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

type AnimatedViewStyle = Animated.AnimatedProps<StyleProp<ViewStyle>>;

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuModal(props: MenuModalProps) {
  const { isOpen, onClose } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const screenHeight = Dimensions.get('window').height;
  const menuHeight = (1.3 * screenHeight) / 2;

  const modalAnimation = new Animated.Value(screenHeight);

  function handleCloseMenu(event: GestureResponderEvent) {
    if (event.target === event.currentTarget) {
      return;
    }
    Animated.spring(modalAnimation, {
      toValue: screenHeight,
      useNativeDriver: true,
    }).start(onClose);
  }

  function signOut() {
    navigation.navigate(Routes.LOGIN);
  }

  const animatedViewStyle: AnimatedViewStyle = {
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
  };

  return (
    <Modal transparent visible={isOpen}>
      <BlurView
        intensity={10}
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1"
          onPress={handleCloseMenu}
        >
          <Animated.View
            className="rounded-b-3xl bg-white px-10 pt-16 shadow shadow-black"
            style={animatedViewStyle}
          >
            <View className="mb-10 flex flex-row items-center">
              <TouchableOpacity>
                <View className="mr-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
                  <Text className="text-4xl font-medium text-black">S</Text>
                </View>
              </TouchableOpacity>
              <View className="flex flex-col gap-1">
                <Text className="font-semibold text-black">John Doe</Text>
                <Text className="text-gray-500">johndoe@example.com</Text>
              </View>
            </View>

            <TouchableOpacity className="mb-4 flex flex-row items-center gap-4">
              <ProfileIcon />
              <Text className="text-primary-400">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-4 flex flex-row items-center gap-4">
              <ShopIcon />
              <Text className="text-primary-400">Sell Something</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-4 flex flex-row items-center gap-4">
              <ProductIcon />
              <Text className="text-primary-400">Your Product List</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-4 flex flex-row items-center gap-4">
              <SettingsIcon />
              <Text className="text-primary-400">Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={signOut}
            >
              <Ionicons
                className="text-primary-400"
                name="log-out-outline"
                size={33}
              />
              <Text className="ml-4 text-primary-400">Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
}

export default MenuModal;