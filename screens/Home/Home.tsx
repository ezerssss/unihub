import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import FeatureCarousel from '../../components/carousel/FeatureCarousel';
import ProductsCarousel from '../../components/carousel/ProductsCarousel';
import CategoriesCarousel from '../../components/carousel/CategoriesCarousel';
import { HomeLoading } from '../../components/FullScreenLoading';
import { categories } from '../../data/category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { DB } from '../../enums/db';
import db from '../../firebase/db';

import type { Product } from '../../types/product';

function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  async function getFeaturedProduct() {
    setIsLoading(true);
    const productsCollectionRef = collection(db, DB.PRODUCTS);
    const featuredProductsQuery = query(
      productsCollectionRef,
      where('isFeatured', '==', true)
    );

    try {
      const querySnapshot = await getDocs(featuredProductsQuery);

      if (querySnapshot.empty) {
        setFeaturedProduct(null);
      } else {
        const doc = querySnapshot.docs[0];

        const featuredProduct = {
          id: doc.id,
          ...doc.data(),
        } as Product;

        setFeaturedProduct(featuredProduct);
      }
    } catch (error) {
      console.error('Error getting featured product:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getProducts() {
    setIsLoading(true);
    const productsCollectionRef = collection(db, DB.PRODUCTS);
    const productsQuery = query(productsCollectionRef);

    try {
      const querySnapshot = await getDocs(productsQuery);
      const products: Product[] = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const product = {
            id: doc.id,
            ...doc.data(),
          } as Product;

          products.push(product);
        }
      });

      setProducts(products);
    } catch (error) {
      console.error('Error getting products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFeaturedProduct();
    getProducts();
  }, []);

  if (isLoading || !featuredProduct) {
    return <HomeLoading />;
  }

  return (
    <ContentWrapper className="px-0">
      <ScrollView className="bg-orange-yellow">
        <View className="rounded-lg px-4 py-8">
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
  );
}

export default Home;
