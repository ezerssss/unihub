import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { SearchIcon } from './icons';

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
    <View className="mb-6 mt-8 flex-1 flex-row items-center justify-center rounded-full bg-white px-3 py-1">
      <View className="ml-5">
        <SearchIcon />
      </View>
      <TextInput
        className="w-full py-2 pl-3 text-black"
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

export default Search;
