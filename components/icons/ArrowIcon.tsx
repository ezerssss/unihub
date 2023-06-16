import React from 'react';
import { Svg, Path } from 'react-native-svg';

function ArrowIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 32, height: 32 }}
      version="1"
      viewBox="0 0 60 60"
    >
      <Path
        d="M292 469C70 398 60 394 60 381c0-17 140-122 153-115 6 4 57 44 112 88 127 101 133 105 119 86-6-8-47-60-90-115-44-55-84-106-88-112-7-13 97-153 115-153 13 0 21 19 94 253 36 114 63 212 60 217-9 15-12 14-243-61z"
        transform="matrix(.1 0 0 -.1 0 60)"
        fill="#191970"
      />
    </Svg>
  );
}

export default ArrowIcon;
