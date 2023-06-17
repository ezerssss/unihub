import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';
import Header from './Header';
import StatusBarStyle from './StatusBarStyle';

interface PropsInterface {
  children: JSX.Element | JSX.Element[];
  className?: string;
  hasHeader?: boolean;
  hasLightStatusBar?: boolean;
}

function ContentWrapper(props: PropsInterface) {
  const {
    children,
    className,
    hasLightStatusBar = false,
    hasHeader = true,
  } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
  const renderHeader = hasHeader && <Header />;
  const lightStatusBar = StatusBarStyle(hasLightStatusBar);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View className={`flex-1 ${className || ''} bg-white`}>
      {renderHeader}
      {lightStatusBar}
      {children}
    </View>
  );
}

export default ContentWrapper;
