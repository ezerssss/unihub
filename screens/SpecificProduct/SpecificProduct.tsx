import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';
import { formatTime } from '../../helpers/date';
import { ProductNavigationProps } from '../../types/navigation';
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import { Product } from '../../types/product';
import useGoBack from '../../hooks/useGoBack';
import { ProductLoading } from '../../components/FullScreenLoading';

function SpecificProduct({ route }: ProductNavigationProps) {
  const { product } = route.params;

  const goBack = useGoBack();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedProduct, setFetchedProduct] = useState<Product>();

  async function handleGetProduct() {
    try {
      setIsLoading(true);
      const docRef = doc(db, DB.PRODUCTS, product);
      const result = await getDoc(docRef);

      if (!result.exists()) {
        alert('Product does not exist!');
        return;
      }

      setFetchedProduct(result.data() as Product);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetProduct();
  }, []);

  if (isLoading || !fetchedProduct) {
    return <ProductLoading />;
  }

  const { images, title, description, price, meetup } = fetchedProduct;
  const { location, time } = meetup;
  const dateObject = (time as unknown as Timestamp).toDate();

  return (
    <ContentWrapper hasHeader={false}>
      <View className="pt-10">
        <TouchableOpacity
          className="absolute left-7 top-20 z-20"
          onPress={goBack}
        >
          <AntDesign color="black" name="left" size={30} />
        </TouchableOpacity>
        <ScrollView>
          <View className="px-2">
            <ProductCarousel images={images} />
          </View>
        </ScrollView>
        <View>
          <View className="flex-row">
            <Text className="pl-6 pt-6 text-2xl font-semibold">{title}</Text>
            <Text className="pl-6 pt-8 text-xs font-normal">by -</Text>
          </View>
          <View className="h-12 items-center px-5 pt-3">
            <Text className="text-xs font-light text-slate-500">
              {description}
            </Text>
            <TouchableOpacity className="h-6 w-16 rounded-3xl bg-primary-100 ">
              <Text className="items-center pt-1 text-center text-xs font-normal text-white">
                See More
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-12 h-24 w-screen bg-amber-300">
            <Text className="items-center py-9 pl-6 text-base font-medium">
              ₱{price}
            </Text>
          </View>
          <View className="h-52 bg-white">
            <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
              Meetup Details
            </Text>
            <View className="mx-4 mt-20 h-10 w-1/2 rounded-3xl bg-primary-100 ">
              <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                Meetup at {location}
              </Text>
            </View>
            <View className="mx-4 mt-4 h-10 w-5/6 rounded-3xl bg-primary-100 ">
              <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                Preferred Time of Meetup: {formatTime(new Date(dateObject))}
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
