import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function ProfileIcon() {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M21.371 22.151c-.493-1.382-1.581-2.603-3.095-3.474-1.514-.872-3.368-1.344-5.276-1.344s-3.762.473-5.276 1.344c-1.513.87-2.602 2.092-3.095 3.474"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle
        cx={13}
        cy={8.66665}
        r={4.33333}
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default ProfileIcon;
