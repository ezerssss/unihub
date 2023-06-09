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
      <Text className="mb-2 text-lg font-bold">{title}</Text>
      <TextInput
        className="mb-2 text-unihub-gray-200"
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={(text) => handleChange(text)}
      />
    </>
  );
}
