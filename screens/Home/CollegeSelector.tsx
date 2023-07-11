import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colleges from '../../data/colleges';

function CollegeSelector() {
  return (
    <View className="mx-8 mb-8 mt-4 grid grid-cols-3 gap-4">
      {Colleges.map((college, index) => (
        <TouchableOpacity
          className="mx-2 my-2 h-32 w-24"
          key={index}
          onPress={() => alert('Coming Soon! Feature to be added.')}
        >
          <Image className="h-24 rounded-lg" source={{ uri: college.image }} />
          <Text className="text-center text-xs font-medium">
            {college.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default CollegeSelector;
