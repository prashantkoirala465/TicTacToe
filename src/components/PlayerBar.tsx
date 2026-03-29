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
        <Text style={styles.turnLabel}>
          {currentPlayer === 'X' ? playerXName : playerOName}'S TURN
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.player}>
          <View style={[styles.badge, styles.xBadge]}>
            <Text style={[styles.badgeMark, { color: colors.xMark }]}>X</Text>
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
          <View style={[styles.badge, styles.oBadge]}>
            <Text style={[styles.badgeMark, { color: colors.oMark }]}>O</Text>
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
    color: colors.textSecondary,
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
  },
  xBadge: {
    backgroundColor: colors.xBackground,
  },
  oBadge: {
    backgroundColor: colors.oBackground,
  },
  badgeMark: {
    fontSize: 20,
    fontWeight: '800',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  wins: {
    ...typography.small,
    color: colors.textSecondary,
  },
  vs: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.cellBorder,
  },
});
