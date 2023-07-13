import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AddSquareIcon() {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.5 11.5c0-3.771 0-5.657 1.172-6.828C5.843 3.5 7.729 3.5 11.5 3.5h5c3.771 0 5.657 0 6.828 1.172C24.5 5.843 24.5 7.729 24.5 11.5v5c0 3.771 0 5.657-1.172 6.828C22.157 24.5 20.271 24.5 16.5 24.5h-5c-3.771 0-5.657 0-6.828-1.172C3.5 22.157 3.5 20.271 3.5 16.5v-5z"
        stroke="#191970"
        strokeWidth={2}
      />
      <Path
        d="M14 9.333v9.334M18.667 14H9.333"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AddSquareIcon;
