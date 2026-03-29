import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, radii, spacing } from '../constants/theme';
import { onButtonPress } from '../lib/feedback';
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
  const getMessage = () => {
    if (winner === 'draw') return "It's a Draw!";
    const name = winner === 'X' ? playerXName : playerOName;
    return `${name} Wins!`;
  };

  const getColor = () => {
    if (winner === 'draw') return colors.textSecondary;
    return winner === 'X' ? colors.xMark : colors.oMark;
  };

  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
      <Animated.View
        entering={FadeIn.delay(100).springify().damping(12)}
        style={styles.card}
      >
        <Text style={[styles.title, { color: getColor() }]}>
          {getMessage()}
        </Text>

        <Pressable
          style={styles.playAgainButton}
          onPress={() => {
            onButtonPress();
            onPlayAgain();
          }}
        >
          <Text style={styles.playAgainText}>Play Again</Text>
        </Pressable>

        <Pressable
          style={styles.exitButton}
          onPress={() => {
            onButtonPress();
            onExit();
          }}
        >
          <Text style={styles.exitText}>Back to Menu</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: radii.card + 4,
    padding: spacing.xxxl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    minWidth: 260,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: spacing.xxl,
  },
  playAgainButton: {
    backgroundColor: colors.brandGradientStart,
    borderRadius: radii.card,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginBottom: spacing.md,
  },
  playAgainText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  exitButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  exitText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
