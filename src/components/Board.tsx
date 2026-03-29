import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Cell } from './Cell';
import { colors } from '../constants/theme';
import type { Board as BoardType } from '../utils/game-engine';

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  disabled: boolean;
}

const GAP = 8;
const BOARD_PADDING = 16;

export function Board({ board, onCellPress, disabled }: BoardProps) {
  const [cellSize, setCellSize] = useState(0);

  const handleLayout = (e: { nativeEvent: { layout: { width: number } } }) => {
    const width = e.nativeEvent.layout.width;
    const innerWidth = width - BOARD_PADDING * 2;
    const size = Math.floor((innerWidth - GAP * 2) / 3);
    setCellSize(size);
  };

  return (
    <View style={styles.boardOuter}>
      <View style={styles.boardInner} onLayout={handleLayout}>
        {cellSize > 0 &&
          board.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onPress={() => onCellPress(index)}
              disabled={disabled}
              size={cellSize}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardOuter: {
    backgroundColor: 'rgba(58, 39, 140, 0.45)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(171, 172, 185, 0.25)',
    padding: BOARD_PADDING,
    // Subtle outer glow
    shadowColor: '#3A278C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  boardInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
});
