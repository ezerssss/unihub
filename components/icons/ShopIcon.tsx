import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

function ShopIcon(props: SvgProps) {
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
        d="M19.333 28v-7a1 1 0 00-1-1h-4.666a1 1 0 00-1 1v7"
        stroke="#191970"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.667 14.666V24c0 1.886 0 2.828.585 3.414.586.586 1.53.586 3.415.586h10.666c1.886 0 2.829 0 3.415-.586.585-.586.585-1.529.585-3.414v-9.334"
        stroke="#191970"
        strokeWidth={2}
      />
      <Path
        d="M6.288 5.515c.182-.728.273-1.091.544-1.303C7.103 4 7.478 4 8.228 4h15.544c.75 0 1.125 0 1.396.212.271.212.362.575.544 1.303l1.731 6.924c.225.9.338 1.35.166 1.685a1.002 1.002 0 01-.23.295c-.284.248-.754.248-1.694.248v0c-1.251 0-1.877 0-2.351-.284a2 2 0 01-.497-.42c-.358-.422-.46-1.031-.663-2.25v0c-.057-.342-.085-.513-.142-.533a.1.1 0 00-.064 0c-.057.02-.085.19-.142.533l-.11.652c-.098.596-.148.893-.26 1.136a2 2 0 01-1.293 1.096c-.257.07-.56.07-1.163.07v0c-.604 0-.906 0-1.163-.07a2 2 0 01-1.294-1.096c-.111-.242-.16-.54-.26-1.136l-.109-.652c-.057-.342-.085-.513-.142-.533a.1.1 0 00-.064 0c-.057.02-.085.19-.142.533l-.11.652c-.098.596-.148.893-.26 1.136a2 2 0 01-1.293 1.096c-.257.07-.56.07-1.163.07v0c-.604 0-.906 0-1.163-.07a2 2 0 01-1.294-1.096c-.111-.242-.16-.54-.26-1.136l-.109-.652c-.057-.342-.085-.513-.142-.533a.1.1 0 00-.064 0c-.057.02-.085.19-.142.533v0c-.203 1.219-.305 1.828-.663 2.25a2 2 0 01-.497.42c-.474.284-1.1.284-2.351.284v0c-.94 0-1.41 0-1.693-.248a1 1 0 01-.23-.295c-.173-.335-.06-.785.165-1.685l1.73-6.924z"
        stroke="#191970"
        strokeWidth={2}
      />
    </Svg>
  );
}

export default ShopIcon;
