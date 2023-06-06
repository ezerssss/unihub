import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import FeatureCarousel from '../../components/FeatureCarousel';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';

function Home({ navigation }: RootNavigationProps) {
  function handleGoLogin() {
    navigation.navigate(Routes.LOGIN);
  }

  return (
    <ContentWrapper className="px-0">
      <ScrollView className="bg-pale-yellow">
        <View className="rounded-lg px-4 py-8">
          <FeatureCarousel />
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold text-lg">Home</Text>
          <TouchableOpacity
            className="p-2 my-2 border rounded"
            onPress={handleGoLogin}
          >
            <Text>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContentWrapper>
  );
}

export default Home;
