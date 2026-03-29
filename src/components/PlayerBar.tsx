import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { colors, spacing } from '../constants/theme';
import type { Mark } from '../utils/game-engine';

interface PlayerBarProps {
  currentPlayer: Mark;
  scores: { x: number; o: number; draws: number };
  playerXName: string;
  playerOName: string;
}

export function PlayerBar({ currentPlayer, scores, playerXName, playerOName }: PlayerBarProps) {
  const isXTurn = currentPlayer === 'X';

  return (
    <View style={styles.wrapper}>
      {/* Turn indicator */}
      <Text style={[styles.turnText, { color: isXTurn ? colors.xPrimary : colors.oPrimary }]}>
        {isXTurn ? playerXName : playerOName}'s Turn
      </Text>

      {/* Player row */}
      <View style={styles.row}>
        {/* Player X */}
        <View style={[styles.playerCard, isXTurn && styles.activeCard, isXTurn && { borderColor: colors.xPrimary }]}>
          <MarkX size={28} />
          <View>
            <Text style={styles.playerName}>{playerXName}</Text>
            <Text style={[styles.playerScore, { color: colors.xPrimary }]}>{scores.x}</Text>
          </View>
        </View>

        <Text style={styles.vs}>VS</Text>

        {/* Player O */}
        <View style={[styles.playerCard, !isXTurn && styles.activeCard, !isXTurn && { borderColor: colors.oPrimary }]}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.playerName}>{playerOName}</Text>
            <Text style={[styles.playerScore, { color: colors.oPrimary }]}>{scores.o}</Text>
          </View>
          <MarkO size={28} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.xl,
  },
  turnText: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  playerCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(58, 39, 140, 0.3)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  activeCard: {
    backgroundColor: 'rgba(58, 39, 140, 0.55)',
  },
  playerName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textWhite,
  },
  playerScore: {
    fontSize: 20,
    fontWeight: '900',
  },
  vs: {
    fontSize: 12,
    fontWeight: '900',
    color: 'rgba(171, 172, 185, 0.5)',
    letterSpacing: 1,
  },
});
