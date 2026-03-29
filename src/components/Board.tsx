import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Cell } from "./Cell";
import type { Board as BoardType } from "../utils/game-engine";

interface BoardProps {
  board: BoardType;
  onCellPress: (index: number) => void;
  disabled: boolean;
}

// Exact reference values: padding 32px, grid-gap 12px
const GAP = 12;
const PADDING = 28;

export function Board({ board, onCellPress, disabled }: BoardProps) {
  const [cellSize, setCellSize] = useState(0);

  const handleLayout = (e: { nativeEvent: { layout: { width: number } } }) => {
    const w = e.nativeEvent.layout.width;
    const inner = w - PADDING * 2;
    setCellSize(Math.floor((inner - GAP * 2) / 3));
  };

  return (
    <View style={styles.board} onLayout={handleLayout}>
      {cellSize > 0 &&
        board.map((cell, i) => (
          <Cell
            key={i}
            value={cell}
            onPress={() => onCellPress(i)}
            disabled={disabled}
            size={cellSize}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    // Reference: background rgba(12,30,54,0.4), border-radius 16px, backdrop-filter blur(12px)
    backgroundColor: "rgba(12, 30, 54, 0.35)",
    borderRadius: 16,
    padding: PADDING,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    // Glow
    shadowColor: "#0a1e36",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
});
