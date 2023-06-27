import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { Transaction } from '../../types/transaction';
import { StatusEnum } from '../../enums/status';
import { getTransactionDocID } from '../../helpers/message';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import db from '../../firebase/db';
import { DB } from '../../enums/db';
import UserContext from '../../context/UserContext';
import { getUserDocID } from '../../helpers/user';
import { RootStackParamsList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';

interface PropsInterface {
  transaction: Transaction;
}

export default function TransactionButton(props: PropsInterface) {
  const { transaction } = props;
  const { status, buyerEmail, sellerEmail, product } = transaction;
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusEnum>(status);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  async function handleDBUpdate(newStatus: StatusEnum) {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);

      const sellerTransactionDocID = await getTransactionDocID(
        sellerEmail,
        transaction
      );
      const buyerTransactionDocID = await getTransactionDocID(
        buyerEmail,
        transaction
      );
      const buyerUid = await getUserDocID(buyerEmail);

      const sellerDocRef = doc(
        db,
        DB.USERS,
        user.uid,
        DB.TRANSACTIONS,
        sellerTransactionDocID
      );
      const buyerDocRef = doc(
        db,
        DB.USERS,
        buyerUid,
        DB.TRANSACTIONS,
        buyerTransactionDocID
      );

      await updateDoc(sellerDocRef, { status: newStatus });
      await updateDoc(buyerDocRef, { status: newStatus, isSeen: false });

      setCurrentStatus(newStatus);
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  const renderDeniedButton = currentStatus === StatusEnum.DENY && (
    <View className="h-20 flex-1 items-center justify-center bg-gray-200">
      <Text className="font-bold">Order Denied</Text>
    </View>
  );

  const renderDenyButton = currentStatus === StatusEnum.CONFIRM && (
    <TouchableOpacity
      className="h-20 flex-1 items-center justify-center bg-gray-200"
      disabled={isLoading}
      onPress={() => handleDBUpdate(StatusEnum.DENY)}
    >
      <Text className="font-bold">Deny Order Request</Text>
    </TouchableOpacity>
  );

  async function handleDeleteProduct() {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);
      const productsRef = collection(db, DB.PRODUCTS);
      const userProductsRef = collection(db, DB.USERS, user.uid, DB.PRODUCTS);
      const qProducts = query(
        productsRef,
        where('title', '==', product.title),
        where('seller', '==', product.seller)
      );
      const qUsers = query(
        userProductsRef,
        where('title', '==', product.title),
        where('seller', '==', product.seller)
      );

      const qProductsSnapshot = await getDocs(qProducts);
      const qUsersSnapshot = await getDocs(qUsers);

      if (qProductsSnapshot.empty || qUsersSnapshot.empty) {
        return;
      }

      const productsDocID = qProductsSnapshot.docs[0].id;
      const productRef = doc(db, DB.PRODUCTS, productsDocID);

      const userProductsDocId = qUsersSnapshot.docs[0].id;
      const userProductRef = doc(db, DB.USERS, user.uid, userProductsDocId);

      await deleteDoc(productRef);
      await deleteDoc(userProductRef);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePress() {
    if (currentStatus === StatusEnum.CONFIRM) {
      await handleDBUpdate(StatusEnum.MEETUP);
    } else if (currentStatus === StatusEnum.MEETUP) {
      await handleDBUpdate(StatusEnum.SUCCESS);
      await handleDeleteProduct();
      navigation.navigate(Routes.PRODUCT_SOLD);
    }
  }

  const renderButtonText =
    currentStatus === StatusEnum.CONFIRM ? 'Approve Order' : 'Confirm Payment';

  const renderButtons = currentStatus !== StatusEnum.DENY &&
    currentStatus !== StatusEnum.SUCCESS && (
      <TouchableOpacity
        className="h-20 flex-1 items-center justify-center bg-secondary-100"
        disabled={isLoading}
        onPress={handlePress}
      >
        <Text className="font-bold text-white">{renderButtonText}</Text>
      </TouchableOpacity>
    );

  const renderLoading = isLoading && (
    <ActivityIndicator
      className="absolute top-6 z-20"
      color="black"
      size="large"
    />
  );

  return (
    <View className="relative mb-5 w-full flex-row justify-center">
      {renderDeniedButton}
      {renderDenyButton}
      {renderLoading}
      {renderButtons}
    </View>
  );
}
