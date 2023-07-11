import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../helpers/number';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

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

  const renderProducts = products.map((product) => {
    return (
      <View className="mx-2 mb-8 mt-4" key={product.images[0]}>
        <View
          className="w-32 overflow-hidden rounded-lg shadow shadow-black"
          style={{ elevation: 2 }}
        >
          <TouchableOpacity
            className="bg-white"
            onPress={() => goToSpecificProduct(product)}
          >
            <Image
              className="h-24 rounded-b-lg"
              resizeMode="cover"
              source={{ uri: product.images[0] }}
            />
            <View className="h-16">
              <Text className="mt-1 px-2 text-xs font-medium" numberOfLines={2}>
                {product.title}
              </Text>
              <Text
                className="absolute bottom-0 right-0 px-2 py-2 text-sm font-semibold text-primary-300"
                numberOfLines={1}
              >
                PHP {formatNumber(product.price)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderProducts}
    </ScrollView>
  );
}

export default ProductsCarousel;
