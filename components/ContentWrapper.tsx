import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
}

const ContentWrapper = (props: PropsInterface) => {
  const { children } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return <View className="flex-1 p-5 bg-white">{children}</View>;
};

export default ContentWrapper;
