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
  const [products, setProducts] = useState<Product[]>([]);
  const [activeOrderStatus, setActiveOrderStatus] = useState<StatusEnum>(
    StatusEnum.CONFIRM
  );
  const [activeListingStatus, setActiveListingStatus] = useState<StatusEnum>(
    StatusEnum.CONFIRM
  );

  const goBack = useGoBack();

  function goToEditSell(product: Product) {
    return navigation.navigate(Routes.EDIT_SELL, {
      product,
    });
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const productsCollectionRef = collection(
      db,
      DB.USERS,
      user.uid,
      DB.PRODUCTS
    );
    const transactionsCollectionRef = collection(
      db,
      DB.USERS,
      user.uid,
      DB.TRANSACTIONS
    );

    const unsubscribeProducts = onSnapshot(
      productsCollectionRef,
      (querySnapshot) => {
        const productsArray: Product[] = [];

        querySnapshot.forEach((doc) => {
          const product: Product = doc.data() as Product;

          productsArray.push(product);
        });

        setProducts(productsArray);
      }
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

    return () => {
      unsubscribe();
      unsubscribeProducts();
    };
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

    const renderChat = activeListingStatus !== StatusEnum.PENDING &&
      activeListingStatus !== StatusEnum.DENY && (
        <TouchableOpacity
          className="absolute right-6 top-5 rounded-full"
          onPress={() => handleClick(product, transaction)}
        >
          <ChatIcon />
        </TouchableOpacity>
      );
    const renderEditButton = user?.displayName !== product.seller && (
      <TouchableOpacity
        className="absolute bottom-5 right-5 rounded-full bg-[#FFD700] p-[10px]"
        onPress={() => goToEditSell(product)}
      >
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
          <Text className="mb-5 text-primary-300">
            by {seller !== user?.displayName ? seller : 'YOU'}
          </Text>
          <Text className="text-gray-500">₱{formatNumber(price)}</Text>
        </View>
        {renderChat}
        {renderEditButton}
      </View>
    );
  }

  function getListingData() {
    const pendingProducts: Product[] = [];
    listings.forEach((listing) => {
      products.forEach((product) => {
        if (product === listing.product) {
          pendingProducts.push(product);
        }
      });
    });

    if (activeListingStatus === StatusEnum.PENDING) {
      return pendingProducts;
    } else {
      return listings;
    }
  }

  const renderLoading = isLoading && <ActivityIndicator size="large" />;
  const renderNoOrders = (
    <Text className="mx-3 text-sm text-gray-400">
      You do not have any orders.
    </Text>
  );
  const renderNoListings = (
    <Text className="mx-3 h-14 text-sm text-gray-400">
      Your products have no orders.
    </Text>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <View className="relative h-28 flex-row items-center justify-center rounded-3xl bg-primary-400">
          <TouchableOpacity className="absolute left-7 top-12" onPress={goBack}>
            <AntDesign color="white" name="left" size={30} />
          </TouchableOpacity>
          <Text className="absolute top-12 text-lg font-bold text-white">
            Your Transactions
          </Text>
        </View>
        <Text className="mx-3 mt-4 text-lg font-extrabold text-primary-200">
          Your Orders
        </Text>
        <View className="mx-3 border-b border-primary-500" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="mx-[9px] mb-5 mt-3 flex h-8 flex-row justify-between">
            <RoundedButton
              isActive={activeOrderStatus === StatusEnum.CONFIRM}
              title="Order Requests"
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
            <RoundedButton
              isActive={activeOrderStatus === StatusEnum.CANCEL}
              title="Canceled"
              onPress={() => setActiveOrderStatus(StatusEnum.CANCEL)}
            />
          </View>
        </ScrollView>
        <>{renderLoading}</>
        <FlatList
          className="mb-5"
          data={orders.filter((orders) => orders.status === activeOrderStatus)}
          ListEmptyComponent={renderNoOrders}
          renderItem={({ item }) => handleRender(item)}
        />
        <Text className="mx-3 text-lg font-extrabold text-primary-200">
          Your Listings
        </Text>
        <View className="mx-3 border-b border-primary-500" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="mx-3 mb-5 mt-3 flex h-8 flex-row justify-between">
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.PENDING}
              title="Pending"
              onPress={() => setActiveListingStatus(StatusEnum.PENDING)}
            />
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.CONFIRM}
              title="Order Requests"
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
            <RoundedButton
              isActive={activeListingStatus === StatusEnum.CANCEL}
              title="Canceled"
              onPress={() => setActiveListingStatus(StatusEnum.CANCEL)}
            />
          </View>
        </ScrollView>
        <>{renderLoading}</>
        <FlatList
          className="py-5"
          data={listings.filter(
            (listing) => listing.status === activeListingStatus
          )}
          ListEmptyComponent={renderNoListings}
          renderItem={({ item }) => handleRender(item)}
        />
      </ContentWrapper>
    </AuthWrapper>
  );
}
