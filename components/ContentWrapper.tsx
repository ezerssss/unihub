import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

function ContentWrapper(props: PropsInterface) {
  const { children, className } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View className={`flex-1 ${className || ''} bg-white`}>{children}</View>
  );
}

export default ContentWrapper;
