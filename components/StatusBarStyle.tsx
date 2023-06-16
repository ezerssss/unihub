import { StatusBar } from 'react-native';
import React from 'react';

function StatusBarStyle(isLight: boolean) {
  if (isLight) {
    return <StatusBar barStyle={'light-content'} />;
  } else {
    return <StatusBar barStyle={'dark-content'} />;
  }
}

export default StatusBarStyle;
