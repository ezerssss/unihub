import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UniHubIcon from '../../components/icons/UniHubIcon';
import { gradientColors } from '../../constants/color';

function GetFeatured() {
  return (
    <View className="mx-7 mb-7 ml-8 h-40 w-10/12">
      <LinearGradient
        className="flex-1 items-center justify-center rounded-lg shadow shadow-black"
        colors={gradientColors}
        end={[0.9, 0]}
        start={[0, 0]}
        style={{ elevation: 4 }}
      >
        <Text className="bottom-9 pr-4 text-base font-medium">
          Want to get your product featured?
        </Text>

        <View className="absolute right-0 pt-3">
          <UniHubIcon />
        </View>
        <Text className="bottom-8 right-6 w-3/4 text-xs text-gray-600">
          Maximize your product&apos;s selling potential with a featured
          listing!
        </Text>
        <TouchableOpacity
          className="absolute bottom-0 left-0 mb-5 ml-8 h-10 w-32 items-center rounded-lg bg-secondary-100 py-3"
          onPress={() => alert('Coming Soon! Feature to be added.')}
        >
          <Text className="text-center text-xs font-semibold text-primary-400">
            GET FEATURED
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default GetFeatured;
