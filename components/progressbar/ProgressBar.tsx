import { View, Text } from 'react-native';
import React from 'react';
import { Progress } from '../../enums/progress';

function ProgressBar() {
  function progressMessage(progress: number): string {
    let msg = '';
    if (progress === Progress.ORDER_CONFIRMATION) {
      msg = 'Waiting for seller to recieve order...';
    } else if (progress === Progress.MEETUP) {
      msg = 'Waiting for a meetup...';
    } else if (progress === Progress.SUCCESS) {
      msg = 'Order successful, enjoy!';
    }
    return msg;
  }

  function generateStyle(bar: number, progress: number): string {
    if (bar <= progress) {
      return 'mx-3 h-2 w-24 rounded-3xl bg-primary-400';
    } else {
      return 'mx-3 h-2 w-24 rounded-3xl bg-light-silver';
    }
  }

  return (
    <View className="my-8">
      <Text className="me text-m self-center font-medium">
        {progressMessage(1)}
      </Text>
      <View className="flex-row items-center justify-center pt-4">
        <View className={generateStyle(1, 1)} />
        <View className={generateStyle(2, 1)} />
        <View className={generateStyle(3, 1)} />
      </View>
    </View>
  );
}

export default ProgressBar;
