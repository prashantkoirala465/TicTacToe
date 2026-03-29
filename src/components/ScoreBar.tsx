import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, typography, spacing } from '../constants/theme';

interface ScoreBarProps {
  scores: { x: number; o: number; draws: number };
}

export function ScoreBar({ scores }: ScoreBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.xPrimary }]}>{scores.x}</Text>
        <Text style={styles.label}>WINS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.textGray }]}>{scores.draws}</Text>
        <Text style={styles.label}>DRAWS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.oPrimary }]}>{scores.o}</Text>
        <Text style={styles.label}>WINS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.bgCard,
    borderRadius: radii.scoreBar,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  stat: {
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
  },
  label: {
    ...typography.label,
    color: colors.textGray,
    fontSize: 10,
  },
  divider: {
    width: 1,
    backgroundColor: colors.bgCardBorder,
  },
});
