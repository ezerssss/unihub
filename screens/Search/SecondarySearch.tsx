import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Search from '../../components/Search';
import { LeftArrowIcon } from '../../components/icons';
import useGoBack from '../../hooks/useGoBack';

export default function SecondarySearch() {
  const [searchText, setSearchText] = useState('');

  const goBack = useGoBack();

  return (
    <View className="flex-row items-center bg-primary-400 px-4 pb-5 pt-16">
      <TouchableOpacity
        className="mr-5 h-8 w-8 items-center justify-center"
        onPress={goBack}
      >
        <LeftArrowIcon />
      </TouchableOpacity>
      <Search
        autoFocus
        value={searchText}
        onChange={(query: string) => setSearchText(query)}
      />
    </View>
  );
}
