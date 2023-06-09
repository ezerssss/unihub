import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

function ProfileIcon(props: SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={16}
        cy={9.33333}
        r={5.33333}
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M7.53 22.936c.861-2.738 3.575-4.27 6.446-4.27h4.048c2.87 0 5.585 1.532 6.447 4.27.387 1.232.714 2.632.823 4.065.042.55-.408.999-.96.999H7.666c-.553 0-1.003-.449-.961-1 .109-1.432.436-2.832.823-4.064z"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default ProfileIcon;
