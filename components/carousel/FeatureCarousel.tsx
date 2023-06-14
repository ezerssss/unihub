import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

import type { Product } from '../../types/product';

interface CarouselProps {
  product: Product;
}

function CarouselComponent(props: CarouselProps) {
  const { product } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToSpecificProduct() {
    navigation.navigate(Routes.PRODUCT, {
      product,
    });
  }

  const renderProductImages = product.images.map((image) => (
    <View className="overflow-hidden rounded-2xl" key={image}>
      <View className="relative">
        <TouchableOpacity onPress={goToSpecificProduct}>
          <Image
            className="h-full w-full rounded-lg"
            source={{
              uri: image,
            }}
          />
        </TouchableOpacity>
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
        {renderProductImages}
      </Swiper>
    </View>
  );
}

export default CarouselComponent;
