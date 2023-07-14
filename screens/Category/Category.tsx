import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CategorySwiper from './CategorySwiper';
import { CategoryNavigationProps } from '../../types/navigation';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import SecondarySearch from '../Search/SecondarySearch';

function Category({ route }: CategoryNavigationProps) {
  const { category, initialQuery } = route.params;

  const [searchText, setSearchText] = useState<string>(initialQuery ?? '');

  const renderHeader = initialQuery ? (
    <Text className="mx-4 my-3 text-lg text-unihub-gray-200">
      Results for <Text className="text-black">{searchText || '...'}</Text>
    </Text>
  ) : (
    <View className="m-4 flex flex-row items-center">
      <Text className="absolute text-xl text-unihub-gray-200">Category:</Text>
      <Text className="mx-auto text-2xl font-extrabold">{category}</Text>
    </View>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <SecondarySearch
          autoFocus={false}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View className="flex-1">
          {renderHeader}
          <View className="mx-3 mb-5 h-[0.75px] bg-primary-500"></View>

          <View className="flex-1 bg-white">
            <CategorySwiper
              category={category}
              isGlobalSearch={!!initialQuery}
              searchText={searchText}
            />
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Category;
