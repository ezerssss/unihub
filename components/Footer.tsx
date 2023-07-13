import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AddSquareIcon,
  BookIcon,
  GraduationCapIcon,
  ProfileIcon,
  ShopIcon,
} from './icons/footer';
import auth from '../firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../enums/routes';

function Footer() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToHome() {
    navigation.navigate(Routes.HOME);
  }

  function goToSell() {
    navigation.navigate(Routes.SELL);
  }

  function goToProductListings() {
    navigation.navigate(Routes.PRODUCT_LISTINGS);
  }

  async function signOut() {
    await auth.signOut();
  }
  return (
    <View className="flex flex-row justify-between bg-white px-8 py-2 shadow shadow-gray-500">
      <TabItem icon={<ShopIcon />} label="Shop" onPress={goToHome} />
      <TabItem
        icon={<BookIcon />}
        label="Services"
        onPress={goToProductListings}
      />
      <TabItem icon={<AddSquareIcon />} label="Sell" onPress={goToSell} />
      <TabItem icon={<GraduationCapIcon />} label="News" />
      <TabItem icon={<ProfileIcon />} label="Me" onPress={signOut} />
    </View>
  );
}

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

function TabItem({ icon, label, onPress }: TabItemProps) {
  return (
    <TouchableOpacity
      className="mt-1 flex flex-col items-center"
      onPress={onPress}
    >
      {icon}
      <Text className="mt-1 text-xs text-primary-400">{label}</Text>
    </TouchableOpacity>
  );
}

export default Footer;
