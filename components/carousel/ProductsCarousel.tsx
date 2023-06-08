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
    <View className="mx-3 mt-5" key={product.id}>
      <View className="overflow-hidden rounded-lg">
        <TouchableOpacity>
          <Image
            className="h-40 w-40"
            resizeMode="cover"
            source={{ uri: product.image }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 text-lg">{product.title}</Text>
      <Text className="text-lg font-bold">
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
