import React from 'react';
import { View, Image } from 'react-native';
import { emojiIconTintColor } from '../../constants/color';

function EmojiIcon() {
  return (
    <View>
      <Image
        source={require('../../assets/happiness.png')}
        style={{ width: 30, height: 30, tintColor: emojiIconTintColor }}
      />
    </View>
  );
}

export default EmojiIcon;
