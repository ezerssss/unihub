import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchProps {
  onSearch: (query: string) => void;
}

function Search(props: SearchProps) {
  const { onSearch } = props;
  const [searchQuery, setSearchQuery] = useState<string>('');

  function handleSearch() {
    onSearch(searchQuery);
  }

  return (
    <View className="flex-row items-center justify-center bg-white rounded-full flex-1 mx-2 px-2 py-3">
      <TouchableOpacity onPress={handleSearch}>
        <View className="mr-3 ml-1">
          <AntDesign color="gray" name="search1" size={15} />
        </View>
      </TouchableOpacity>
      <TextInput
        className="text-black w-10/12"
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

export default Search;
