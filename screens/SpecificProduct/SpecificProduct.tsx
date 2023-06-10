import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import productImages from '../../data/specificProductImages';
import productData from '../../data/specificProductsData';
import SpecificProductCarousel from '../../components/product-page-components/SpecificProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';

function SpecificProduct() {

  return (
    <ContentWrapper hasHeader={false}>
      <View className="pt-10">
        <ScrollView>
          <View className="px-2">
            <SpecificProductCarousel specificProductImg={productImages} />
          </View>
        </ScrollView>
        <View>
          <View className="flex-row">
            <Text className="pl-6 pt-6 text-2xl font-semibold">
              {productData[0].title}
            </Text>
            <Text className="pl-6 pt-8 text-xs font-normal">
              by {productData[0].seller}
            </Text>
          </View>
          <View className="h-12 items-center px-5 pt-3">
            <Text className="text-xs font-light text-slate-500">
              {productData[0].description}
            </Text>
            <TouchableOpacity className="h-6 w-16 rounded-3xl bg-primary-100 ">
              <Text className="items-center pt-1 text-center text-xs font-normal text-white">
                See More
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-12 h-24 w-screen bg-amber-300">
            <Text className="items-center py-9 pl-6 text-base font-medium">
              ₱{productData[0].price}.00
            </Text>
          </View>
          <View className="h-52 bg-white">
            <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
              Meetup Details
            </Text>
            <View className="mx-4 mt-20 h-10 w-1/2 rounded-3xl bg-primary-100 ">
              <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                Meetup at {productData[0].preferredSpot}
              </Text>
            </View>
            <View className="mx-4 mt-4 h-10 w-5/6 rounded-3xl bg-primary-100 ">
              <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                Preferred Time of Meetup: {productData[0].preferredTime}
              </Text>
            </View>
          </View>
          <TouchableOpacity className=" bottom-0 h-20 items-center bg-amber-300">
            <Text className="bottom-0 py-6 text-2xl text-white">BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContentWrapper>
  );
}

export default SpecificProduct;
