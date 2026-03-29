import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

export function IconComputer({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Monitor */}
      <Rect x="3" y="3" width="18" height="13" rx="2" stroke="#458BBC" strokeWidth="1.8" fill="rgba(69,139,188,0.15)" />
      {/* Screen face */}
      <Circle cx="9" cy="9" r="1.2" fill="#458BBC" />
      <Circle cx="15" cy="9" r="1.2" fill="#458BBC" />
      <Path d="M9 12.5c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" stroke="#458BBC" strokeWidth="1.2" strokeLinecap="round" />
      {/* Stand */}
      <Path d="M10 16h4v2H10z" fill="rgba(69,139,188,0.4)" />
      <Path d="M8 20h8" stroke="#458BBC" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
