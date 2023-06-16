import { Animated, View } from 'react-native';
import React, { useEffect } from 'react';

export default function ProductListingLoading() {
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
    <>
      <View className="h-36 w-full flex-row border-b border-gray-300 bg-white p-2">
        <Animated.View
          className="aspect-square rounded-lg bg-gray-100"
          style={{ opacity: opacityValue }}
        />
        <View className="w-3/4 justify-center p-4">
          <Animated.View
            className="mb-3 h-5 w-40 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="h-5 w-24 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
        </View>
      </View>
      <View className="h-36 w-full flex-row border-b border-gray-300 bg-white p-2">
        <Animated.View
          className="aspect-square rounded-lg bg-gray-100"
          style={{ opacity: opacityValue }}
        />
        <View className="w-3/4 justify-center p-4">
          <Animated.View
            className="mb-3 h-5 w-40 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="h-5 w-24 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
        </View>
      </View>
      <View className="h-36 w-full flex-row border-b border-gray-300 bg-white p-2">
        <Animated.View
          className="aspect-square rounded-lg bg-gray-100"
          style={{ opacity: opacityValue }}
        />
        <View className="w-3/4 justify-center p-4">
          <Animated.View
            className="mb-3 h-5 w-40 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
          <Animated.View
            className="h-5 w-24 rounded-lg bg-gray-100"
            style={{ opacity: opacityValue }}
          />
        </View>
      </View>
    </>
  );
}
