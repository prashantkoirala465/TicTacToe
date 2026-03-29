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
        <Text style={[styles.value, { color: colors.xMark }]}>{scores.x}</Text>
        <Text style={styles.label}>WINS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.textSecondary }]}>
          {scores.draws}
        </Text>
        <Text style={styles.label}>DRAWS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.oMark }]}>{scores.o}</Text>
        <Text style={styles.label}>WINS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.scoreBar,
    borderRadius: radii.scoreBar,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
  },
  stat: {
    alignItems: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
  },
  divider: {
    width: 1,
    backgroundColor: colors.separator,
  },
});
