import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';
import { spacing } from '../constants/theme';
import type { Board as BoardType } from '../utils/game-engine';

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  disabled: boolean;
}

const GAP = 10;

export function Board({ board, onCellPress, disabled }: BoardProps) {
  const [cellSize, setCellSize] = useState(0);

  const handleLayout = (e: { nativeEvent: { layout: { width: number } } }) => {
    const width = e.nativeEvent.layout.width;
    const size = (width - GAP * 2 - spacing.xs * 2) / 3;
    setCellSize(Math.floor(size));
  };

  return (
    <View style={styles.grid} onLayout={handleLayout}>
      {cellSize > 0 &&
        board.map((cell, index) => (
          <View key={index} style={{ width: cellSize, height: cellSize }}>
            <Cell
              value={cell}
              onPress={() => onCellPress(index)}
              disabled={disabled}
            />
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    padding: spacing.xs,
  },
});
