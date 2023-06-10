import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { specificProductImages } from '../../types/specific';

interface CarouselProps {
  specificProductImg: specificProductImages[];
}

function CarouselComponent(props: CarouselProps) {
  const { specificProductImg } = props;

  const renderProducts = specificProductImg.map((specificImg) => (
    <View className="rounded-2xl overflow-hidden" key={specificImg.imageid}>
      <View className="relative">
        <Image
          source={{
            uri: specificImg.image,
          }}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
      </View>
    </View>
  ));

  return (
    <View>
      <Swiper
        activeDot={<View className="w-2 h-2 rounded-full bg-black mx-2" />}
        dot={<View className="w-2 h-2 rounded-full bg-gray-400 mx-2" />}
        style={{ height: 250 }}
      >
        {renderProducts}
      </Swiper>
    </View>
  );
}

export default CarouselComponent;
