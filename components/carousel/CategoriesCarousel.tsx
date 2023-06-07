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
        <View key={category.id} style={{ margin: 10 }}>
          <View style={{ borderRadius: 10, overflow: 'hidden' }}>
            <Image
              source={{ uri: category.image }}
              style={{ width: 100, height: 100 }}
              resizeMode="cover"
            />
          </View>
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            {category.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default CategoriesCarousel;
