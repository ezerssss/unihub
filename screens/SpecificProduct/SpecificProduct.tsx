import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useContext } from 'react';
import ProductCarousel from './ProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';
import { formatTime } from '../../helpers/date';
import { ProductNavigationProps } from '../../types/navigation';
import { Timestamp } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { formatNumber } from '../../helpers/number';
import useGoBack from '../../hooks/useGoBack';
import { ProductLoading } from '../../components/loading';
import AuthWrapper from '../../components/AuthWrapper';
import { Routes } from '../../enums/routes';
import UserContext from '../../context/UserContext';
import { generateErrorMessage } from '../../helpers/error';
import { buy } from '../../services/transaction';

function SpecificProduct({ route, navigation }: ProductNavigationProps) {
  const { product, isRedirect } = route.params;

  const { user } = useContext(UserContext);

  const [numberOfLines, setNumberOfLines] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleBuyOrder() {
    try {
      if (!user) {
        return;
      }

      if (user.displayName === product.seller) {
        alert("You can't buy your own product.");
        return;
      }

      Alert.alert(
        'Confirm Purchase?',
        '',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              setIsLoading(true);
              const transaction = await buy(product, user);
              setIsLoading(false);
              navigation.navigate(Routes.BUY, {
                product,
                transaction,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      const message = generateErrorMessage(error);
      alert(message);
    }
  }

  const goBack = useGoBack();

  if (!product) {
    return <ProductLoading />;
  }

  const { images, description, meetup, seller, title } = product;
  const { location, time } = meetup;
  const dateObject = isRedirect
    ? time
    : (time as unknown as Timestamp).toDate();

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  function handleTextLayout(event: NativeSyntheticEvent<TextLayoutEventData>) {
    setNumberOfLines(2);
    const numberOfLines = event.nativeEvent.lines.length;

    if (numberOfLines > 2) {
      setShowSeeMore(true);
    }
  }

  const renderSeeMore = showSeeMore && (
    <TouchableOpacity
      className="mt-2 h-7 w-20 rounded-3xl bg-primary-100"
      onPress={toggleDescription}
    >
      <Text className="items-center pt-1 text-center text-xs font-normal text-white">
        {showFullDescription ? 'Read Less' : 'Read More'}
      </Text>
    </TouchableOpacity>
  );

  const renderButtonText = isLoading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <Text className="py-6 text-2xl font-extrabold text-white">Buy</Text>
  );

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <View className="flex-1 justify-start pt-10">
            <TouchableOpacity
              className="absolute left-5 top-14 z-20 rounded-full bg-primary-100 p-2"
              onPress={goBack}
            >
              <AntDesign color="white" name="left" size={30} />
            </TouchableOpacity>
            <View className="px-2">
              <ProductCarousel images={images} />
            </View>
            <View className="relative pl-6 pt-6">
              <Text className="max-w-[66%] text-2xl font-semibold">
                {title}
              </Text>
              <Text className="absolute right-6 top-8 text-xs">
                by {seller}
              </Text>
            </View>
            <View className="px-6 pt-3">
              <Text
                className="text-left text-xs font-light text-slate-500"
                numberOfLines={showFullDescription ? undefined : numberOfLines}
                onTextLayout={handleTextLayout}
              >
                {description}
              </Text>
              {renderSeeMore}
            </View>
            <View className="h-5 w-20 bg-white"></View>
            <View className="h-24 w-screen bg-secondary-400">
              <Text className="items-center py-9 pl-6 text-base font-semibold">
                ₱{formatNumber(product.price)}
              </Text>
            </View>
            <View className="h-52 bg-white">
              <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
                Meetup Details
              </Text>
              <View className="mx-4 mt-20 w-fit self-start rounded-3xl bg-primary-400">
                <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                  Meetup at {location}
                </Text>
              </View>
              <View className="mx-4 mt-6 w-fit self-start rounded-3xl bg-primary-400">
                <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                  Preferred Time of Meetup: {formatTime(dateObject)}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="mt-5 h-20 items-center bg-amber-300"
            disabled={isLoading}
            onPress={handleBuyOrder}
          >
            {renderButtonText}
          </TouchableOpacity>
        </ScrollView>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default SpecificProduct;
