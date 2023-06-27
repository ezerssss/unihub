import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ReturnIcon from '../../components/icons/ReturnIcon';
import ContentWrapper from '../../components/ContentWrapper';
import Footer from '../../components/OrderConfirmationFooter/footer';
import UniHubIcon from '../../components/icons/UniHubIcon';
import ProgressBar from '../../components/progressbar/ProgressBar';
import ChatIcon from '../../components/icons/ChatIcon';
import { formatTime } from '../../helpers/date';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { Routes } from '../../enums/routes';
import { BuyNavigationProps } from '../../types/navigation';
import UserContext from '../../context/UserContext';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import { getTransactionDocID } from '../../helpers/message';
import { Transaction } from '../../types/transaction';

function Buy({ route, navigation }: BuyNavigationProps) {
  const { product, transaction } = route.params;

  const { user } = useContext(UserContext);

  const [transactionState, setTransactionState] =
    useState<Transaction>(transaction);
  const [transactionID, setTransactionID] = useState('');

  const dateObject = (product.meetup.time as unknown as Timestamp).toDate();

  function handleBack() {
    const { index, routes } = navigation.getState();

    if (index > 0) {
      const previousScreenName = routes[index - 1].name;

      if (previousScreenName === Routes.TRANSACTIONS) {
        navigation.goBack();
        return true;
      }
    }

    navigation.navigate(Routes.HOME);
    return true;
  }

  function goToChat() {
    navigation.navigate(Routes.CHAT, { transaction: transactionState });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      if (!user.email) {
        return;
      }

      const transactID = await getTransactionDocID(user.email, transaction);
      setTransactionID(transactID);
    })();
  }, [user]);

  useEffect(() => {
    if (!user || !transactionID) {
      return;
    }

    const transactionDocRef = doc(
      db,
      DB.USERS,
      user.uid,
      DB.TRANSACTIONS,
      transactionID
    );

    const unsubscribe = onSnapshot(transactionDocRef, (doc) => {
      setTransactionState(doc.data() as Transaction);
    });

    return () => unsubscribe();
  }, [user, transactionID]);

  const renderNotificationBubble = !transactionState.isSeen && (
    <View className="absolute right-0 top-0 z-20 rounded-full bg-red-600 p-2" />
  );

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1">
        <View className="mx-3 flex-row items-center justify-center py-12">
          <TouchableOpacity className="absolute left-0" onPress={handleBack}>
            <ReturnIcon />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Order Update</Text>
        </View>
        <View className="h-28 w-28 items-center justify-center self-center rounded-full bg-white shadow shadow-primary-300">
          <UniHubIcon />
        </View>
        <ProgressBar transaction={transactionState} />
        <View className="h-24 w-full flex-row items-center justify-between bg-secondary-400 px-8">
          <Text className="font-medium">Chat your seller</Text>
          <TouchableOpacity className="relative" onPress={goToChat}>
            {renderNotificationBubble}
            <ChatIcon />
          </TouchableOpacity>
        </View>
        <View className="p-8">
          <Text className="text-s font-medium text-primary-300">
            Meetup Details
          </Text>
          <View className="flex-row">
            <Text className="pt-2 text-xs">Meetup Location:</Text>
            <Text className="absolute right-8 text-xs">
              {product.meetup.location}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="pt-2 text-xs">Preferred Meetup Times</Text>
            <Text className="absolute right-8 text-xs">
              {formatTime(dateObject)}
            </Text>
          </View>
        </View>
      </View>
      <Footer />
    </ContentWrapper>
  );
}

export default Buy;
