import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LeftArrow(props) {
  return (
    <Svg
      fill="none"
      height={14}
      viewBox="0 0 19 14"
      width={19}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.667 7L.96 6.293.252 7l.708.707L1.667 7zm16 1a1 1 0 000-2v2zM6.293.96L.96 6.293l1.414 1.414 5.333-5.333L6.293.96zM.96 7.707l5.333 5.333 1.414-1.414-5.333-5.333L.96 7.707zM1.667 8h16V6h-16v2z"
        fill="#fff"
      />
    </Svg>
  );
}

export default LeftArrow;
