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

  function closeMenu() {
    Animated.spring(modalAnimation, {
      toValue: screenHeight,
      useNativeDriver: true,
    }).start(onClose);
  }

  function signOut() {
    navigation.navigate(Routes.LOGIN);
  }

  return (
    <Modal transparent visible={isOpen}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1"
        onPress={(event) => {
          if (event.target === event.currentTarget) {
            closeMenu();
          }
        }}
      >
        <Animated.View
          className="rounded-b-3xl bg-white px-10 pt-16 shadow shadow-black"
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
          <View className="flex flex-row items-center mb-10">
            <View className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
              <Text className="text-black text-4xl font-medium">S</Text>
            </View>
            <View className="flex flex-col gap-1">
              <Text className="text-black font-semibold">John Doe</Text>
              <Text className="text-gray-500">johndoe@example.com</Text>
            </View>
          </View>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-4">
            <ProfileIcon />
            <Text className="text-primary-400">Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-4">
            <ShopIcon />
            <Text className="text-primary-400">Sell Something</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-4">
            <ProductIcon />
            <Text className="text-primary-400">Your Product List</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-4">
            <SettingsIcon />
            <Text className="text-primary-400">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={signOut}
          >
            <Ionicons
              name="log-out-outline"
              size={33}
              style={{
                color: '#191970',
              }}
            />
            <Text className="text-primary-400 ml-4">Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

export default MenuModal;
