import { TouchableOpacity, Text } from 'react-native';
import { match } from 'ts-pattern';

import { ListingStatus } from './types';

interface StatusButtonProps {
  status: ListingStatus;
}

function StatusButton(props: StatusButtonProps) {
  const { status } = props;

  const buttonColor = match(status)
    .with(ListingStatus.OPEN, () => 'bg-secondary-100')
    .with(ListingStatus.WAITING, () => 'bg-light-silver')
    .with(ListingStatus.IN_PROGRESS, () => 'bg-secondary-100')
    .exhaustive();

  const buttonStatus = match(status)
    .with(ListingStatus.OPEN, () => 'Open to approve order')
    .with(ListingStatus.WAITING, () => 'Waiting for order')
    .with(ListingStatus.IN_PROGRESS, () => 'Meeting in progress')
    .exhaustive();

  return (
    <TouchableOpacity
      className={`mt-auto w-56 items-center rounded-full ${buttonColor} px-4 py-5`}
    >
      <Text className="text-lg font-bold text-white">{buttonStatus}</Text>
    </TouchableOpacity>
  );
}
export default StatusButton;
