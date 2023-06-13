import { View, Text } from 'react-native';
import React from 'react';

function ProgressBar() {
  function progressMessage(state: number): string {
    let msg = '';
    if (state === 1) {
      msg = 'Waiting for seller to recieve order...';
    } else if (state === 2) {
      msg = 'Waiting for a meetup...';
    } else if (state === 3) {
      msg = 'Order successful, enjoy!';
    }
    return msg;
  }

  return (
    <View>
      <Text className="">{progressMessage(1)}</Text>
    </View>
  );
}

export default ProgressBar;
