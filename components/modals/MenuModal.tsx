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

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuModal(props: MenuModalProps) {
  const { isOpen, onClose } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const screenHeight = Dimensions.get('window').height;
  const menuHeight = screenHeight / 2;

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
          className="rounded-b-3xl bg-white px-5 pt-16"
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
            <View className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
              <Text className="text-black text-lg font-bold">S</Text>
            </View>
            <View>
              <Text className="text-black font-bold">John Doe</Text>
              <Text className="text-gray-500">johndoe@example.com</Text>
            </View>
          </View>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-2">
            <Ionicons
              className="mr-2"
              color="black"
              name="person-circle-outline"
              size={24}
            />
            <Text className="text-black">Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-2">
            <Ionicons
              className="mr-2"
              color="black"
              name="cart-outline"
              size={24}
            />
            <Text className="text-black">Sell Something</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-2">
            <Ionicons
              className="mr-2"
              color="black"
              name="list-outline"
              size={24}
            />
            <Text className="text-black">Your Product List</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row gap-4 items-center mb-2">
            <Ionicons
              className="mr-2"
              color="black"
              name="settings-outline"
              size={24}
            />
            <Text className="text-black">Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row gap-4 items-center"
            onPress={signOut}
          >
            <Ionicons
              className="mr-2"
              color="black"
              name="log-out-outline"
              size={24}
            />
            <Text className="text-black">Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

export default MenuModal;
