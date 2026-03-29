import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { onButtonPress } from '../lib/feedback';

interface GameButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  compact?: boolean;
}

export function GameButton({ title, onPress, variant = 'primary', compact }: GameButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  if (isGhost) {
    return (
      <Pressable
        onPress={() => { onButtonPress(); onPress(); }}
        style={({ pressed }) => [
          styles.ghostBtn,
          compact && styles.compact,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.ghostText}>{title}</Text>
      </Pressable>
    );
  }

  const bgColor = isPrimary ? '#F78E1E' : isSecondary ? '#458BBC' : '#FEFDFB';
  const textColor = isPrimary || isSecondary ? '#FEFDFB' : '#080206';

  return (
    <Pressable
      onPress={() => { onButtonPress(); onPress(); }}
      style={({ pressed }) => [
        styles.btnWrap,
        compact && styles.compact,
        pressed && { transform: [{ skewX: '-6deg' }, { scale: 0.96 }] },
      ]}
    >
      <View style={[styles.btn, { backgroundColor: bgColor }]}>
        {/* Top highlight — white overlay */}
        <View style={styles.topOverlay} />
        {/* Bottom shadow — black overlay */}
        <View style={styles.bottomOverlay} />
        {/* Corner accent */}
        <View style={[styles.corner, isPrimary && { backgroundColor: '#fff' }]} />

        <Text style={[
          styles.btnText,
          { color: textColor },
          isPrimary && styles.primaryShadow,
        ]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnWrap: {
    transform: [{ skewX: '-6deg' }],
    // Reference: drop-shadow(0px 1.394px 0px #000) drop-shadow(0px 4.881px 1.394px rgba(0,0,0,0.25))
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 8,
  },
  compact: {
    alignSelf: 'center',
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '12%',
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  corner: {
    position: 'absolute',
    top: -4,
    right: 2,
    width: 6,
    height: 18,
    backgroundColor: '#FEFDFB',
    transform: [{ rotate: '-43deg' }],
  },
  btnText: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 16,
    letterSpacing: 1,
    // Counter-skew so text reads straight
    transform: [{ skewX: '6deg' }],
  },
  primaryShadow: {
    textShadowColor: '#080206',
    textShadowOffset: { width: 0, height: 2.789 },
    textShadowRadius: 0,
  },
  ghostBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  ghostText: {
    fontFamily: 'TitilliumWeb_700Bold',
    fontSize: 14,
    color: 'rgba(171, 172, 185, 0.6)',
    letterSpacing: 0.5,
  },
});
