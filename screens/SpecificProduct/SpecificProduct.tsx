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
import PencilIcon from '../../components/icons/PencilIcon';

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

  const renderEditButton = user?.displayName === product.seller && (
    <TouchableOpacity className="absolute right-7 top-14 z-20 h-12 w-12 items-center justify-center rounded-full bg-secondary-100">
      <PencilIcon />
    </TouchableOpacity>
  );

  const renderSeeMore = showSeeMore && (
    <TouchableOpacity
      className="mt-2 h-7 w-20 rounded-3xl bg-secondary-100"
      onPress={toggleDescription}
    >
      <Text className="items-center pt-1 text-center text-xs font-normal text-primary-400">
        {showFullDescription ? 'See Less' : 'See More'}
      </Text>
    </TouchableOpacity>
  );

  const renderButtonText = isLoading ? (
    <ActivityIndicator color="white" size="large" />
  ) : (
    <Text className="text-2xl font-extrabold text-white">Buy</Text>
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
            {renderEditButton}
            <View className="px-2">
              <ProductCarousel images={images} />
            </View>
            <View className="mx-8 mt-2 flex">
              <TouchableOpacity className="mb-2 flex">
                <Text className="text-primary-500">by {seller}</Text>
              </TouchableOpacity>
              <Text className="text-2xl font-semibold">{title}</Text>
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
            <View className="h-52 bg-white">
              <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
                Meetup Details
              </Text>
              <View className="mx-4 mt-20 w-fit self-start rounded-3xl bg-primary-200">
                <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                  Meetup at {location}
                </Text>
              </View>
              <View className="mx-4 mt-6 w-fit self-start rounded-3xl bg-primary-200">
                <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                  Preferred Time of Meetup: {formatTime(dateObject)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="bottom-0 flex h-28 w-full bg-white shadow shadow-black ">
          <Text className="text-s left-8 top-4 text-unihub-gray-400">
            Price:
          </Text>
          <Text className="absolute left-8 top-10 items-center text-lg font-bold text-primary-300">
            ₱{formatNumber(product.price)}
          </Text>
          <TouchableOpacity
            className="absolute right-3 top-4 h-12 w-36 items-center justify-center rounded-lg bg-secondary-100"
            disabled={isLoading}
            onPress={handleBuyOrder}
          >
            {renderButtonText}
          </TouchableOpacity>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default SpecificProduct;
