import React from 'react';
import { View } from 'react-native';
import {
  AddSquareIcon,
  BookIcon,
  GraduationCapIcon,
  ProfileIcon,
  ShopIcon,
} from '../icons/footer';
import auth from '../../firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import TabItem from './TabItem';

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
    <View className="bg-white shadow shadow-gray-500">
      <View
        className="flex-row justify-between border-t-0 border-transparent px-8 py-2"
        style={{ elevation: 1 }}
      >
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
    </View>
  );
}

export default Footer;
