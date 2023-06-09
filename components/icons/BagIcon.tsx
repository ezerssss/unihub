import Svg, { Path } from 'react-native-svg';

function BagIcon() {
  return (
    <Svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <Path
        d="M8 8V7a4 4 0 014-4v0a4 4 0 014 4v1"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
      ></Path>
      <Path
        clipRule="evenodd"
        d="M3.586 7.586C3 8.172 3 9.114 3 11v3c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-3c0-1.886 0-2.828-.586-3.414C19.828 7 18.886 7 17 7H7c-1.886 0-2.828 0-3.414.586zM10 12a1 1 0 10-2 0v2a1 1 0 102 0v-2zm6 0a1 1 0 10-2 0v2a1 1 0 102 0v-2z"
        fill="#fff"
        fillRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default BagIcon;
