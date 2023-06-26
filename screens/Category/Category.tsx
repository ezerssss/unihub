import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CategorySwiper from './CategorySwiper';
import { CategoryNavigationProps } from '../../types/navigation';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import useGoBack from '../../hooks/useGoBack';
import { AntDesign } from '@expo/vector-icons';

function Category({ route }: CategoryNavigationProps) {
  const { category } = route.params;

  const goBack = useGoBack();
  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <View className=" flex-1 pt-10">
          <View className="h-15 items-center bg-white">
            <TouchableOpacity
              className="absolute bottom-3 left-0 z-20 pl-3"
              onPress={goBack}
            >
              <AntDesign color="black" name="left" size={30} />
            </TouchableOpacity>
            <Text className="py-4 text-xl font-semibold">{category}</Text>
          </View>
          <View className="flex-1 bg-primary-400">
            <CategorySwiper category={category} />
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Category;
