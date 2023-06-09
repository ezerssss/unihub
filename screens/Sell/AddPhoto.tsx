import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

interface PropsInterface {
  text: string;
  image?: string;
  onPress?: () => Promise<void>;
}

export default function AddPhoto(props: PropsInterface) {
  const { text, image, onPress } = props;

  async function handlePress() {
    if (onPress) {
      await onPress();
    }
  }

  const renderImage = image ? (
    <Image className="h-full w-full" source={{ uri: image }} />
  ) : (
    <Text className="text-center text-xs text-primary-400">{text}</Text>
  );

  return (
    <TouchableOpacity
      className="mx-2 block aspect-square w-24 items-center justify-center border border-primary-400 p-1"
      onPress={handlePress}
    >
      {renderImage}
    </TouchableOpacity>
  );
}
