import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { GameButton } from './GameButton';
import { colors } from '../constants/theme';
import type { Mark } from '../utils/game-engine';

interface GameOverOverlayProps {
  winner: Mark | 'draw';
  playerXName: string;
  playerOName: string;
  onPlayAgain: () => void;
  onExit: () => void;
}

export function GameOverOverlay({
  winner,
  playerXName,
  playerOName,
  onPlayAgain,
  onExit,
}: GameOverOverlayProps) {
  const isDraw = winner === 'draw';
  const winnerName = winner === 'X' ? playerXName : playerOName;
  const accentColor = winner === 'X' ? colors.xPrimary : winner === 'O' ? colors.oPrimary : colors.textGray;

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
      <View style={styles.card}>
        {/* Winner mark */}
        {!isDraw && (
          <View style={styles.markWrap}>
            {winner === 'X' ? <MarkX size={56} /> : <MarkO size={56} />}
          </View>
        )}

        <Text style={[styles.label, { color: accentColor }]}>
          {isDraw ? 'DRAW' : 'WINNER'}
        </Text>

        <Text style={styles.name}>
          {isDraw ? "Nobody wins!" : winnerName}
        </Text>

        <View style={styles.buttons}>
          <GameButton title="PLAY AGAIN" onPress={onPlayAgain} compact />
          <GameButton title="Back to Menu" onPress={onExit} variant="ghost" compact />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: 'rgba(26, 16, 85, 0.95)',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 36,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(74, 106, 138, 0.2)',
    minWidth: 280,
    shadowColor: '#0a1e36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  markWrap: {
    marginBottom: 8,
  },
  label: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 13,
    letterSpacing: 4,
    marginBottom: 4,
  },
  name: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 24,
    color: '#FEFDFB',
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttons: {
    gap: 4,
    alignItems: 'center',
  },
});
