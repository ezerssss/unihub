import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import FeatureCarousel from '../../components/carousel/FeatureCarousel';
import ProductsCarousel from '../../components/carousel/ProductsCarousel';
import CategoriesCarousel from '../../components/carousel/CategoriesCarousel';
import { HomeLoading } from '../../components/loading';
import { categories } from '../../data/category';
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { DB } from '../../enums/db';
import db from '../../firebase/db';

import type { Product } from '../../types/product';
import { checkThisOutLimit } from '../../constants/products';
import AuthWrapper from '../../components/AuthWrapper';

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  async function handleGetData() {
    try {
      setIsLoading(true);
      await getFeaturedProduct();
      await getCheckThisOut();
    } catch (error) {
      alert('Something went wrong with fetching the products.');
    } finally {
      setIsLoading(false);
    }
  }

  async function getFeaturedProduct() {
    try {
      const productsCollectionRef = collection(db, DB.PRODUCTS);
      const featuredProductsQuery = query(
        productsCollectionRef,
        where('isFeatured', '==', true)
      );

      const querySnapshot = await getDocs(featuredProductsQuery);

      if (querySnapshot.empty) {
        return;
      }

      const doc = querySnapshot.docs[0].data() as Product;
      setFeaturedProduct(doc);
    } catch (error) {
      console.error('Error getting featured product:', error);
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
    handleGetData();
  }, []);

  if (isLoading || !featuredProduct) {
    return <HomeLoading />;
  }

  return (
    <AuthWrapper>
      <ContentWrapper className="px-0" hasLightStatusBar={true}>
        <ScrollView
          className="bg-white"
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleGetData} />
          }
        >
          <View className="bg-secondary-400 px-4 py-8">
            <FeatureCarousel product={featuredProduct} />
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
