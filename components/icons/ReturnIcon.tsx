import React from "react";
import { Svg, Path } from "react-native-svg";

function ReturnIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" style={{ width: 30, height: 30 }}  version="1" viewBox="0 0 512 512">
      <Path d="M3280 4318c-28-7-206-181-847-821-447-446-820-827-829-845-24-50-28-97-14-149 12-45 65-100 819-856 443-444 820-817 837-828 98-61 239-17 295 92 24 47 25 137 3 182-9 18-310 327-670 687-454 455-658 666-669 692-19 48-19 128 0 176 11 26 215 237 669 692 360 360 661 669 670 687 22 45 21 135-3 182-50 97-153 140-261 109z" transform="matrix(.1 0 0 -.1 0 512)" fill="#191970" />
    </Svg>
  );
}

export default ReturnIcon;