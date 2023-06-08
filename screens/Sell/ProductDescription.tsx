import { Text, TextInput } from 'react-native';
import React from 'react';

interface PropsInterface {
  isNumeric?: boolean;
  placeholder: string;
  title: string;
  onChange?: (text: string) => void;
}

export default function ProductDescription(props: PropsInterface) {
  const { title, placeholder, isNumeric, onChange } = props;

  function handleChange(text: string) {
    if (onChange) {
      onChange(text);
    }
  }

  const keyboardType = isNumeric ? 'numeric' : 'default';

  return (
    <>
      <Text className="font-bold text-lg mb-2">{title}</Text>
      <TextInput
        className="text-unihub-gray-200 mb-2"
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={(text) => handleChange(text)}
      />
    </>
  );
}
