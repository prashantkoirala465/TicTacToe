import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/theme';

interface ScoreBarProps {
  scores: { x: number; o: number; draws: number };
}

export function ScoreBar({ scores }: ScoreBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.xPrimary }]}>{scores.x}</Text>
        <Text style={[styles.label, { color: colors.xPrimary }]}>X WINS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: 'rgba(171, 172, 185, 0.7)' }]}>{scores.draws}</Text>
        <Text style={styles.label}>DRAWS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.oPrimary }]}>{scores.o}</Text>
        <Text style={[styles.label, { color: colors.oPrimary }]}>O WINS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 39, 140, 0.3)',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(171, 172, 185, 0.15)',
    marginTop: spacing.xl,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: 'rgba(171, 172, 185, 0.5)',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(171, 172, 185, 0.15)',
  },
});
