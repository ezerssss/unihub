import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CategorySwiper from './CategorySwiper';
import { products } from '../../data/products';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import useGoBack from '../../hooks/useGoBack';
import { AntDesign } from '@expo/vector-icons';
function Category() {
    const goBack = useGoBack();
  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <View className=' flex-1 pt-10'>
          <View className='items-center bg-white h-14'>
          <TouchableOpacity
            className="absolute pl-3 left-0 bottom-3 z-20"
            onPress={goBack}
          >
            <AntDesign color="black" name="left" size={30} />
          </TouchableOpacity>
            <Text className='py-4 text-xl font-semibold'>All Products</Text>
          </View>
          <View className='bg-secondary-400 flex-1'>
          <CategorySwiper products={products} />
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Category;
