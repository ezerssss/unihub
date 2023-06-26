import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SeeAllProductsArrow() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18 12l.707-.707.707.707-.707.707L18 12zM6 13a1 1 0 110-2v2zm8.707-5.707l4 4-1.414 1.414-4-4 1.414-1.414zm4 5.414l-4 4-1.414-1.414 4-4 1.414 1.414zM18 13H6v-2h12v2z"
        fill="gray"
      />
    </Svg>
  );
}

export default SeeAllProductsArrow;
