import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function GraduationCapIcon() {
  return (
    <Svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 12.333L2 9.667 14 3l12 6.667-4 2.666"
        stroke="#191970"
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.333 13.667a1.333 1.333 0 102.667 0h-2.667zm0-9.334v9.334H18V4.333h-2.667z"
        fill="#191970"
      />
      <Path
        d="M6 12.333v5.334L14 21l8-3.333v-5.334s-1.333-2.666-8-2.666-8 2.666-8 2.666z"
        stroke="#191970"
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default GraduationCapIcon;
