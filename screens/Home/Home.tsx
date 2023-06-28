import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import ProductsCarousel from '../../components/carousel/ProductsCarousel';
import CategoriesCarousel from '../../components/carousel/CategoriesCarousel';
import { HomeLoading } from '../../components/loading';
import { categories } from '../../data/category';
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { DB } from '../../enums/db';
import db from '../../firebase/db';

import type { Product } from '../../types/product';
import { checkThisOutLimit } from '../../constants/products';
import AuthWrapper from '../../components/AuthWrapper';
import UserContext from '../../context/UserContext';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';
import Adverts from './Adverts';

function Home({ navigation }: RootNavigationProps) {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  async function handleGetData() {
    try {
      setIsLoading(true);
      await getCheckThisOut();
    } catch (error) {
      alert('Something went wrong with fetching the products.');
    } finally {
      setIsLoading(false);
    }
  }

  async function getCheckThisOut() {
    try {
      const productsCollectionRef = collection(db, DB.PRODUCTS);

      const randomDocID = doc(productsCollectionRef).id;

      const productsQuery = query(
        productsCollectionRef,
        where('__name__', '>=', randomDocID),
        limit(checkThisOutLimit)
      );

      let querySnapshot = await getDocs(productsQuery);

      if (querySnapshot.size < checkThisOutLimit) {
        const firstThreeQuery = query(
          productsCollectionRef,
          limit(checkThisOutLimit)
        );
        querySnapshot = await getDocs(firstThreeQuery);
      }

      const products: Product[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          products.push(doc.data() as Product);
        }
      });

      setProducts(products);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }

  useEffect(() => {
    if (!user) {
      navigation.push(Routes.LOGIN);
      return;
    }

    handleGetData();
  }, []);

  useEffect(() => {
    const productsCollectionRef = collection(db, DB.PRODUCTS);
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      if (snapshot.empty) {
        return;
      }

      handleGetData();
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <AuthWrapper>
      <ContentWrapper className="px-0" hasLightStatusBar={true}>
        <ScrollView
          className="mb-5 bg-white"
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
          }
        >
          <View className="bg-secondary-400 p-4">
            <Adverts />
          </View>
          <View className="max-h-max bg-white">
            <View className="mx-3 my-5 flex-1">
              <Text className="text-lg font-semibold">Also check this out</Text>
              <ProductsCarousel products={products} />
              <View className="h-5" />
              <Text className="text-xl font-semibold">Categories</Text>
              <CategoriesCarousel categories={categories} />
            </View>
          </View>
        </ScrollView>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default Home;
