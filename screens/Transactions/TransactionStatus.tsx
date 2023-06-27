import { Text } from 'react-native';
import React from 'react';
import { StatusEnum } from '../../enums/status';
import { getStatusText } from '../../helpers/status';
import { match } from 'ts-pattern';

interface PropsInterface {
  status: StatusEnum;
}

export default function TransactionStatus(props: PropsInterface) {
  const { status } = props;

  const textColor = match(status)
    .with(StatusEnum.DENY, () => 'text-red-600')
    .with(StatusEnum.CONFIRM, () => 'text-gray-400')
    .with(StatusEnum.MEETUP, () => 'text-yellow-500')
    .with(StatusEnum.SUCCESS, () => 'text-green-600')
    .exhaustive();

  return <Text className={`${textColor}`}>{getStatusText(status)}</Text>;
}
