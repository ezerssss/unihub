import { ScrollView, View } from 'react-native';
import React from 'react';
import { StatusEnum } from '../../enums/status';
import RoundedButton from './RoundedButton';

interface PropsInterface {
  includePending?: boolean;
  activeListingStatus: StatusEnum;
  handleSetActiveListingStatus: (status: StatusEnum) => void;
}

export default function StatusPicker(props: PropsInterface) {
  const { includePending, activeListingStatus, handleSetActiveListingStatus } =
    props;

  const renderPending = includePending && (
    <RoundedButton
      isActive={activeListingStatus === StatusEnum.PENDING}
      title="Pending"
      onPress={() => handleSetActiveListingStatus(StatusEnum.PENDING)}
    />
  );

  return (
    <View className="mx-2 my-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <>{renderPending}</>
        <RoundedButton
          isActive={activeListingStatus === StatusEnum.CONFIRM}
          title="Order Requests"
          onPress={() => handleSetActiveListingStatus(StatusEnum.CONFIRM)}
        />
        <RoundedButton
          isActive={activeListingStatus === StatusEnum.MEETUP}
          title="Meetup in Progress"
          onPress={() => handleSetActiveListingStatus(StatusEnum.MEETUP)}
        />
        <RoundedButton
          isActive={activeListingStatus === StatusEnum.SUCCESS}
          title="Completed"
          onPress={() => handleSetActiveListingStatus(StatusEnum.SUCCESS)}
        />
        <RoundedButton
          isActive={activeListingStatus === StatusEnum.CANCEL}
          title="Canceled"
          onPress={() => handleSetActiveListingStatus(StatusEnum.CANCEL)}
        />
        <RoundedButton
          isActive={activeListingStatus === StatusEnum.DENY}
          title="Denied"
          onPress={() => handleSetActiveListingStatus(StatusEnum.DENY)}
        />
      </ScrollView>
    </View>
  );
}
