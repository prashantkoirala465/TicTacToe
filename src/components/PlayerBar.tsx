import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MarkX } from "./MarkX";
import { MarkO } from "./MarkO";
import { colors } from "../constants/theme";
import type { Mark } from "../utils/game-engine";

interface PlayerBarProps {
  currentPlayer: Mark;
  scores: { x: number; o: number; draws: number };
  playerXName: string;
  playerOName: string;
}

export function PlayerBar({
  currentPlayer,
  scores,
  playerXName,
  playerOName,
}: PlayerBarProps) {
  const isX = currentPlayer === "X";

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {/* Player X */}
        <View style={styles.side}>
          <MarkX size={30} />
          <Text
            style={[
              styles.name,
              isX && { color: colors.xPrimary },
            ]}
          >
            {playerXName}
          </Text>
          <Text style={[styles.score, { color: colors.xPrimary }]}>
            {scores.x}
          </Text>
        </View>

        {/* Turn indicator */}
        <View style={styles.center}>
          <Text
            style={[
              styles.turnLabel,
              { color: isX ? colors.xPrimary : colors.oPrimary },
            ]}
          >
            {isX ? playerXName : playerOName}
          </Text>
          <Text
            style={[
              styles.turnSub,
              { color: isX ? colors.xPrimary : colors.oPrimary },
            ]}
          >
            YOUR TURN
          </Text>
        </View>

        {/* Player O */}
        <View style={[styles.side, { alignItems: "flex-end" }]}>
          <MarkO size={30} />
          <Text
            style={[
              styles.name,
              !isX && { color: colors.oPrimary },
            ]}
          >
            {playerOName}
          </Text>
          <Text style={[styles.score, { color: colors.oPrimary }]}>
            {scores.o}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  side: {
    alignItems: "center",
    width: 70,
    gap: 4,
  },
  name: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 11,
    color: "rgba(254, 253, 251, 0.6)",
    textShadowColor: "#080206",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  score: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  turnLabel: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 18,
    textShadowColor: "#080206",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  turnSub: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 10,
    letterSpacing: 3,
    opacity: 0.6,
    marginTop: 2,
  },
});
