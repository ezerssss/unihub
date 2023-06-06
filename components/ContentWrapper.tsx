import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import Header from './Header';

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
  className?: string;
  hasHeader?: boolean;
}

function ContentWrapper(props: PropsInterface) {
  const { children, className, hasHeader = true } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View className={`flex-1 ${className || ''} bg-white`}>
      {hasHeader ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        children
      )}
    </View>
  );
}

export default ContentWrapper;
