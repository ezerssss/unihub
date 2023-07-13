import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx={6} cy={6} r={4.5} stroke="gray" />
      <Path
        d="M8.25 6h-2A.25.25 0 016 5.75v-1.5"
        stroke="gray"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
