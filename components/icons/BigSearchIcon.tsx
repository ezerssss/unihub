import Svg, { Ellipse, Path } from 'react-native-svg';

function SearchIcon() {
  return (
    <Svg fill="none" height="32" viewBox="0 0 18 16" width="32">
      <Ellipse
        cx="8.333"
        cy="7.333"
        rx="4.393"
        ry="4"
        stroke="#B3B3B5"
      ></Ellipse>
      <Path
        d="M8.333 5.333c-.288 0-.574.052-.84.153-.267.1-.51.248-.713.433a1.999 1.999 0 00-.476.65c-.11.242-.167.502-.167.764M14.923 13.334l-2.196-2"
        stroke="#B3B3B5"
        strokeLinecap="round"
      ></Path>
    </Svg>
  );
}

export default SearchIcon;
