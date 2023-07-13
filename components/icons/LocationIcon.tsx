import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function LocationIcon() {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.68 8.5c.374.228.57.487.57.75s-.196.522-.57.75c-.372.228-.909.417-1.555.549-.646.132-1.379.201-2.125.201s-1.479-.07-2.125-.201c-.646-.132-1.183-.321-1.556-.549-.373-.228-.569-.487-.569-.75s.196-.522.57-.75"
        stroke="gray"
        strokeLinecap="round"
      />
      <Path
        d="M9.75 5c0 2.32-2.346 3.941-3.327 4.518a.829.829 0 01-.846 0C4.596 8.941 2.25 7.32 2.25 5c0-2.25 1.817-3.75 3.75-3.75 2 0 3.75 1.5 3.75 3.75z"
        stroke="gray"
      />
      <Circle cx={6} cy={5} r={1.5} stroke="gray" />
    </Svg>
  );
}

export default LocationIcon;
