import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UniHubIcon from '../../components/icons/UniHubIcon';
import { gradientColors } from '../../constants/color';

function GetFeatured() {
  return (
    <LinearGradient
      className="mx-auto mb-7 h-40 w-10/12 rounded-lg p-5 shadow shadow-black"
      colors={gradientColors}
      end={[0.9, 0]}
      start={[0, 0]}
      style={{ elevation: 4 }}
    >
      <Text className="font-medium">Want to get your product featured?</Text>
      <View className="flex-1 flex-row items-end justify-between">
        <View className="flex-1">
          <Text className="mb-4 text-xs text-gray-600">
            Maximize your product&apos;s selling potential with a featured
            listing!
          </Text>
          <TouchableOpacity
            className="h-10 w-32 items-center rounded-lg bg-secondary-100 py-3"
            onPress={() => alert('Coming Soon! Feature to be added.')}
          >
            <Text className="text-center text-xs font-semibold text-primary-400">
              GET FEATURED
            </Text>
          </TouchableOpacity>
        </View>
        <UniHubIcon />
      </View>
    </LinearGradient>
  );
}

export default GetFeatured;
