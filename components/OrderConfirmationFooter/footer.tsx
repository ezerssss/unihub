import { Text, View } from 'react-native';
import React from 'react';
import UniHubIconSmall from '../icons/UniHubIconSmall';

function Footer() {
  return (
    <View className="absolute bottom-0 flex h-44 w-full rounded-3xl bg-white shadow shadow-black">
      <View
        className="h-full border-t-0 border-transparent"
        style={{ elevation: 1 }}
      >
        <Text className="text-s pb-2 pl-8 pt-8 font-medium">Did you know?</Text>
        <View className="flex-row">
          <Text className="w-5/6 pl-16 text-center text-xs">
            UniHub started as a school project. The project drew inspiration
            from the idea of students having to buy brand new books and it’s
            only good for a semester and the founders were like “HEY! Isn’t this
            like a waste of money?” and so UniHub was born. It was born to help
            students find a way to get books affordably.
          </Text>
          <View className="absolute bottom-2 right-5">
            <UniHubIconSmall />
          </View>
        </View>
      </View>
    </View>
  );
}
export default Footer;
