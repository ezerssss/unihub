import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../helpers/number';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

import type { Product } from '../../types/product';

interface SellerScrollProps {
  products: Product[];
}

function SellerScroll(props: SellerScrollProps) {
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
      <View className="mx-3 my-2" key={product.images[0]}>
        <TouchableOpacity
          className="h-32 w-full overflow-hidden rounded-lg bg-white py-4 pl-5 shadow shadow-black"
          style={{ elevation: 4 }}
          onPress={() => goToSpecificProduct(product)}
        >
          <View className="flex-row items-center">
            <Image
              className="h-24 w-24 rounded-lg"
              resizeMode="cover"
              source={{ uri: product.images[0] }}
            />
            <View className="pl-2">
              <Text className="w-52 text-base font-medium" numberOfLines={1}>
                {product.title}
              </Text>
              <Text className="text-xs text-primary-300">
                by {product.seller}
              </Text>
              <Text className="pt-4 text-xs text-gray-400">
                ₱ {formatNumber(product.price)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderProducts}
    </ScrollView>
  );
}

export default SellerScroll;
