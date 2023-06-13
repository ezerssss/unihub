import { View } from 'react-native';
import React, { useEffect } from 'react';
import ContentWrapper from '../ContentWrapper';
import { Animated } from 'react-native';

export default function HomeLoading() {
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
    <ContentWrapper hasHeader={true}>
      <View className="flex-1 justify-between p-2">
        <View>
          <Animated.View
            className="mx-2 my-10 rounded-2xl bg-gray-200"
            style={{ height: 250, opacity: opacityValue }}
          />
          <View className="mx-2 mb-8 flex flex-row items-center justify-center gap-2 align-middle">
            <Animated.View
              className="m-2 h-28 w-28 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
            <Animated.View
              className="m-2 h-28 w-28 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
            <Animated.View
              className="m-2 h-28 w-28 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
          </View>
          <View className="mx-2 flex flex-row items-center justify-center gap-2 align-middle">
            <Animated.View
              className="m-2 h-20 w-20 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
            <Animated.View
              className="m-2 h-20 w-20 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
            <Animated.View
              className="m-2 h-20 w-20 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
            <Animated.View
              className="m-2 h-20 w-20 rounded-xl bg-gray-200 py-5"
              style={{ opacity: opacityValue }}
            />
          </View>
        </View>
      </View>
    </ContentWrapper>
  );
}
