import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import type { Product } from '../../types/product';
import { formatNumber } from '../../helpers/number';
import UserContext from '../../context/UserContext';
import { Categories } from '../../enums/categories';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

interface SwiperProps {
  category: Categories;
}

function CategorySwiper(props: SwiperProps) {
  const { category } = props;
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState<Product[]>([]);

  function filterByCategory(current: Product): boolean {
    return current.category === category;
  }

  useEffect(() => {
    (async () => {
      try {
        if (!user) {
          return;
        }

        const productsRef = collection(db, DB.PRODUCTS);
        const querySnapshot = await getDocs(productsRef);

        if (querySnapshot.empty) {
          return;
        }

        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push(doc.data() as Product);
        });
        const filteredProducts =
          category === Categories.ALL
            ? fetchedProducts
            : fetchedProducts.filter(filterByCategory);
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
        alert('Something went wrong with fetching your products.');
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
  const renderProducts = products.map((product) => (
    <View className="mx-3 mt-5 flex-row items-center" key={product.images[0]}>
      <View className="overflow-hidden rounded-lg ">
        <TouchableOpacity
          onPress={() => {
            goToSpecificProduct(product);
          }}
        >
          <Image
            className="h-28 w-28"
            resizeMode="cover"
            source={{ uri: product.images[0] }}
          />
        </TouchableOpacity>
      </View>
      <View className="ml-3 h-28 w-3/4 overflow-hidden rounded-lg bg-white pl-5">
        <Text className="mt-3 text-xl font-semibold text-black">
          {product.title}
        </Text>
        <Text className="text-base font-medium text-black">
          by {product.seller}
        </Text>
        <Text className="pt-1 text-lg font-extrabold text-primary-100">
          ₱{formatNumber(product.price)}
        </Text>
      </View>
      
    </View>
  ));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderProducts}
    </ScrollView>
  );
}

export default CategorySwiper;
