import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { SearchIcon } from '../components/icons';

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
    <View className="mx-2 flex-1 flex-row items-center justify-center rounded-full bg-white px-2 py-3">
      <TouchableOpacity onPress={handleSearch}>
        <View className="ml-1 mr-3">
          <SearchIcon />
        </View>
      </TouchableOpacity>
      <TextInput
        className="w-10/12 text-black"
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

export default Search;
