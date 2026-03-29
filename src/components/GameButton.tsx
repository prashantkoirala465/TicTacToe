import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { onButtonPress } from '../lib/feedback';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  compact?: boolean;
}

export function GameButton({ title, onPress, variant = 'primary', compact }: GameButtonProps) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      onPress={() => {
        onButtonPress();
        onPress();
      }}
      style={({ pressed }) => [
        styles.wrapper,
        compact && styles.compact,
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={['#F78E1E', '#e67d12']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.button, compact && styles.buttonCompact]}
        >
          {/* Top highlight strip */}
          <View style={styles.topHighlight} />
          <Text style={styles.primaryText}>{title}</Text>
        </LinearGradient>
      ) : isGhost ? (
        <View style={[styles.ghostButton, compact && styles.buttonCompact]}>
          <Text style={styles.ghostText}>{title}</Text>
        </View>
      ) : (
        <View style={[styles.secondaryButton, compact && styles.buttonCompact]}>
          <Text style={styles.secondaryText}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  compact: {
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    // Skew for angular feel
    transform: [{ skewX: '-3deg' }],
  },
  buttonCompact: {
    paddingVertical: 13,
    paddingHorizontal: 40,
  },
  topHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  primaryText: {
    fontFamily: 'TitilliumWeb-Black',
    fontSize: 16,
    color: '#FEFDFB',
    letterSpacing: 1.5,
    textShadowColor: '#080206',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
    transform: [{ skewX: '3deg' }], // Counter-skew text
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FEFDFB',
    alignItems: 'center',
    transform: [{ skewX: '-3deg' }],
  },
  secondaryText: {
    fontFamily: 'TitilliumWeb-Black',
    fontSize: 16,
    color: '#080206',
    letterSpacing: 1,
    transform: [{ skewX: '3deg' }],
  },
  ghostButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  ghostText: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 14,
    color: 'rgba(171, 172, 185, 0.6)',
    letterSpacing: 1,
  },
});
