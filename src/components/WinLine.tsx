import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

function getCellCenter(index: number, boardSize: number, gap: number, padding: number): { x: number; y: number } {
  const cellSize = (boardSize - gap * 2 - padding * 2) / 3;
  const col = index % 3;
  const row = Math.floor(index / 3);
  return {
    x: padding + col * (cellSize + gap) + cellSize / 2,
    y: padding + row * (cellSize + gap) + cellSize / 2,
  };
}

interface WinLineProps {
  line: number[] | null;
  boardSize: number;
  winner?: 'X' | 'O' | null;
}

const GAP = 10;
const PADDING = 4;
const LINE_LENGTH = 500;

export function WinLine({ line, boardSize, winner }: WinLineProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (line) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });
    } else {
      progress.value = 0;
    }
  }, [line, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: LINE_LENGTH * (1 - progress.value),
  }));

  if (!line || !boardSize) return null;

  const strokeColor = winner === 'O' ? '#EF4444' : '#6366F1';
  const start = getCellCenter(line[0], boardSize, GAP, PADDING);
  const end = getCellCenter(line[2], boardSize, GAP, PADDING);

  return (
    <Svg style={[StyleSheet.absoluteFill, { width: boardSize, height: boardSize }]}>
      <AnimatedLine
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={strokeColor}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={LINE_LENGTH}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}
