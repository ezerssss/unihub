import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import type { Category } from '../../types/category';

interface CategoriesCarouselProps {
  categories: Category[];
}

function CategoriesCarousel(props: CategoriesCarouselProps) {
  const { categories } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <View className="mt-5 mx-3" key={category.id}>
          <View className="rounded-lg overflow-hidden">
            <TouchableOpacity>
              <Image
                className="w-24 h-24"
                resizeMode="cover"
                source={{ uri: category.image }}
              />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-sm">{category.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default CategoriesCarousel;
