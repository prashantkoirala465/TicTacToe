import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, typography, spacing } from '../constants/theme';
import type { Mark } from '../utils/game-engine';

interface PlayerBarProps {
  currentPlayer: Mark;
  scores: { x: number; o: number; draws: number };
  playerXName: string;
  playerOName: string;
}

export function PlayerBar({ currentPlayer, scores, playerXName, playerOName }: PlayerBarProps) {
  return (
    <View>
      <View style={styles.turnIndicator}>
        <Text style={[styles.turnLabel, { color: currentPlayer === 'X' ? colors.xPrimary : colors.oPrimary }]}>
          {currentPlayer === 'X' ? playerXName : playerOName}'S TURN
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.player}>
          <View style={[styles.badge, { backgroundColor: 'rgba(247, 142, 30, 0.2)', borderColor: colors.xPrimary }]}>
            <Text style={[styles.badgeMark, { color: colors.xPrimary }]}>X</Text>
          </View>
          <View>
            <Text style={styles.name}>{playerXName}</Text>
            <Text style={styles.wins}>{scores.x} wins</Text>
          </View>
        </View>
        <Text style={styles.vs}>VS</Text>
        <View style={styles.player}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.name}>{playerOName}</Text>
            <Text style={styles.wins}>{scores.o} wins</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: 'rgba(69, 139, 188, 0.2)', borderColor: colors.oPrimary }]}>
            <Text style={[styles.badgeMark, { color: colors.oPrimary }]}>O</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  turnIndicator: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  turnLabel: {
    ...typography.label,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: radii.badge,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  badgeMark: {
    fontSize: 20,
    fontWeight: '900',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textWhite,
  },
  wins: {
    ...typography.small,
    color: colors.textGray,
  },
  vs: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textGray,
  },
});
