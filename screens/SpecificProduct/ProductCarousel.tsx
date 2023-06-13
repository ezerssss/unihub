import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

interface CarouselProps {
  images: string[];
}

function ProductCarousel(props: CarouselProps) {
  const { images } = props;

  const renderProducts = images.map((image) => (
    <View className="overflow-hidden rounded-2xl" key={image}>
      <View className="relative">
        <Image
          className="h-full w-full rounded-lg"
          source={{
            uri: image,
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
