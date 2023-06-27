import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import ProductCarousel from './ProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';
import { formatTime } from '../../helpers/date';
import { ProductNavigationProps } from '../../types/navigation';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { formatNumber } from '../../helpers/number';
import useGoBack from '../../hooks/useGoBack';
import { ProductLoading } from '../../components/loading';
import AuthWrapper from '../../components/AuthWrapper';
import { Routes } from '../../enums/routes';
import UserContext from '../../context/UserContext';
import db from '../../firebase/db';
import { DB } from '../../enums/db';

import { User } from 'firebase/auth';
import { Transaction } from '../../types/transaction';
import { Message } from '../../types/messages';
import { StatusEnum } from '../../enums/status';

function SpecificProduct({ route, navigation }: ProductNavigationProps) {
  const { product, isRedirect } = route.params;

  const { user } = useContext(UserContext);

  const [showFullDescription, setShowFullDescription] = useState(false);

  async function handleChatSetup(
    buyerName: string,
    buyerEmail: string,
    buyerUid: string,
    buyerTransactionID: string,
    sellerUid: string,
    sellerTransactionID: string
  ) {
    const firstMessage: Message = {
      content: `${buyerName} has sent a buy request.`,
      from: buyerEmail,
      date: new Date(),
    };

    const buyerChatRef = collection(
      db,
      DB.USERS,
      buyerUid,
      DB.TRANSACTIONS,
      buyerTransactionID,
      DB.CHATS
    );
    const sellerChatRef = collection(
      db,
      DB.USERS,
      sellerUid,
      DB.TRANSACTIONS,
      sellerTransactionID,
      DB.CHATS
    );

    await addDoc(buyerChatRef, firstMessage);
    await addDoc(sellerChatRef, firstMessage);
  }

  async function handleBuyOrder() {
    try {
      if (!user) {
        return;
      }

      if (user.displayName === product.seller) {
        alert("You can't buy your own product.");
        return;
      }

      const userRef = collection(db, DB.USERS);
      const sellerQuery = query(
        userRef,
        where('displayName', '==', product.seller)
      );

      const sellerSnapshot = await getDocs(sellerQuery);
      if (sellerSnapshot.empty) {
        throw new Error('Seller not found');
      }

      const seller = sellerSnapshot.docs[0].data() as User;
      const sellerEmail = seller.email ?? '';
      const sellerUid = sellerSnapshot.docs[0].id;

      const buyer = user;
      const buyerDisplayName = buyer.displayName ?? '';
      const buyerEmail = buyer?.email ?? '';

      const transaction: Transaction = {
        buyer: buyerDisplayName,
        buyerEmail: buyerEmail,
        date: new Date(),
        isSeen: false,
        lastMessage: `${buyerDisplayName} has sent a buy request.`,
        product: product,
        sellerEmail,
        status: StatusEnum.CONFIRM,
      };

      // upload each transaction as field reference
      const buyerRef = collection(db, DB.USERS, buyer.uid, DB.TRANSACTIONS);
      const sellerRef = collection(db, DB.USERS, sellerUid, DB.TRANSACTIONS);

      // if there is a pending transaction, do not add
      const pendingTransactionQuery = query(
        sellerRef,
        where('product.title', '==', product.title),
        where('sellerEmail', '==', sellerEmail),
        where('buyerEmail', '==', buyerEmail)
      );

      const pendingTransactionSnapshot = await getDocs(pendingTransactionQuery);

      if (!pendingTransactionSnapshot.empty) {
        alert('You already have a pending transaction for this product.');
        return;
      }

      const buyerTransactionDoc = await addDoc(buyerRef, transaction);
      const sellerTransactionDoc = await addDoc(sellerRef, transaction);

      await handleChatSetup(
        buyerDisplayName,
        buyerEmail,
        buyer.uid,
        buyerTransactionDoc.id,
        sellerUid,
        sellerTransactionDoc.id
      );

      navigation.navigate(Routes.BUY, {
        product,
        transaction,
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong with posting your product.');
    }
  }

  const goBack = useGoBack();

  if (!product) {
    return <ProductLoading />;
  }

  const { images, description, meetup, seller, title } = product;
  const { location, time } = meetup;
  const dateObject = isRedirect
    ? time
    : (time as unknown as Timestamp).toDate();

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
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
              <View className="relative pl-6 pt-6">
                <Text className="max-w-[66%] text-2xl font-semibold">
                  {title}
                </Text>
                <Text className="absolute right-6 top-8 text-xs">
                  by {seller}
                </Text>
              </View>
              <View className="px-6 pt-3">
                <Text
                  className="text-left text-xs font-light text-slate-500"
                  numberOfLines={showFullDescription ? undefined : 2}
                >
                  {description}
                </Text>
                <TouchableOpacity
                  className="mt-2 h-7 w-20 rounded-3xl bg-primary-100"
                  onPress={toggleDescription}
                >
                  <Text className="items-center pt-1 text-center text-xs font-normal text-white">
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </Text>
                </TouchableOpacity>
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
