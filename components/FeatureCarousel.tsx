import React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import type { Product } from '../types/product';

interface CarouselProps {
  products: Product[];
}

function CarouselComponent(props: CarouselProps) {
  const { products } = props;

  function renderCarousel(product: Product) {
    return (
      <View className="relative">
        <Image
          source={product.image}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
        <View className="absolute top-0 left-0 p-4 bg-opacity-70">
          <Text className="text-black text-lg mb-2">Featured</Text>
        </View>
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-opacity-70">
          <Text className="text-black text-2xl font-extrabold mb-2">
            {product.title}
          </Text>
          <Text className="text-secondary-100 text-2xl font-medium">
            ₱{product.price}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Swiper
        style={{ height: 250 }}
        dot={<View className="w-2 h-2 rounded-full bg-gray-400 mx-2" />}
        activeDot={<View className="w-2 h-2 rounded-full bg-black mx-2" />}
      >
        {products.map((product) => (
          <View key={product.id} className="rounded-2xl overflow-hidden">
            {renderCarousel(product)}
          </View>
        ))}
      </Swiper>
    </View>
  );
}

export default CarouselComponent;
