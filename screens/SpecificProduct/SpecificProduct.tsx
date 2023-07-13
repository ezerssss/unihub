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
import NotificationContext from '../../context/NotificationContext';

function SpecificProduct({ route, navigation }: ProductNavigationProps) {
  const { product, isRedirect } = route.params;

  const { user } = useContext(UserContext);
  const { expoPushToken } = useContext(NotificationContext);

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
              const transaction = await buy(product, user, expoPushToken);
              navigation.navigate(Routes.BUY, {
                product,
                transaction,
              });
              setIsLoading(false);
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

  function goToEditSell() {
    return navigation.navigate(Routes.EDIT_SELL, { product });
  }

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
    <TouchableOpacity
      className="absolute right-7 top-14 z-20 h-12 w-12 items-center justify-center rounded-full bg-secondary-100"
      onPress={goToEditSell}
    >
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
            <ProductCarousel images={images} />
            <View className="mx-8 mt-2 flex">
              <TouchableOpacity className="mb-2 flex">
                <Text className="text-primary-300">by {seller}</Text>
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
        <View className="h-28 bg-white shadow shadow-black">
          <View
            className="h-full w-full flex-row items-center justify-between border-t-0 border-transparent px-5"
            style={{ elevation: 2 }}
          >
            <View>
              <Text className="text-sm text-unihub-gray-400">Price:</Text>
              <Text className="items-center text-lg font-bold text-primary-300">
                ₱{formatNumber(product.price)}
              </Text>
            </View>
            <TouchableOpacity
              className="h-12 w-36 items-center justify-center rounded-lg bg-secondary-100"
              disabled={isLoading}
              onPress={handleBuyOrder}
            >
              {renderButtonText}
            </TouchableOpacity>
          </View>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default SpecificProduct;
