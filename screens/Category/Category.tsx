import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CategorySwiper from './CategorySwiper';
import { CategoryNavigationProps } from '../../types/navigation';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import SecondarySearch from '../Search/SecondarySearch';

function Category({ route }: CategoryNavigationProps) {
  const { category } = route.params;

  const [searchText, setSearchText] = useState<string>('');

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <SecondarySearch
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View className="flex-1">
          <View className="m-4 flex flex-row items-center">
            <Text className="absolute text-xl text-unihub-gray-200">
              Category:
            </Text>
            <Text className="mx-auto text-2xl font-extrabold">{category}</Text>
          </View>
          <View className="mx-3 h-[0.75px] bg-primary-500"></View>
          <View className="flex-1 bg-white">
            <CategorySwiper category={category} />
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Category;
