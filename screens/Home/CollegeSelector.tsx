import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colleges from '../../data/colleges';
function CollegeSelector() {
    return (
        <View className="mx-8 mt-4 mb-8">
          {Array(Math.ceil(Colleges.length / 3)).fill().map((_, rowIndex) => (
            <View className="flex-row" key={rowIndex}>
              {Colleges.slice(rowIndex * 3, rowIndex * 3 + 3).map((college, index) => (
                <TouchableOpacity className="h-32 w-24 mx-2 my-2" key={index} onPress={() => alert('Coming Soon! Feature to be added.')}>
                  <Image className="h-24 rounded-lg" source={{ uri: college.image }} />
                  <Text className="text-xs font-medium text-center">{college.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      );
}

export default CollegeSelector;
