import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BookIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 6v13M21 6v13M3 6v13M21 19s-1-2-4.5-2-4.5 2-4.5 2M12 19s-1-2-4.5-2S3 19 3 19M21 6s-1-2-4.5-2S12 6 12 6M12 6s-1-2-4.5-2S3 6 3 6"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default BookIcon;
