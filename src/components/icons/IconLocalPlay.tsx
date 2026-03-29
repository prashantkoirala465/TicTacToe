import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export function IconLocalPlay({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Two people */}
      <Circle cx="8" cy="6" r="3" fill="#F78E1E" opacity={0.9} />
      <Path d="M3 18v-1c0-2.21 2.24-4 5-4s5 1.79 5 4v1" fill="#F78E1E" opacity={0.5} />
      <Circle cx="16" cy="6" r="3" fill="#458BBC" opacity={0.9} />
      <Path d="M16 13c2.76 0 5 1.79 5 4v1h-5" fill="#458BBC" opacity={0.5} />
    </Svg>
  );
}
