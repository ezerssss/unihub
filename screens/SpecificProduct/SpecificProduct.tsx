import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import ProductCarousel from './ProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';
import { formatTime } from '../../helpers/date';
import { ProductNavigationProps } from '../../types/navigation';
import { Timestamp, addDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { formatNumber } from '../../helpers/number';
import useGoBack from '../../hooks/useGoBack';
import { ProductLoading } from '../../components/loading';
import AuthWrapper from '../../components/AuthWrapper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../types/navigation';
import { Routes } from '../../enums/routes';
import UserContext from '../../context/UserContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../firebase/db';
import { DB } from '../../enums/db';

import type { User } from 'firebase/auth';
import { type Transaction, StatusEnum } from '../../types/transaction';

function SpecificProduct({ route }: ProductNavigationProps) {
  const { product, isRedirect } = route.params;

  const { user } = useContext(UserContext);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [descriptionLines, setDescriptionLines] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (descriptionLines !== undefined && descriptionLines <= 2) {
      setShowFullDescription(true);
    }
  }, [descriptionLines]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  async function handleBuyOrder() {
    try {
      if (!user) {
        return;
      }

      const userRef = collection(db, DB.USERS);
      const sellerQuery = query(
        userRef,
        where('displayName', '==', product.seller)
      );

      const sellerSnapshot = await getDocs(sellerQuery);
      if (!sellerSnapshot.empty) {
        const seller = sellerSnapshot.docs[0].data() as User;
        const sellerUid = sellerSnapshot.docs[0].id;
        const buyer = user;

        const transaction: Transaction = {
          buyer: buyer.displayName ?? '',
          buyerEmail: buyer?.email ?? '',
          date: new Date(),
          isSeen: false,
          lastMessage: `${buyer.displayName ?? ''} has sent a buy request.`,
          product: product,
          sellerEmail: seller.email ?? '',
          status: StatusEnum.CONFIRM,
        };

        // upload each transaction as field reference
        const buyerRef = collection(db, DB.USERS, buyer.uid, DB.TRANSACTIONS);
        const sellerRef = collection(db, DB.USERS, sellerUid, DB.TRANSACTIONS);
        const transactionsRef = collection(db, DB.TRANSACTIONS);

        // if there is a pending transaction, do not add
        const pendingTransactionQuery = query(
          transactionsRef,
          where('status', '==', StatusEnum.CONFIRM),
          where('product.title', '==', product.title),
          where('sellerEmail', '==', seller.email ?? ''),
          where('buyerEmail', '==', buyer.email ?? '')
        );

        const pendingTransactionSnapshot = await getDocs(
          pendingTransactionQuery
        );

        if (!pendingTransactionSnapshot.empty) {
          alert('You already have a pending transaction for this product.');
          return;
        }

        await addDoc(transactionsRef, transaction);
        await addDoc(buyerRef, transaction);
        await addDoc(sellerRef, transaction);

        navigation.navigate(Routes.BUY, {
          product,
          transaction,
        });
      } else {
        throw new Error('Seller not found');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong with posting your product.');
    }
  }

  const goBack = useGoBack();

  if (!product) {
    return <ProductLoading />;
  }

  const { images, title, description, meetup, seller } = product;
  const { location, time } = meetup;
  const dateObject = isRedirect
    ? time
    : (time as unknown as Timestamp).toDate();

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  function handleTextLayout(event: any) {
    const { lines } = event.nativeEvent;
    setDescriptionLines(lines.length);
  }

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <View className="pt-10">
          <TouchableOpacity
            className="absolute left-7 top-20 z-20"
            onPress={goBack}
          >
            <AntDesign color="black" name="left" size={30} />
          </TouchableOpacity>
          <ScrollView className="flex-grow">
            <View className="px-2">
              <ProductCarousel images={images} />
            </View>
            <View className="pb-20">
              <View className="flex-row">
                <Text className="pl-6 pt-6 text-2xl font-semibold">
                  {title}
                </Text>
                <Text className="absolute right-0 pr-6 pt-8 text-xs font-normal">
                  by {seller}
                </Text>
              </View>
              <View className="items-center px-5 pt-3 text-left">
                <Text
                  className="text-left text-xs font-light text-slate-500"
                  numberOfLines={showFullDescription ? undefined : 2}
                  onTextLayout={handleTextLayout}
                >
                  {description}
                </Text>
                {descriptionLines !== undefined && descriptionLines > 2 && (
                  <TouchableOpacity
                    className="mt-2 h-7 w-20 rounded-3xl bg-primary-100"
                    onPress={toggleDescription}
                  >
                    <Text className="items-center pt-1 text-center text-xs font-normal text-white">
                      {showFullDescription ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="h-5 w-20 bg-white"></View>
              <View className="h-24 w-screen bg-secondary-400">
                <Text className="items-center py-9 pl-6 text-base font-semibold">
                  ₱{formatNumber(product.price)}
                </Text>
              </View>
              <View className="h-52 bg-white">
                <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
                  Meetup Details
                </Text>
                <View className="mx-4 mt-20 w-fit self-start rounded-3xl bg-primary-400">
                  <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                    Meetup at {location}
                  </Text>
                </View>
                <View className="mx-4 mt-6 w-fit self-start rounded-3xl bg-primary-400">
                  <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                    Preferred Time of Meetup: {formatTime(dateObject)}
                  </Text>
                </View>
              </View>
              <View className="h-12 w-20 bg-white"></View>
              <TouchableOpacity
                className="absolute bottom-0 left-0 right-0 h-20 items-center bg-amber-300"
                onPress={handleBuyOrder}
              >
                <Text className="py-6 text-2xl font-extrabold text-white">
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default SpecificProduct;
