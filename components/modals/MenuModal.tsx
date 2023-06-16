import React, { useContext } from 'react';
import {
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import { Ionicons } from '@expo/vector-icons';
import { ProfileIcon, ShopIcon, ProductIcon, SettingsIcon } from '../icons';
import { BlurView } from 'expo-blur';

import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import UserContext from '../../context/UserContext';
import auth from '../../firebase/auth';

type AnimatedViewStyle = Animated.AnimatedProps<StyleProp<ViewStyle>>;

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MenuModal(props: MenuModalProps) {
  const { isOpen, onClose } = props;
  const { user } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const screenHeight = Dimensions.get('window').height;
  const menuHeight = (1.3 * screenHeight) / 2;

  const modalAnimation = new Animated.Value(screenHeight);

  function handleCloseMenu(event: GestureResponderEvent) {
    if (event.target === event.currentTarget) {
      Animated.spring(modalAnimation, {
        toValue: screenHeight,
        useNativeDriver: true,
      }).start(onClose);
    }
  }

  function goToSell() {
    onClose();
    navigation.navigate(Routes.SELL);
  }

  function goToProductListings() {
    onClose();
    navigation.navigate(Routes.PRODUCT_LISTINGS);
  }

  async function signOut() {
    await auth.signOut();
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
      <StatusBar barStyle={'dark-content'} />
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
                  <Text className="text-4xl font-medium text-black">
                    {user?.displayName && user.displayName[0]}
                  </Text>
                </View>
              </TouchableOpacity>
              <View className="flex flex-col gap-1">
                <Text className="font-semibold text-black">
                  {user?.displayName}
                </Text>
                <Text className="text-gray-500">{user?.email}</Text>
              </View>
            </View>

            <TouchableOpacity className="mb-4 flex flex-row items-center gap-4">
              <ProfileIcon />
              <Text className="text-primary-400">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-4 flex flex-row items-center gap-4"
              onPress={goToSell}
            >
              <ShopIcon />
              <Text className="text-primary-400">Sell Something</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-4 flex flex-row items-center gap-4"
              onPress={goToProductListings}
            >
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
              <Ionicons color="#191970" name="log-out-outline" size={33} />
              <Text className="ml-4 text-primary-400">Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
}

export default MenuModal;
