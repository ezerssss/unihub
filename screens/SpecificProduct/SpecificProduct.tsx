import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ProductCarousel from './ProductCarousel';
import ContentWrapper from '../../components/ContentWrapper';
import { formatTime } from '../../helpers/date';
import { ProductNavigationProps } from '../../types/navigation';
import { Timestamp } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import useGoBack from '../../hooks/useGoBack';
import { ProductLoading } from '../../components/loading';
import AuthWrapper from '../../components/AuthWrapper';

function SpecificProduct({ route }: ProductNavigationProps) {
  const { product, isRedirect } = route.params;
  const goBack = useGoBack();

  if (!product) {
    return <ProductLoading />;
  }

  const { images, title, description, price, meetup, seller } = product;
  const { location, time } = meetup;
  const dateObject = isRedirect
    ? time
    : (time as unknown as Timestamp).toDate();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [descriptionLines, setDescriptionLines] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (descriptionLines !== undefined && descriptionLines <= 2) {
      setShowFullDescription(true);
    }
  }, [descriptionLines]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    setDescriptionLines(lines.length);
  };

  return (
    <AuthWrapper>
      <ContentWrapper hasHeader={false}>
        <View className="pt-10">
          <TouchableOpacity
            className="absolute left-7 top-20 z-20"
            onPress={goBack}
          >
            <AntDesign color="black" name="left" size={30} />
          </TouchableOpacity>
          <ScrollView className="flex-grow">
            <View className="px-2">
              <ProductCarousel images={images} />
            </View>
            <View className="flex-grow pb-20">
              <View className="flex-row">
                <Text className="pl-6 pt-6 text-2xl font-semibold">
                  {title}
                </Text>
                <Text className="absolute right-0 pr-6 pt-8 text-xs font-normal">
                  by {seller}
                </Text>
              </View>
              <View className="items-center px-5 pt-3 text-left">
                <Text
                  numberOfLines={showFullDescription ? undefined : 2}
                  className="text-left text-xs font-light text-slate-500"
                  onTextLayout={handleTextLayout}
                >
                  {description}
                </Text>
                {descriptionLines !== undefined && descriptionLines > 2 && (
                  <TouchableOpacity
                    className="mt-2 h-7 w-20 rounded-3xl bg-primary-100"
                    onPress={toggleDescription}
                  >
                    <Text className="items-center pt-1 text-center text-xs font-normal text-white">
                      {showFullDescription ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="h-5 w-20 bg-white"></View>
              <View className="h-24 w-screen bg-amber-300">
                <Text className="items-center py-9 pl-6 text-base font-semibold">
                  ₱{price}
                </Text>
              </View>
              <View className="h-52 bg-white">
                <Text className="absolute pl-6 pt-8 text-base font-medium text-black">
                  Meetup Details
                </Text>
                <View className="mx-4 mt-20 w-fit rounded-3xl bg-primary-100">
                  <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                    Meetup at {location}
                  </Text>
                </View>
                <View className="mx-4 mt-6 w-fit rounded-3xl bg-primary-100">
                  <Text className="px-4 py-3 text-left text-xs font-normal text-white">
                    Preferred Time of Meetup: {formatTime(dateObject)}
                  </Text>
                </View>
              </View>
              <View className="h-12 w-20 bg-white"></View>
              <TouchableOpacity className="absolute bottom-0 left-0 right-0 h-20 items-center bg-amber-300">
                <Text className="py-6 text-2xl font-bold text-white">BUY</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ContentWrapper>
    </AuthWrapper>
  );
}

export default SpecificProduct;
