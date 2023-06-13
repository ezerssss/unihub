import { View, Text } from 'react-native';
import React from 'react';

// currently no progress field in database

function ProgressBar() {
  function progressMessage(progress: number): string {
    let msg = '';
    if (progress === 1) {
      msg = 'Waiting for seller to recieve order...';
    } else if (progress === 2) {
      msg = 'Waiting for a meetup...';
    } else if (progress === 3) {
      msg = 'Order successful, enjoy!';
    }
    return msg;
  }

  function checkProgress(bar: number, progress: number): string {
    if (bar <= progress) {
      return 'mx-3 h-2 w-24 rounded-3xl bg-primary-300';
    } else {
      return 'mx-3 h-2 w-24 rounded-3xl bg-gray-200';
    }
  }

  return (
    <View className="my-8">
      <Text className="me text-m self-center font-medium">
        {progressMessage(1)}
      </Text>
      <View className="flex-row items-center justify-center pt-4">
        <View className={checkProgress(1, 1)} />
        <View className={checkProgress(2, 1)} />
        <View className={checkProgress(3, 1)} />
      </View>
    </View>
  );
}

export default ProgressBar;
