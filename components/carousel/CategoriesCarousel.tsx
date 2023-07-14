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
    <View className="mx-2 mt-3" key={category.id}>
      <View className="overflow-hidden rounded-lg">
        <TouchableOpacity
          onPress={() => {
            goToCategoryPage(category.name);
          }}
        >
          <Image
            className="h-16 w-16"
            resizeMode="cover"
            source={{ uri: category.image }}
          />
        </TouchableOpacity>
      </View>
      <Text className="mt-3 w-16 text-xs font-medium text-center">
        {category.name}
      </Text>
    </View>
  ));

  return (
    <View className='ml-6'>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {renderCategories}
    </ScrollView>
    </View>
  );
}

export default CategoriesCarousel;
