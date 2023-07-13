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
import EditIcon from '../../components/icons/EditIcon';
import ChatIcon from '../../components/icons/ChatIcon';
import { StatusEnum } from '../../enums/status';
import StatusPicker from './StatusPicker';

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
    StatusEnum.PENDING
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

    const unsubscribeTransactions = onSnapshot(
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
      unsubscribeTransactions();
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

  function handleRender(product: Product, transaction?: Transaction) {
    const { title, images, price, seller } = product;

    const isNotCancelledOrDenied =
      transaction?.status !== StatusEnum.CANCEL &&
      transaction?.status !== StatusEnum.DENY;

    const isProductOwned = user?.displayName === seller;

    const renderChatListing = isNotCancelledOrDenied &&
      isProductOwned &&
      transaction &&
      transaction.status !== StatusEnum.PENDING && (
        <TouchableOpacity
          className="absolute right-6 top-5 rounded-full"
          onPress={() => handleClick(product, transaction)}
        >
          <ChatIcon />
        </TouchableOpacity>
      );

    const renderChatOrder = !isProductOwned &&
      isNotCancelledOrDenied &&
      transaction && (
        <TouchableOpacity
          className="absolute right-6 top-4 rounded-full"
          onPress={() => handleClick(product, transaction)}
        >
          <ChatIcon />
        </TouchableOpacity>
      );

    const renderEditButton = isProductOwned && isNotCancelledOrDenied && (
      <TouchableOpacity
        className="absolute bottom-5 right-5 rounded-full bg-secondary-100 p-[10px]"
        onPress={() => goToEditSell(product)}
      >
        <EditIcon />
      </TouchableOpacity>
    );

    return (
      <View className="shadow-lg" key={title}>
        <View
          className="relative mx-4 mb-2 h-40 flex-row rounded-2xl border-0 border-transparent bg-white p-2 px-4 py-5"
          style={{ elevation: 4 }}
        >
          <View className="aspect-square">
            <Image className="h-full w-full" source={{ uri: images[0] }} />
          </View>
          <View className="flex-1 justify-center p-4">
            <Text className="mb-1 text-xl font-normal">{title}</Text>
            <Text className="mb-5 text-primary-300">
              by {seller !== user?.displayName ? seller : 'YOU'}
            </Text>
            <Text className="text-gray-500">₱{formatNumber(price)}</Text>
          </View>
          {renderChatOrder}
          {renderChatListing}
          {renderEditButton}
        </View>
      </View>
    );
  }

  const renderLoading = isLoading && <ActivityIndicator size="large" />;
  const renderNoOrders = (
    <Text className="mx-3 text-sm text-gray-400">
      You do not have any orders.
    </Text>
  );
  const renderNoListings = (
    <Text className="mx-3 text-sm text-gray-400">
      Your products have no orders.
    </Text>
  );

  const pendingListingProducts = products.filter(
    (product) =>
      !listings.some((listing) => listing.product.title === product.title)
  );
  const filteredListings = listings.filter(
    (listing) => listing.status === activeListingStatus
  );

  const renderListingFlatList =
    activeListingStatus === StatusEnum.PENDING ? (
      <FlatList
        data={pendingListingProducts}
        ListEmptyComponent={renderNoListings}
        renderItem={({ item }) => handleRender(item)}
      />
    ) : (
      <FlatList
        data={filteredListings}
        ListEmptyComponent={renderNoListings}
        renderItem={({ item }) => handleRender(item.product, item)}
      />
    );

  return (
    <AuthWrapper>
      <ContentWrapper hasLightStatusBar hasHeader={false}>
        <View className="relative h-28 flex-row items-center justify-center rounded-b-3xl bg-primary-400">
          <TouchableOpacity className="absolute left-7 top-12" onPress={goBack}>
            <AntDesign color="white" name="left" size={30} />
          </TouchableOpacity>
          <Text className="absolute top-12 text-lg font-bold text-white">
            Your Transactions
          </Text>
        </View>
        <View className="mb-5 flex-1">
          <Text className="mx-3 mt-4 text-lg font-extrabold text-primary-200">
            Your Orders
          </Text>
          <View className="mx-3 border-b border-primary-500" />
          <StatusPicker
            activeListingStatus={activeOrderStatus}
            handleSetActiveListingStatus={(status) =>
              setActiveOrderStatus(status)
            }
          />
          <>{renderLoading}</>
          <FlatList
            data={orders.filter(
              (orders) => orders.status === activeOrderStatus
            )}
            ListEmptyComponent={renderNoOrders}
            renderItem={({ item }) => handleRender(item.product, item)}
          />
        </View>
        <View className="flex-1">
          <Text className="mx-3 text-lg font-extrabold text-primary-200">
            Your Listings
          </Text>
          <View className="mx-3 border-b border-primary-500" />
          <StatusPicker
            includePending
            activeListingStatus={activeListingStatus}
            handleSetActiveListingStatus={(status) =>
              setActiveListingStatus(status)
            }
          />
          <>{renderLoading}</>
          <>{renderListingFlatList}</>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}
