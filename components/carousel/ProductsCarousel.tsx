import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../helpers/number';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import SeeAllProductsArrow from '../icons/SeeAllProductsArrow';
import { Categories } from '../../enums/categories';

import type { Product } from '../../types/product';

interface ProductsCarouselProps {
  products: Product[];
}

function ProductsCarousel(props: ProductsCarouselProps) {
  const { products } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToSpecificProduct(product: Product) {
    navigation.navigate(Routes.PRODUCT, {
      product,
    });
  }

  function goToCategoryPage() {
    navigation.navigate(Routes.CATEGORY, { category: Categories.ALL });
  }

  const renderProducts = products.map((product) => (
    <View className="mx-3 mt-5" key={product.images[0]}>
      <View className="overflow-hidden rounded-lg">
        <TouchableOpacity onPress={() => goToSpecificProduct(product)}>
          <Image
            className="h-40 w-40"
            resizeMode="cover"
            source={{ uri: product.images[0] }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 text-lg">{product.title}</Text>
      <Text className="text-lg font-bold">₱{formatNumber(product.price)}</Text>
    </View>
  ));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderProducts}
      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => {
          goToCategoryPage();
        }}
      >
        <Text className="text-s to-unihub-gray-200">See all products</Text>
        <SeeAllProductsArrow />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default ProductsCarousel;
