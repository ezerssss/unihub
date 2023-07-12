import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.586 8.138a6.446 6.446 0 0112.828 0l.334 3.344c.053.531.08.797.123 1.057.158.94.481 1.845.957 2.671.131.229.28.451.576.896l1.19 1.785c.912 1.368 1.368 2.053 1.086 2.58-.283.529-1.105.529-2.75.529H6.07c-1.645 0-2.467 0-2.75-.528-.282-.528.174-1.213 1.086-2.581l1.19-1.785c.297-.445.445-.667.576-.896a8 8 0 00.957-2.67c.043-.26.07-.527.123-1.058l.334-3.344z"
        fill="#fff"
      />
      <Path
        d="M11.746 24.068c.133.124.426.233.834.311A7.8 7.8 0 0014 24.5a7.8 7.8 0 001.42-.12c.408-.079.7-.188.834-.312"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
