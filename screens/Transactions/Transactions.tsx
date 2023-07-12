import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
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
import EditIcon from '../../components/icons/EditIcon';
import ChatIcon from '../../components/icons/ChatIcon';
import RoundedButton from './RoundedButton';
import { StatusEnum } from '../../enums/status';

export default function Transactions({ navigation }: RootNavigationProps) {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Transaction[]>([]);
  const [listings, setListings] = useState<Transaction[]>([]);
  const [activeOrderStatus, setActiveOrderStatus] = useState<StatusEnum>(
    StatusEnum.CONFIRM
  );
  const [activeListingStatus, setActiveListingStatus] = useState<StatusEnum>(
    StatusEnum.CONFIRM
  );

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
    const { product, isSeen } = transaction;
    const { title, images, price, seller } = product;

    const titleStyle = !isSeen && 'text-primary-100';

    const renderChat = activeListingStatus !== StatusEnum.CANCEL &&
      activeListingStatus !== StatusEnum.DENY && (
        <TouchableOpacity
          className="absolute right-6 top-5 rounded-full"
          onPress={() => handleClick(product, transaction)}
        >
          <ChatIcon />
        </TouchableOpacity>
      );

    const renderEditButton = seller === user?.displayName && (
      <TouchableOpacity className="absolute bottom-5 right-5 rounded-full bg-[#FFD700] p-[10px]">
        <EditIcon />
      </TouchableOpacity>
    );

    return (
      <View
        className="relative mx-4 h-40 flex-row rounded-2xl bg-white p-2 px-4 py-5 shadow-lg"
        key={title}
      >
        <View className="aspect-square">
          <Image className="h-full w-full" source={{ uri: images[0] }} />
        </View>
        <View className="flex-1 justify-center p-4">
          <Text className={`mb-1 text-xl font-normal ${titleStyle}`}>
            {product.title}
          </Text>
          <Text className="mb-5 text-[#3838FC]">
            by {seller !== user?.displayName ? seller : 'YOU'}
          </Text>
          <Text className="text-gray-500">₱{formatNumber(price)}</Text>
        </View>
        {renderChat}
        {renderEditButton}
      </View>
    );
  }

  const renderLoading = isLoading && <ActivityIndicator size="large" />;
  const renderNoOrders = !isLoading && !orders.length && (
    <Text className="mx-3 text-sm text-gray-400">
      You do not have any orders.
    </Text>
  );
  const renderNoListings = !isLoading && !listings.length && (
    <Text className="mx-3 h-14 text-sm text-gray-400">
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
        <Text className="mx-3 mt-5 text-xl font-extrabold text-[#2A2ABD]">
          Your Orders
        </Text>
        <ScrollView
          horizontal
          className="mt-3"
          showsHorizontalScrollIndicator={false}
        >
          <View className="mx-3 mb-5 mt-3 flex h-14 flex-row justify-between">
            <RoundedButton
              isActive={activeOrderStatus === StatusEnum.CONFIRM}
              title="Pending"
              onPress={() => setActiveOrderStatus(StatusEnum.CONFIRM)}
            />
            <RoundedButton
              isActive={activeOrderStatus === StatusEnum.MEETUP}
              title="Meetup in Progress"
              onPress={() => setActiveOrderStatus(StatusEnum.MEETUP)}
            />
            <RoundedButton
              isActive={activeOrderStatus === StatusEnum.SUCCESS}
              title="Completed"
              onPress={() => setActiveOrderStatus(StatusEnum.SUCCESS)}
            />
          </View>
        </ScrollView>
        <View className="mx-3 border-b border-primary-500" />
        <>{renderLoading}</>
        <>{renderNoOrders}</>
        <FlatList
          className="mb-5"
          data={orders.filter((orders) => orders.status === activeOrderStatus)}
          renderItem={({ item }) => handleRender(item)}
        />
        <Text className="mx-3 mt-5 text-xl font-extrabold text-[#2A2ABD]">
          Your Listings
        </Text>

        <View className="mx-3 border-b border-primary-500" />
        <ScrollView
          horizontal
          className="mt-3"
          showsHorizontalScrollIndicator={false}
        >
          <View className="mx-3 mb-5 mt-3 flex h-14 flex-row justify-between">
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.CONFIRM}
              title="Pending"
              onPress={() => setActiveListingStatus(StatusEnum.CONFIRM)}
            />
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.MEETUP}
              title="Meetup in Progress"
              onPress={() => setActiveListingStatus(StatusEnum.MEETUP)}
            />
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.SUCCESS}
              title="Completed"
              onPress={() => setActiveListingStatus(StatusEnum.SUCCESS)}
            />
          </View>
        </ScrollView>
        <>{renderLoading}</>
        <>{renderNoListings}</>
        <FlatList
          className="py-5"
          data={listings.filter(
            (listing) => listing.status === activeListingStatus
          )}
          renderItem={({ item }) => handleRender(item)}
        />
      </ContentWrapper>
    </AuthWrapper>
  );
}
