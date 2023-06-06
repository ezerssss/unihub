import React from 'react';
import { View, Text } from 'react-native';
import Search from './Search';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

const Header: React.FC = () => {
  return (
    <View className="bg-primary-100 pt-20 w-full">
      <View className="px-4 flex-row items-center justify-between">
        <View className="w-1/6">
          <MaterialIcons name="menu" size={30} color="white" />
        </View>
        <Search
          onSearch={(query: string) => {
            console.log(query);
          }}
        />
        <View className="w-1/6 flex-row justify-end">
          <Ionicons name="chatbox-ellipses-outline" size={30} color="white" />
        </View>
      </View>
      <View className="px-4 flex-row justify-evenly mt-10 mb-4">
        <View className="flex-1">
          <Text className="text-white font-bold text-center">Shop</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-center">Services</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
