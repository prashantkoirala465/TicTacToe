import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
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
    if (winner === 'draw') return "IT'S A DRAW";
    const name = winner === 'X' ? playerXName : playerOName;
    return `${name.toUpperCase()} WINS!`;
  };

  const getColor = () => {
    if (winner === 'draw') return colors.textGray;
    return winner === 'X' ? colors.xPrimary : colors.oPrimary;
  };

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
      <View style={styles.card}>
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
          <LinearGradient
            colors={colors.xGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={styles.exitButton}
          onPress={() => {
            onButtonPress();
            onExit();
          }}
        >
          <Text style={styles.exitText}>BACK TO MENU</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.card,
    padding: spacing.xxxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    minWidth: 280,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: spacing.xxl,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  playAgainButton: {
    borderRadius: radii.badge,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: colors.xPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: radii.badge,
  },
  playAgainText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  exitButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  exitText: {
    color: colors.textGray,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
