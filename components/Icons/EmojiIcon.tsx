import React from 'react'
import { View, Image } from 'react-native';


function EmojiIcon() {
  return (
    <View className="emojiIcon" >
     <Image source={require('../assets/happiness.png')} style={{ width: 30, height: 30, tintColor: '#191970' }} />
    </View>
  );
}

export default EmojiIcon