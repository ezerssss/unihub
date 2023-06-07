import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { formatNumber } from '../../helpers/number';

import type { Product } from '../../types/product';

interface ProductsCarouselProps {
  products: Product[];
}

function ProductsCarousel(props: ProductsCarouselProps) {
  const { products } = props;

  const renderProducts = products.map((product) => (
    <View className="mt-5 mx-3" key={product.id}>
      <View className="rounded-lg overflow-hidden">
        <TouchableOpacity>
          <Image
            className="w-40 h-40"
            resizeMode="cover"
            source={{ uri: product.image }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 text-lg">{product.title}</Text>
      <Text className="font-bold text-lg">
        PHP {formatNumber(product.price)}
      </Text>
    </View>
  ));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderProducts}
    </ScrollView>
  );
}

export default ProductsCarousel;
