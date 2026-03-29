import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Line } from "react-native-svg";

const { width: SW, height: SH } = Dimensions.get("window");

function PerspectiveGrid() {
  const elements: React.ReactElement[] = [];
  const cx = SW / 2;
  const cy = SH * 0.06;

  // Vertical lines radiating from vanishing point
  const vCount = 18;
  for (let i = 0; i < vCount; i++) {
    const t = i / (vCount - 1);
    const bottomX = -SW * 0.3 + SW * 1.6 * t;
    const topX = cx + (bottomX - cx) * 0.05;
    const distFromCenter = Math.abs(t - 0.5) * 2;
    const opacity = (1 - distFromCenter * 0.7) * 0.07;
    elements.push(
      <Line
        key={`v${i}`}
        x1={topX}
        y1={cy + SH * 0.05}
        x2={bottomX}
        y2={SH}
        stroke="#4a6a8a"
        strokeWidth={1}
        opacity={opacity}
      />,
    );
  }

  // Horizontal lines
  const hCount = 16;
  for (let i = 0; i < hCount; i++) {
    const t = i / (hCount - 1);
    const y = SH * 0.15 + SH * 0.85 * t * t;
    const opacity = (0.02 + t * 0.06) * 1.1;
    elements.push(
      <Line
        key={`h${i}`}
        x1={0}
        y1={y}
        x2={SW}
        y2={y}
        stroke="#4a6a8a"
        strokeWidth={1}
        opacity={opacity}
      />,
    );
  }

  return (
    <Svg
      width={SW}
      height={SH}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      {elements}
    </Svg>
  );
}

interface Props {
  children: React.ReactNode;
}

export function GameBackground({ children }: Props) {
  return (
    <View style={styles.root}>
      {/* Base: near-black with a hint of navy */}
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: "#04080f" }]}
      />

      {/* Center glow — vertical (deep navy-teal) */}
      <LinearGradient
        colors={[
          "rgba(10,26,50,0.0)",
          "rgba(10,26,50,0.7)",
          "rgba(10,26,50,0.7)",
          "rgba(10,26,50,0.0)",
        ]}
        locations={[0, 0.3, 0.55, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Edge darkening — horizontal */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0.85)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.85)",
        ]}
        locations={[0, 0.2, 0.8, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      <PerspectiveGrid />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
