import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface PropsInterface {
  text: string;
  onPress?: () => void;
}

export default function AddPhoto(props: PropsInterface) {
  const { text, onPress } = props;

  function handlePress() {
    if (onPress) {
      onPress();
    }
  }

  return (
    <TouchableOpacity
      className="mx-2 block aspect-square w-24 items-center justify-center border border-primary-400 p-1"
      onPress={handlePress}
    >
      <Text className="text-center text-xs text-primary-400">{text}</Text>
    </TouchableOpacity>
  );
}
