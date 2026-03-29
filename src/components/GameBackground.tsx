import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Line, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function PerspectiveGrid() {
  const w = SCREEN_WIDTH;
  const h = SCREEN_HEIGHT;

  // Horizontal lines receding into perspective
  const horizontalLines = [];
  const lineCount = 12;
  for (let i = 0; i < lineCount; i++) {
    const t = i / (lineCount - 1);
    // Lines get closer together toward the top (perspective)
    const y = h * 0.25 + (h * 0.75) * Math.pow(t, 1.5);
    const opacity = 0.04 + t * 0.08;
    horizontalLines.push(
      <Line
        key={`h${i}`}
        x1={0}
        y1={y}
        x2={w}
        y2={y}
        stroke="#7b6bc4"
        strokeWidth={0.5}
        opacity={opacity}
      />
    );
  }

  // Vertical lines converging at center top
  const verticalLines = [];
  const vCount = 10;
  const vanishX = w / 2;
  const vanishY = h * 0.15;
  for (let i = 0; i < vCount; i++) {
    const t = i / (vCount - 1);
    const bottomX = w * t;
    const opacity = 0.03 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
    verticalLines.push(
      <Line
        key={`v${i}`}
        x1={vanishX + (bottomX - vanishX) * 0.15}
        y1={vanishY + h * 0.15}
        x2={bottomX}
        y2={h}
        stroke="#7b6bc4"
        strokeWidth={0.5}
        opacity={opacity}
      />
    );
  }

  return (
    <Svg
      width={w}
      height={h}
      style={StyleSheet.absoluteFill}
    >
      {horizontalLines}
      {verticalLines}
    </Svg>
  );
}

interface GameBackgroundProps {
  children: React.ReactNode;
}

export function GameBackground({ children }: GameBackgroundProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1055', '#0d0828', '#000000']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* Radial glow in center */}
      <View style={styles.radialGlow} />
      <PerspectiveGrid />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  radialGlow: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    right: '10%',
    height: '40%',
    borderRadius: 999,
    backgroundColor: 'rgba(58, 39, 140, 0.25)',
    // Blur approximation via shadow
    shadowColor: '#3A278C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 100,
  },
});
