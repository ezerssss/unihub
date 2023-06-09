import { Text, TextInput } from 'react-native';
import React from 'react';

interface PropsInterface {
  value: string;
  isNumeric?: boolean;
  placeholder: string;
  title: string;
  onChange?: (text: string) => void;
}

export default function ProductDescription(props: PropsInterface) {
  const { value, title, placeholder, isNumeric, onChange } = props;

  function handleChange(text: string) {
    if (onChange) {
      onChange(text);
    }
  }

  const keyboardType = isNumeric ? 'numeric' : 'default';

  return (
    <>
      <Text className="mb-2 text-lg font-bold">{title}</Text>
      <TextInput
        className="mb-2 text-unihub-gray-200"
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(text)}
      />
    </>
  );
}
