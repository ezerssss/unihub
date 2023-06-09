import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import FeatureCarousel from '../../components/carousel/FeatureCarousel';
import ProductsCarousel from '../../components/carousel/ProductsCarousel';
import CategoriesCarousel from '../../components/carousel/CategoriesCarousel';
import { RootNavigationProps } from '../../types/navigation';
import { featuredProducts, products } from '../../data/products';
import { categories } from '../../data/category';
import { Routes } from '../../enums/routes';

function Home({ navigation }: RootNavigationProps) {
  function handleGoLogin() {
    navigation.navigate(Routes.LOGIN);
  }

  return (
    <ContentWrapper className="px-0">
      <ScrollView className="bg-orange-yellow">
        <View className="rounded-lg px-4 py-8">
          <FeatureCarousel products={featuredProducts} />
        </View>
        <View className="max-h-max bg-white">
          <View className="mx-3 my-5 flex-1">
            <Text className="text-lg font-semibold">Also check this out</Text>
            <ProductsCarousel products={products} />
            <View className="h-5" />
            <Text className="text-xl font-semibold">Categories</Text>
            <CategoriesCarousel categories={categories} />

            <Text className="text-lg font-bold">Home</Text>
            <TouchableOpacity
              className="my-2 rounded border p-2"
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
