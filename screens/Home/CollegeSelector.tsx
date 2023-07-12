import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colleges from '../../data/colleges';

function CollegeSelector() {
  return (
    <View className="mb-10 mt-5 flex-row flex-wrap items-center justify-center">
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
