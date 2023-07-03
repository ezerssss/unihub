import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { Transaction } from '../../types/transaction';
import { StatusEnum } from '../../enums/status';
import UserContext from '../../context/UserContext';
import { RootStackParamsList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routes } from '../../enums/routes';
import { generateErrorMessage } from '../../helpers/error';
import { updateTransactionStatus } from '../../services/transaction';
import { deleteProduct } from '../../services/product';

interface PropsInterface {
  transaction: Transaction;
}

export default function TransactionButton(props: PropsInterface) {
  const { transaction } = props;
  const { status, product } = transaction;
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusEnum>(status);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handleUpdateStatus = useCallback(
    async (newStatus: StatusEnum) => {
      if (!user) {
        return;
      }

      try {
        setIsLoading(true);
        await updateTransactionStatus(user, transaction, newStatus);
        setCurrentStatus(newStatus);
      } catch (error) {
        const message = generateErrorMessage('', error, false);
        alert(message);
      } finally {
        setIsLoading(false);
      }
    },
    [user, transaction]
  );

  const renderDeniedButton = currentStatus === StatusEnum.DENY && (
    <View className="h-20 flex-1 items-center justify-center bg-gray-200">
      <Text className="font-bold">Order Denied</Text>
    </View>
  );

  const renderDenyButton = currentStatus === StatusEnum.CONFIRM && (
    <TouchableOpacity
      className="h-20 flex-1 items-center justify-center bg-gray-200"
      disabled={isLoading}
      onPress={() => handleUpdateStatus(StatusEnum.DENY)}
    >
      <Text className="font-bold">Deny Order Request</Text>
    </TouchableOpacity>
  );

  const handleDeleteProduct = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteProduct(product, user.uid);
    } catch (error) {
      const message = generateErrorMessage('', error, false);
      alert(message);
    } finally {
      setIsLoading(false);
    }
  }, [product, user]);

  async function handlePress() {
    if (currentStatus === StatusEnum.CONFIRM) {
      await handleUpdateStatus(StatusEnum.MEETUP);
    } else if (currentStatus === StatusEnum.MEETUP) {
      await handleUpdateStatus(StatusEnum.SUCCESS);
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
