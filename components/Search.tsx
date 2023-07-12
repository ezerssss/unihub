import React from 'react';
import { View, TextInput } from 'react-native';
import { AlgoliaSearchIcon, SearchIcon } from './icons';

interface PropsInterface {
  autoFocus?: boolean;
  value?: string;
  onChange?: (query: string) => void;
  onFocus?: () => void;
}

function Search(props: PropsInterface) {
  const { autoFocus, value, onChange, onFocus } = props;

  return (
    <View className="flex-1 flex-row items-center justify-center rounded-lg bg-white px-3 py-1">
      <SearchIcon />
      <TextInput
        autoFocus={autoFocus}
        className="w-full flex-1 py-2 pl-3 text-black"
        placeholder="Search for products"
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
      />
      <AlgoliaSearchIcon />
    </View>
  );
}

export default Search;
