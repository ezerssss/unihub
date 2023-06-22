import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import type { Product } from '../../types/product';
import { formatNumber } from '../../helpers/number';

interface SwiperProps {
  products: Product[];
}

function CategorySwiper(props: SwiperProps) {
  const { products } = props;

  const renderProducts = products.map((product) => (
    <View className="mx-3 mt-5 flex-row items-center" key={product.images[0]}>
      <View className="overflow-hidden rounded-lg ">
        <TouchableOpacity>
          <Image
            className="h-28 w-28"
            resizeMode="cover"
            source={{ uri: product.images[0] }}
          />
        </TouchableOpacity>
      </View>
      <View className="h-5/6 w-3/4 ml-3 pl-5 rounded-lg bg-white overflow-hidden">
        <Text className="mt-2 text-xl font-medium">{product.title}</Text>
        <Text className='text-base font-medium'>by {product.seller}</Text>
        <Text className="pt-1 text-secondary-100 text-lg font-extrabold">
        ₱{formatNumber(product.price)}
        </Text>     
      </View>
    </View>
  ));

  return <ScrollView showsVerticalScrollIndicator={false}>{renderProducts}</ScrollView>;
}

export default CategorySwiper;
