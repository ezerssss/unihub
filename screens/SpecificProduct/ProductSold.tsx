import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import ContentWrapper from '../../components/ContentWrapper';
import UniHubIcon from '../../components/icons/UniHubIcon';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';

function ProductSold({ navigation }: RootNavigationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(Routes.HOME);
    }, 2500);
    return clearTimeout(timer);
  }, []);

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
