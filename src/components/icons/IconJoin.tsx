import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export function IconJoin({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Link chain */}
      <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#CDAAEE" strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#CDAAEE" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}
