import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

import type { Product } from '../../types/product';

interface CarouselProps {
  productImages: Product[];
}

function ProductCarousel(props: CarouselProps) {
  const { productImages } = props;

  const renderProducts = productImages.map((product) => (
    <View className="overflow-hidden rounded-2xl" key={product.images[0]}>
      <View className="relative">
        <Image
          className="h-full w-full rounded-lg"
          source={{
            uri: product.images[0],
          }}
        />
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

export default ProductCarousel;
