import React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';

function CarouselComponent() {
  const data = [
    {
      id: '1',
      image: require('../assets/images/product-1.png'),
      title: 'Old Math Textbook',
      price: '₱500',
    },
    {
      id: '2',
      image: require('../assets/images/product-2.png'),
      title: 'Product 2',
      price: '₱800',
    },
    {
      id: '3',
      image: require('../assets/images/product-3.png'),
      title: 'Product 3',
      price: '₱1200',
    },
  ];

  function renderCarouselItem(item: any) {
    return (
      <View className="relative">
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
        />
        <View className="absolute top-0 left-0 p-4 bg-opacity-70">
          <Text className="text-black text-lg mb-2">Featured</Text>
        </View>
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-opacity-70">
          <Text className="text-black text-2xl font-extrabold mb-2">
            {item.title}
          </Text>
          <Text className="text-secondary-100 text-2xl font-medium">
            {item.price}
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
        {data.map((item: any) => (
          <View key={item.id} className="rounded-2xl overflow-hidden">
            {renderCarouselItem(item)}
          </View>
        ))}
      </Swiper>
    </View>
  );
}

export default CarouselComponent;
