import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import ContentWrapper from '../../components/ContentWrapper';
import useGoBack from '../../hooks/useGoBack';
import { AntDesign } from '@expo/vector-icons';
import UserContext from '../../context/UserContext';
import { Transaction } from '../../types/transaction';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import { Product } from '../../types/product';
import { RootNavigationProps } from '../../types/navigation';
import { Routes } from '../../enums/routes';
import { formatNumber } from '../../helpers/number';
import StatusText from './StatusText';

export default function Transactions({ navigation }: RootNavigationProps) {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Transaction[]>([]);
  const [listings, setListings] = useState<Transaction[]>([]);

  const goBack = useGoBack();

  useEffect(() => {
    if (!user) {
      return;
    }

    const transactionsCollectionRef = collection(
      db,
      DB.USERS,
      user.uid,
      DB.TRANSACTIONS
    );

    const unsubscribe = onSnapshot(
      transactionsCollectionRef,
      (querySnapshot) => {
        const ordersArray: Transaction[] = [];
        const listingsArray: Transaction[] = [];

        querySnapshot.forEach((doc) => {
          const transaction: Transaction = doc.data() as Transaction;

          if (transaction.buyerEmail === user.email) {
            ordersArray.push(transaction);
          } else {
            listingsArray.push(transaction);
          }
        });

        setOrders(ordersArray);
        setListings(listingsArray);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  function handleClick(product: Product, transaction: Transaction) {
    if (transaction.buyerEmail === user?.email) {
      navigation.navigate(Routes.BUY, { product, transaction });
    } else {
      navigation.navigate(Routes.CHAT, { transaction });
    }
  }

  function handleRender(transaction: Transaction) {
    const { product, status, isSeen, lastMessage } = transaction;
    const { title, images, price } = product;

    const messagesStyle = !isSeen && 'font-bold';
    const borderStyle = !isSeen && 'border-primary-100';
    const titleStyle = !isSeen && 'text-primary-100';

    return (
      <TouchableOpacity
        className="relative h-36 w-full flex-row border-b border-gray-300 p-2"
        key={title}
        onPress={() => handleClick(product, transaction)}
      >
        <View className={`aspect-square border ${borderStyle}`}>
          <Image className="h-full w-full" source={{ uri: images[0] }} />
        </View>
        <View className="flex-1 justify-center p-4">
          <Text className={`mb-2 text-xl font-semibold ${titleStyle}`}>
            {product.title}
          </Text>
          <Text className="text-gray-500">₱{formatNumber(price)}</Text>
          <View className="mt-3 flex-row flex-wrap">
            <Text className="font-bold">Status: </Text>
            <StatusText status={status} />
          </View>
          <View className="flex-row">
            <Text className="font-bold">Messages: </Text>
            <Text className={`flex-1 ${messagesStyle}`} numberOfLines={1}>
              {lastMessage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderLoading = isLoading && <ActivityIndicator size="large" />;
  const renderNoOrders = !isLoading && !orders.length && (
    <Text className="mx-3 text-sm text-gray-400">
      You do not have any orders,
    </Text>
  );
  const renderNoListings = !isLoading && !listings.length && (
    <Text className="mx-3 text-sm text-gray-400">
      Your products have no orders.
    </Text>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <View className="relative flex-row items-center justify-center bg-primary-400 pb-10 pt-20">
          <TouchableOpacity className="absolute left-7 top-20" onPress={goBack}>
            <AntDesign color="white" name="left" size={30} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">Transactions</Text>
        </View>
        <Text className="mx-3 mt-5 text-center text-lg font-bold">
          MY ORDERS
        </Text>
        <>{renderLoading}</>
        <>{renderNoOrders}</>
        <FlatList
          className="mb-5"
          data={orders}
          renderItem={({ item }) => handleRender(item)}
        />
        <Text className="mx-3 border-t pt-2 text-center text-lg font-bold">
          MY LISTINGS
        </Text>
        <>{renderLoading}</>
        <>{renderNoListings}</>
        <FlatList
          className="py-5"
          data={listings}
          renderItem={({ item }) => handleRender(item)}
        />
      </ContentWrapper>
    </AuthWrapper>
  );
}
