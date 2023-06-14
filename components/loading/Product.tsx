import { View } from 'react-native';
import React, { useEffect } from 'react';
import ContentWrapper from '../ContentWrapper';
import { Animated } from 'react-native';

export default function ProductLoading() {
  const opacityValue = new Animated.Value(0.5);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ContentWrapper hasHeader={false}>
      <View className="flex-1 justify-between p-2">
        <View>
          <Animated.View
            className="mx-2 my-10 rounded-2xl bg-gray-200"
            style={{ height: 250, opacity: opacityValue }}
          />
          <Animated.View
            className="m-2 w-[80%] rounded-xl bg-gray-200 py-5"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="mx-2 mt-4 rounded-xl bg-gray-200 py-3"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="m-2 w-[40%] rounded-xl bg-gray-200 py-3"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="m-2 mt-10 w-[80%] rounded-xl bg-gray-200 py-20"
            style={{ opacity: opacityValue }}
          />
        </View>
        <Animated.View
          className="m-2 rounded-2xl bg-gray-200 p-10"
          style={{ opacity: opacityValue }}
        />
      </View>
    </ContentWrapper>
  );
}
