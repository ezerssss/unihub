import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import type { Category } from '../../types/category';
import { Categories } from '../../enums/categories';

interface CategoriesCarouselProps {
  categories: Category[];
}

function CategoriesCarousel(props: CategoriesCarouselProps) {
  const { categories } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToCategoryPage(category: Categories) {
    navigation.navigate(Routes.CATEGORY, { category });
  }

  const renderCategories = categories.map((category) => (
    <View className="mx-2 mt-5" key={category.id}>
      <View className="overflow-hidden rounded-lg">
        <TouchableOpacity
          onPress={() => {
            goToCategoryPage(category.name);
          }}
        >
          <Image
            className="h-20 w-20"
            resizeMode="cover"
            source={{ uri: category.image }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 w-20 text-sm" numberOfLines={1}>
        {category.name}
      </Text>
    </View>
  ));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderCategories}
    </ScrollView>
  );
}

export default CategoriesCarousel;
