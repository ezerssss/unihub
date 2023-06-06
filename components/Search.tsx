import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = (props: SearchProps) => {
  const { onSearch } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');

  function handleSearch() {
    onSearch(searchQuery);
  }

  return (
    <View className="flex-row items-center justify-center bg-light-yellow rounded-full flex-1 mx-2 px-2 py-3">
      <TouchableOpacity onPress={handleSearch}>
        <View className="mr-2">
          <AntDesign name="search1" size={15} color="black" />
        </View>
      </TouchableOpacity>
      <TextInput
        className="text-black"
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default Search;
