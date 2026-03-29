import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { colors } from '../constants/theme';
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
      {/* Player row */}
      <View style={styles.row}>
        {/* Player X */}
        <View style={[styles.card, isXTurn && { borderColor: colors.xPrimary, backgroundColor: 'rgba(247, 142, 30, 0.08)' }]}>
          <MarkX size={26} />
          <View style={styles.info}>
            <Text style={styles.name}>{playerXName}</Text>
            <Text style={[styles.score, { color: colors.xPrimary }]}>{scores.x}</Text>
          </View>
        </View>

        <View style={styles.center}>
          <Text style={styles.vs}>VS</Text>
        </View>

        {/* Player O */}
        <View style={[styles.card, !isXTurn && { borderColor: colors.oPrimary, backgroundColor: 'rgba(69, 139, 188, 0.08)' }]}>
          <View style={[styles.info, { alignItems: 'flex-end' }]}>
            <Text style={styles.name}>{playerOName}</Text>
            <Text style={[styles.score, { color: colors.oPrimary }]}>{scores.o}</Text>
          </View>
          <MarkO size={26} />
        </View>
      </View>

      {/* Turn indicator */}
      <Text style={[styles.turnText, { color: isXTurn ? colors.xPrimary : colors.oPrimary }]}>
        {isXTurn ? playerXName : playerOName}'s Turn
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(58, 39, 140, 0.25)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'TitilliumWeb_700Bold',
    fontSize: 13,
    color: '#FEFDFB',
  },
  score: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 22,
  },
  center: {
    width: 30,
    alignItems: 'center',
  },
  vs: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 11,
    color: 'rgba(171, 172, 185, 0.35)',
    letterSpacing: 2,
  },
  turnText: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 16,
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: '#080206',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
});
