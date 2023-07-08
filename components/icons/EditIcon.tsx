import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function EditIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.332 9.335L20 6.667c1.177-1.177 1.765-1.765 2.487-1.83.12-.011.24-.011.36 0 .721.065 1.31.653 2.486 1.83 1.177 1.176 1.766 1.765 1.83 2.487.011.12.011.24 0 .359-.064.722-.653 1.31-1.83 2.487l-2.639 2.639a14.866 14.866 0 01-5.362-5.304zm-1.455 1.454L6.19 20.477c-.425.425-.638.637-.778.899-.14.26-.198.555-.316 1.145l-.949 4.744c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l4.744-.949c.59-.118.884-.177 1.145-.316.261-.14.474-.353.9-.778l9.712-9.713a16.87 16.87 0 01-5.359-5.308z"
        fill="#191970"
      />
    </Svg>
  );
}

export default EditIcon;