import { View, Text } from 'react-native';
import React from 'react';
import { Transaction } from '../../types/transaction';
import { StatusEnum } from '../../enums/status';

interface PropsInterface {
  transaction: Transaction;
}

function ProgressBar(props: PropsInterface) {
  const { transaction } = props;
  const { status } = transaction;

  let msg = '';
  if (status === StatusEnum.CONFIRM) {
    msg = 'Waiting for seller to recieve order...';
  } else if (status === StatusEnum.MEETUP) {
    msg = 'Waiting for a meetup...';
  } else if (status === StatusEnum.SUCCESS) {
    msg = 'Order successful, enjoy!';
  } else if (status === StatusEnum.DENY) {
    msg = 'Order denied by the seller.';
  }

  function generateStyle(bar: number): string {
    let progress = 1;
    if (status === StatusEnum.DENY) {
      progress = 0;
    } else if (status === StatusEnum.MEETUP) {
      progress = 2;
    } else if (status === StatusEnum.SUCCESS) {
      progress = 3;
    }

    if (bar <= progress) {
      return 'mx-3 h-2 w-24 rounded-3xl bg-primary-400';
    } else {
      return 'mx-3 h-2 w-24 rounded-3xl bg-light-silver';
    }
  }

  return (
    <View className="my-8">
      <Text className="me text-m self-center font-medium">{msg}</Text>
      <View className="flex-row items-center justify-center pt-4">
        <View className={generateStyle(1)} />
        <View className={generateStyle(2)} />
        <View className={generateStyle(3)} />
      </View>
    </View>
  );
}

export default ProgressBar;
