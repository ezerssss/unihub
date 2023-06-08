import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

function ProductIcon(props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={5.33333}
        y={6.6665}
        width={21.3333}
        height={21.3333}
        rx={2}
        stroke="#191970"
        strokeWidth={2}
      />
      <Path
        d="M21.333 2.667v6c0 .942 0 1.414-.293 1.707-.293.292-.764.292-1.707.292h-6.666c-.943 0-1.415 0-1.707-.292-.293-.293-.293-.765-.293-1.708v-6M12 18.666h8"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default ProductIcon;
