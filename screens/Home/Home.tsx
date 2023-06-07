import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import FeatureCarousel from '../../components/carousel/FeatureCarousel';
import ProductsCarousel from '../../components/carousel/ProductsCarousel';
import { RootNavigationProps } from '../../types/navigation';
import products from '../../data/products';
import { Routes } from '../../enums/routes';

function Home({ navigation }: RootNavigationProps) {
  function handleGoLogin() {
    navigation.navigate(Routes.LOGIN);
  }

  return (
    <ContentWrapper className="px-0">
      <ScrollView className="bg-orange-yellow">
        <View className="rounded-lg px-4 py-8">
          <FeatureCarousel products={products} />
        </View>
        <View className="bg-white h-full">
          <View className="flex-1 my-5 mx-3">
            <Text className="font-semibold text-lg">Also check this out</Text>
            <ProductsCarousel />

            <Text className="font-bold text-lg">Home</Text>
            <TouchableOpacity
              className="p-2 my-2 border rounded"
              onPress={handleGoLogin}
            >
              <Text>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ContentWrapper>
  );
}

export default Home;
