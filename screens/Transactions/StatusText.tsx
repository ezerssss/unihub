import { match } from 'ts-pattern';
import { StatusEnum } from '../../enums/status';
import { Text } from 'react-native';

interface PropsInterface {
  status: StatusEnum;
}

export default function StatusText(props: PropsInterface) {
  const { status } = props;

  const textColor = match(status)
    .with(StatusEnum.DENY, () => 'text-red-600')
    .with(StatusEnum.CONFIRM, () => 'text-gray-400')
    .with(StatusEnum.MEETUP, () => 'text-yellow-500')
    .with(StatusEnum.SUCCESS, () => 'text-green-600')
    .exhaustive();

  const text = match(status)
    .with(StatusEnum.DENY, () => 'Seller denied your order.')
    .with(StatusEnum.CONFIRM, () => 'Waiting for confirmation.')
    .with(StatusEnum.MEETUP, () => 'Meetup in progress.')
    .with(StatusEnum.SUCCESS, () => 'Order successful.')
    .exhaustive();

  return <Text className={`${textColor}`}>{text}</Text>;
}
