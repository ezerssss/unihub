import React from 'react';
import { View, Image } from 'react-native';

function CarouselComponent() {
  return (
    <View className="h-44 overflow-hidden rounded-2xl">
      <Image
        className="h-full w-full rounded-lg"
        source={require('../../assets/advert1.png')}
      />
    </View>
  );
}

export default CarouselComponent;
