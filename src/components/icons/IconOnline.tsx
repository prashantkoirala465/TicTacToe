import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export function IconOnline({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Globe */}
      <Circle cx="12" cy="12" r="9" stroke="#CDAAEE" strokeWidth="1.5" />
      <Path d="M12 3c-2.5 3-4 6-4 9s1.5 6 4 9" stroke="#CDAAEE" strokeWidth="1.3" />
      <Path d="M12 3c2.5 3 4 6 4 9s-1.5 6-4 9" stroke="#CDAAEE" strokeWidth="1.3" />
      <Path d="M3.5 9h17M3.5 15h17" stroke="#CDAAEE" strokeWidth="1.2" strokeLinecap="round" />
      {/* Signal dot */}
      <Circle cx="19" cy="5" r="2.5" fill="#B1D94D" />
    </Svg>
  );
}
