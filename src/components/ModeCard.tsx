import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { colors, spacing } from '../constants/theme';
import { onButtonPress } from '../lib/feedback';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ModeCardProps {
  icon: string;
  accentColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  delay: number;
  dimmed?: boolean;
}

export function ModeCard({
  icon,
  accentColor,
  title,
  subtitle,
  onPress,
  delay,
  dimmed,
}: ModeCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify().damping(14)}>
      <AnimatedPressable
        style={[styles.card, animatedStyle, dimmed && { opacity: 0.3 }]}
        onPressIn={() => {
          scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}
        onPress={() => {
          onButtonPress();
          onPress();
        }}
      >
        {/* Accent line on left */}
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />

        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={[styles.arrow, { borderColor: accentColor }]}>
          <Text style={[styles.arrowText, { color: accentColor }]}>›</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(58, 39, 140, 0.35)',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    paddingLeft: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(171, 172, 185, 0.15)',
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    borderRadius: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FEFDFB',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(171, 172, 185, 0.7)',
    marginTop: 2,
  },
  arrow: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -2,
  },
});
