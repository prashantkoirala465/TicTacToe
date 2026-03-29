import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Line, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width: SW, height: SH } = Dimensions.get('window');

/**
 * Perspective grid pattern inspired by reference project's bar.svg
 * Uses color-dodge-like appearance via light semi-transparent lines
 * on the radial gradient background.
 */
function GridPattern() {
  const lines: React.ReactElement[] = [];

  // Horizontal lines — spread across screen with perspective spacing
  const hCount = 14;
  for (let i = 0; i < hCount; i++) {
    const t = i / (hCount - 1);
    // Quadratic spacing — lines bunch at top, spread at bottom
    const y = SH * 0.12 + SH * 0.88 * t * t;
    const opacity = 0.025 + t * 0.055;
    lines.push(
      <Line key={`h${i}`} x1={0} y1={y} x2={SW} y2={y}
        stroke="rgba(150, 130, 220, 1)" strokeWidth={0.5} opacity={opacity} />
    );
  }

  // Vertical lines converging to vanishing point at center-top
  const vCount = 14;
  const vx = SW / 2;
  const vy = SH * 0.08;
  for (let i = 0; i < vCount; i++) {
    const t = i / (vCount - 1);
    const bx = SW * (t * 1.2 - 0.1); // Extend past edges slightly
    const opacity = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.05;
    lines.push(
      <Line key={`v${i}`}
        x1={vx + (bx - vx) * 0.08}
        y1={vy + SH * 0.08}
        x2={bx}
        y2={SH * 1.05}
        stroke="rgba(150, 130, 220, 1)" strokeWidth={0.5} opacity={opacity} />
    );
  }

  return (
    <Svg width={SW} height={SH} style={StyleSheet.absoluteFill}>
      {lines}
    </Svg>
  );
}

interface GameBackgroundProps {
  children: React.ReactNode;
}

export function GameBackground({ children }: GameBackgroundProps) {
  return (
    <View style={styles.root}>
      {/* Layer 1: Base black */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} />

      {/* Layer 2: Radial purple glow (simulated with centered oval gradient) */}
      <View style={styles.radialWrap}>
        <LinearGradient
          colors={['rgba(58, 39, 140, 0.85)', 'rgba(58, 39, 140, 0.4)', 'rgba(0, 0, 0, 0)']}
          locations={[0, 0.45, 1]}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Layer 2b: Horizontal radial spread */}
      <View style={styles.radialWrapH}>
        <LinearGradient
          colors={['rgba(58, 39, 140, 0.5)', 'rgba(0, 0, 0, 0)']}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Layer 3: Grid pattern (like bar.svg with color-dodge) */}
      <GridPattern />

      {/* Content */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  radialWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  radialWrapH: {
    ...StyleSheet.absoluteFillObject,
  },
});
