import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import type { Product } from '../../types/product';

interface ProductsCarouselProps {
  products: Product[];
}

function ProductsCarousel(props: ProductsCarouselProps) {
  const { products } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products.map((product) => (
        <View key={product.id} style={{ margin: 10 }}>
          <View style={{ borderRadius: 10, overflow: 'hidden' }}>
            <TouchableOpacity>
              <Image
                source={{ uri: product.image }}
                style={{ width: 150, height: 150 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            {product.title}
          </Text>
          <Text style={{ color: 'gray' }}>PHP {product.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default ProductsCarousel;
