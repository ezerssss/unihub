import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import type { Product } from '../../types/product';
import type { Timestamp } from 'firebase/firestore';
import { formatNumber } from '../../helpers/number';
import UserContext from '../../context/UserContext';
import { Categories } from '../../enums/categories';
import { LocationIcon, ClockIcon } from '../../components/icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import { generateErrorMessage } from '../../helpers/error';
import { getProductsByCategory } from '../../services/product';

interface SwiperProps {
  category: Categories;
}

function CategorySwiper(props: SwiperProps) {
  const { category } = props;
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState<Product[]>([]);

  const handleGetProducts = useCallback(getProductsByCategory, [category]);

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          return;
        }

        const fetchedProducts = await handleGetProducts(category);
        setProducts(fetchedProducts);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      }
    })();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  function goToSpecificProduct(product: Product) {
    navigation.navigate(Routes.PRODUCT, {
      product,
    });
  }
  const renderProducts = products.map((product) => {
    const dateObject = (product.meetup.time as unknown as Timestamp).toDate();
    const formattedtime = dayjs(dateObject).format('HH:mm A');
    return (
      <TouchableOpacity
        className="mx-1 mt-5 rounded-lg shadow shadow-gray-500"
        key={product.images[0]}
        onPress={() => {
          goToSpecificProduct(product);
        }}
      >
        <View className="w-44 overflow-hidden rounded-lg">
          <Image
            className="z-10 h-36 rounded-lg"
            resizeMode="cover"
            source={{ uri: product.images[0] }}
          />
          <View className="flex flex-col gap-0 bg-white px-3 py-3">
            <View className="absolute -top-3 h-3 w-3 bg-white"></View>
            <View className="absolute -top-3 right-0 h-3 w-3 bg-white"></View>
            <Text className="my-3 text-lg text-black">{product.title}</Text>
            <View className="my-1 flex flex-row items-start">
              <LocationIcon />
              <Text className="ml-2 text-unihub-gray-200">
                {product.meetup.location}
              </Text>
            </View>
            <View className="my-1 flex flex-row justify-between">
              <View className="flex flex-row items-start">
                <ClockIcon />
                <Text className="ml-1 text-unihub-gray-200">
                  {formattedtime}
                </Text>
              </View>
              <View className="ml-2 flex flex-row items-center">
                <Text className="font-extrabold text-primary-300">
                  ₱ {formatNumber(product.price, 0)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView>
      <View className="flex flex-row flex-wrap justify-center gap-2 pt-8">
        {renderProducts}
      </View>
    </ScrollView>
  );
}

export default CategorySwiper;
