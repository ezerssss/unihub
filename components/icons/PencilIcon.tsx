import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PencilIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.332 5.335L16 2.667C17.177 1.49 17.765.9 18.487.837a2 2 0 01.36 0c.721.064 1.31.653 2.486 1.83 1.177 1.176 1.766 1.765 1.83 2.487.011.12.011.24 0 .359-.064.722-.653 1.31-1.83 2.487l-2.639 2.639a14.867 14.867 0 01-5.362-5.304zm-1.455 1.454L2.19 16.477c-.425.425-.638.637-.778.899-.14.26-.198.555-.316 1.145l-.949 4.744c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l4.744-.949c.59-.118.884-.177 1.145-.316.261-.14.474-.353.9-.778l9.712-9.713a16.87 16.87 0 01-5.359-5.308z"
        fill="#191970"
      />
    </Svg>
  );
}

export default PencilIcon;
