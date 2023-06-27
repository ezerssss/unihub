import React from 'react';
import { View, Text } from 'react-native';
import ContentWrapper from '../../components/ContentWrapper';
import UniHubIcon from '../../components/icons/UniHubIcon';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

function ProductSold() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  setTimeout(() => {
    navigation.navigate(Routes.HOME);
  }, 2500);

  return (
    <ContentWrapper hasHeader={false} hasLightStatusBar={true}>
      <View className="flex-1 items-center justify-center bg-primary-400">
        <View className='"h-28 w-27 items-center justify-center rounded-full bg-white'>
          <UniHubIcon />
        </View>
        <Text className="my-5 text-2xl font-semibold text-secondary-100">
          Product sold, congrats!
        </Text>
      </View>
    </ContentWrapper>
  );
}

export default ProductSold;
