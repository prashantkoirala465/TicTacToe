import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

interface ScoreBarProps {
  scores: { x: number; o: number; draws: number };
}

export function ScoreBar({ scores }: ScoreBarProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.score, { color: colors.xPrimary }]}>
        {scores.x}
      </Text>
      <Text style={styles.dash}>—</Text>
      <Text style={styles.draws}>{scores.draws}</Text>
      <Text style={styles.dash}>—</Text>
      <Text style={[styles.score, { color: colors.oPrimary }]}>
        {scores.o}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginTop: 20,
  },
  score: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 28,
    textShadowColor: "#080206",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  draws: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 22,
    color: "rgba(171, 172, 185, 0.4)",
  },
  dash: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 16,
    color: "rgba(171, 172, 185, 0.2)",
  },
});
