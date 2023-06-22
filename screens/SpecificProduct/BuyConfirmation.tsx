import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useGoBack from '../../hooks/useGoBack';
import ReturnIcon from '../../components/icons/ReturnIcon';
import ContentWrapper from '../../components/ContentWrapper';
import Footer from '../../components/OrderConfirmationFooter/footer';
import UniHubIcon from '../../components/icons/UniHubIcon';
import ProgressBar from '../../components/progressbar/ProgressBar';
import ChatIcon from '../../components/icons/ChatIcon';
import { formatTime } from '../../helpers/date';
import { Timestamp } from 'firebase/firestore';
import { Routes } from '../../enums/routes';
import { BuyNavigationProps } from '../../types/navigation';

function Buy({ route, navigation }: BuyNavigationProps) {
  const { product } = route.params;

  const dateObject = (product.meetup.time as unknown as Timestamp).toDate();

  const goBack = useGoBack();

  function goToChat() {
    navigation.navigate(Routes.CHAT);
  }

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1">
        <View className="mx-3 flex-row items-center justify-center py-12">
          <TouchableOpacity className="absolute left-0" onPress={goBack}>
            <ReturnIcon />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Order Update</Text>
        </View>
        <View className="h-28 w-28 items-center justify-center self-center rounded-full bg-white shadow shadow-primary-300">
          <UniHubIcon />
        </View>
        <ProgressBar />
        <View className="h-24 w-full flex-row items-center justify-center bg-secondary-400">
          <Text className="absolute left-8 text-base font-medium">
            Chat your seller
          </Text>
          <TouchableOpacity className="absolute right-6" onPress={goToChat}>
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
