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
      className="w-24 aspect-square p-1 items-center justify-center border border-primary-400 block mx-2"
      onPress={handlePress}
    >
      <Text className="text-primary-400 text-center text-xs">{text}</Text>
    </TouchableOpacity>
  );
}
