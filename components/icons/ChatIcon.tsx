import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function ChatIcon() {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={48} height={48} rx={24} fill="#191970" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.667 22.667c0-3.745 0-5.618-.9-6.963a5.332 5.332 0 00-1.47-1.472c-1.346-.898-3.218-.898-6.964-.898h-2.666c-3.745 0-5.618 0-6.963.898-.583.39-1.083.89-1.472 1.472-.899 1.345-.899 3.218-.899 6.963s0 5.618.9 6.963c.388.582.888 1.082 1.47 1.471 1.176.786 2.753.885 5.63.897V32l1.475 2.948c.49.983 1.893.983 2.385 0L26.667 32v-.002c2.877-.012 4.454-.111 5.63-.897a5.333 5.333 0 001.47-1.471c.9-1.345.9-3.218.9-6.963zM20 19a1 1 0 000 2h8a1 1 0 000-2h-8zm0 5.334a1 1 0 000 2h4a1 1 0 100-2h-4z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ChatIcon;
