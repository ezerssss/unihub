import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import type { Category } from '../../types/category';

interface CategoriesCarouselProps {
  categories: Category[];
}

function CategoriesCarousel(props: CategoriesCarouselProps) {
  const { categories } = props;

  const renderCategories = categories.map((category) => (
    <View className="mx-3 mt-5" key={category.id}>
      <View className="overflow-hidden rounded-lg">
        <TouchableOpacity>
          <Image
            className="h-24 w-24"
            resizeMode="cover"
            source={{ uri: category.image }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 text-sm">{category.name}</Text>
    </View>
  ));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderCategories}
    </ScrollView>
  );
}

export default CategoriesCarousel;
