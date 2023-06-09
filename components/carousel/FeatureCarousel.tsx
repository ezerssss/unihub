import React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import type { Product } from '../../types/product';

interface CarouselProps {
  products: Product[];
}

function CarouselComponent(props: CarouselProps) {
  const { products } = props;

  const renderProducts = products.map((product) => (
    <View className="overflow-hidden rounded-2xl" key={product.images[0]}>
      <View className="relative">
        <Image
          source={{
            uri: product.images[0],
          }}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
        <View className="absolute left-0 top-0 bg-opacity-70 p-4">
          <Text className="mb-2 text-lg text-black">Featured</Text>
        </View>
        <View className="absolute bottom-0 left-0 right-0 bg-opacity-70 p-4">
          <Text className="mb-2 text-2xl font-extrabold text-black">
            {product.title}
          </Text>
          <Text className="text-2xl font-medium text-secondary-100">
            ₱{product.price}
          </Text>
        </View>
      </View>
    </View>
  ));

  return (
    <View>
      <Swiper
        activeDot={<View className="mx-2 h-2 w-2 rounded-full bg-black" />}
        dot={<View className="mx-2 h-2 w-2 rounded-full bg-gray-400" />}
        style={{ height: 250 }}
      >
        {renderProducts}
      </Swiper>
    </View>
  );
}

export default CarouselComponent;
