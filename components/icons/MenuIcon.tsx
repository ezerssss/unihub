import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function MenuIcon() {
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
        d="M.586.586C0 1.172 0 2.114 0 4v16c0 1.886 0 2.828.586 3.414C1.172 24 2.114 24 4 24h16c1.886 0 2.828 0 3.414-.586C24 22.828 24 21.886 24 20V4c0-1.886 0-2.828-.586-3.414C22.828 0 21.886 0 20 0H4C2.114 0 1.172 0 .586.586zm6.271 5.473a1 1 0 100 2h10.286a1 1 0 100-2H6.857zm0 5.647a1 1 0 100 2h10.286a1 1 0 100-2H6.857zm0 5.647a1 1 0 100 2h6.857a1 1 0 100-2H6.857z"
        fill="#fff"
      />
    </Svg>
  );
}

export default MenuIcon;
