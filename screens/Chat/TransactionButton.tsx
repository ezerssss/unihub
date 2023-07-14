import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
import {
  cancelAllProductTransactions,
  deleteProduct,
} from '../../services/product';

interface PropsInterface {
  transaction: Transaction;
}

export default function TransactionButton(props: PropsInterface) {
  const { transaction } = props;
  const { status, product } = transaction;
  const { user } = useContext(UserContext);

  const [isConfirmButtonsLoading, setIsConfirmButtonsLoading] = useState(false);
  const [isDenyButtonsLoading, setIsDenyButtonsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusEnum>(status);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  const handleUpdateStatus = useCallback(
    async (newStatus: StatusEnum) => {
      if (!user) {
        return;
      }

      try {
        await updateTransactionStatus(user, transaction, newStatus);
        setCurrentStatus(newStatus);
      } catch (error) {
        const message = generateErrorMessage(error);
        alert(message);
      } finally {
        setIsConfirmButtonsLoading(false);
        setIsDenyButtonsLoading(false);
      }
    },
    [user, transaction]
  );

  const handleDeleteProduct = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      setIsConfirmButtonsLoading(true);
      await deleteProduct(product, user);
    } catch (error) {
      const message = generateErrorMessage(error);
      alert(message);
    } finally {
      setIsConfirmButtonsLoading(false);
    }
  }, [product, user]);

  async function handleConfirmServices() {
    if (!user) {
      return;
    }

    if (currentStatus === StatusEnum.CONFIRM) {
      await handleUpdateStatus(StatusEnum.MEETUP);
      await cancelAllProductTransactions(product, user, true);
    } else if (currentStatus === StatusEnum.MEETUP) {
      await handleUpdateStatus(StatusEnum.SUCCESS);
      await handleDeleteProduct();

      navigation.navigate(Routes.PRODUCT_SOLD);
    }
  }

  async function handleConfirmButtons() {
    if (!user) {
      return;
    }

    setIsConfirmButtonsLoading(true);

    let confirmationMessage = '';

    if (currentStatus === StatusEnum.CONFIRM) {
      confirmationMessage = 'Are you sure you want to approve this order?';
    } else if (currentStatus === StatusEnum.MEETUP) {
      confirmationMessage = 'Are you sure you want to confirm the payment?';
    }

    Alert.alert('Confirmation', confirmationMessage, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: handleConfirmServices,
      },
    ]);
  }

  const renderButtonText =
    currentStatus === StatusEnum.CONFIRM ? 'Approve Order' : 'Confirm Payment';

  const denyButtonText =
    transaction.status === StatusEnum.CONFIRM
      ? 'Deny Order Request'
      : 'Cancel Order';

  async function handleDenyServices() {
    if (transaction.status === StatusEnum.CONFIRM) {
      handleUpdateStatus(StatusEnum.DENY);
    } else if (transaction.status === StatusEnum.MEETUP) {
      handleUpdateStatus(StatusEnum.CANCEL);
    }
  }

  async function handleDenyButtons() {
    if (!user) {
      return;
    }

    setIsDenyButtonsLoading(true);

    let confirmationMessage = '';

    if (currentStatus === StatusEnum.CONFIRM) {
      confirmationMessage = 'Are you sure you want to deny this order?';
    } else if (currentStatus === StatusEnum.MEETUP) {
      confirmationMessage = 'Are you sure you want to cancel the order?';
    }

    Alert.alert('Confirmation', confirmationMessage, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: handleDenyServices,
      },
    ]);
  }

  return (
    <View className="bg-white shadow shadow-gray-100">
      <View
        className="flex-row justify-between px-3 py-4"
        style={{ elevation: 1 }}
      >
        <TouchableOpacity
          className="w-44 items-center justify-center rounded-lg bg-light-silver py-4"
          disabled={isConfirmButtonsLoading || isDenyButtonsLoading}
          onPress={handleDenyButtons}
        >
          {isDenyButtonsLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text className="font-bold text-deny-text">{denyButtonText}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="w-44 items-center justify-center rounded-lg bg-secondary-100 py-4"
          disabled={isConfirmButtonsLoading || isDenyButtonsLoading}
          onPress={handleConfirmButtons}
        >
          {isConfirmButtonsLoading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text className="font-bold text-white">{renderButtonText}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
