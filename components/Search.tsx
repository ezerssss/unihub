import React from 'react';
import { View, TextInput } from 'react-native';
import { SearchIcon } from './icons';

interface PropsInterface {
  autoFocus?: boolean;
  value?: string;
  onChange?: (query: string) => void;
  onFocus?: () => void;
}

function Search(props: PropsInterface) {
  const { autoFocus, value, onChange, onFocus } = props;

  return (
    <View className="flex-1 flex-row items-center justify-center rounded-xl bg-white px-3 py-1">
      <View className="ml-5">
        <SearchIcon />
      </View>
      <TextInput
        autoFocus={autoFocus}
        className="w-full py-2 pl-3 text-black"
        placeholder="Search for products"
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
      />
    </View>
  );
}

export default Search;
