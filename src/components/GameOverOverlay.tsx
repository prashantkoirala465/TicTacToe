import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { colors } from '../constants/theme';
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
  const isDraw = winner === 'draw';
  const winnerName = winner === 'X' ? playerXName : playerOName;
  const accentColor = winner === 'X' ? colors.xPrimary : winner === 'O' ? colors.oPrimary : colors.textGray;
  const gradient = winner === 'X' ? colors.xGradient : colors.oGradient;

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.overlay}>
      <View style={styles.card}>
        {/* Winner mark */}
        {!isDraw && (
          <View style={styles.markContainer}>
            {winner === 'X' ? <MarkX size={60} /> : <MarkO size={60} />}
          </View>
        )}

        <Text style={[styles.label, { color: accentColor }]}>
          {isDraw ? 'DRAW' : 'WINNER'}
        </Text>

        <Text style={styles.name}>
          {isDraw ? "Nobody wins!" : winnerName}
        </Text>

        <Pressable
          style={styles.playAgainBtn}
          onPress={() => { onButtonPress(); onPlayAgain(); }}
        >
          <LinearGradient
            colors={isDraw ? ['#ABACB9', '#7a7b89'] : [...gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>PLAY AGAIN</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={styles.exitBtn}
          onPress={() => { onButtonPress(); onExit(); }}
        >
          <Text style={styles.exitText}>Back to Menu</Text>
        </Pressable>
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
    paddingVertical: 36,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(171, 172, 185, 0.2)',
    minWidth: 280,
    shadowColor: '#3A278C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  markContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textWhite,
    marginBottom: 28,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  playAgainBtn: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#F78E1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  btnGradient: {
    paddingVertical: 14,
    paddingHorizontal: 52,
    borderRadius: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  exitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  exitText: {
    color: 'rgba(171, 172, 185, 0.6)',
    fontSize: 13,
    fontWeight: '600',
  },
});
