import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

interface ScoreBarProps {
  scores: { x: number; o: number; draws: number };
}

export function ScoreBar({ scores }: ScoreBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.xPrimary }]}>{scores.x}</Text>
        <Text style={[styles.label, { color: 'rgba(247, 142, 30, 0.6)' }]}>X WINS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: 'rgba(171, 172, 185, 0.6)' }]}>{scores.draws}</Text>
        <Text style={styles.label}>DRAWS</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.stat}>
        <Text style={[styles.value, { color: colors.oPrimary }]}>{scores.o}</Text>
        <Text style={[styles.label, { color: 'rgba(69, 139, 188, 0.6)' }]}>O WINS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 39, 140, 0.25)',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(123, 107, 196, 0.12)',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 26,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontFamily: 'TitilliumWeb_700Bold',
    fontSize: 9,
    letterSpacing: 1.5,
    color: 'rgba(171, 172, 185, 0.4)',
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(123, 107, 196, 0.12)',
  },
});
