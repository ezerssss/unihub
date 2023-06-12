import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useGoBack from '../../hooks/useGoBack';
import ReturnIcon from '../../components/icons/ReturnIcon';
import ContentWrapper from '../../components/ContentWrapper';
import UniHubIcon from '../../components/icons/UniHubIcon';

function Buy() {
  const goBack = useGoBack();

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1">
        <View className="mx-3 flex-row items-center justify-center py-12">
          <TouchableOpacity className="absolute left-0" onPress={goBack}>
            <ReturnIcon />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Order Update</Text>
        </View>
        <View className="h-28 w-28 items-center justify-center self-center rounded-full bg-white shadow shadow-primary-300">
          <UniHubIcon />
        </View>
      </View>
    </ContentWrapper>
  );
}

export default Buy;
