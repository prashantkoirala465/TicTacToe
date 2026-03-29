import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { onButtonPress } from '../lib/feedback';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ModeCardProps {
  icon: React.ReactNode;
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
        {/* Left accent */}
        <View style={[styles.accent, { backgroundColor: accentColor }]} />

        <View style={styles.iconWrap}>
          {icon}
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={[styles.arrowBadge, { borderColor: accentColor }]}>
          <Text style={[styles.arrow, { color: accentColor }]}>›</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(58, 39, 140, 0.3)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    paddingLeft: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(123, 107, 196, 0.15)',
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 3,
    borderRadius: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontFamily: 'TitilliumWeb_700Bold',
    fontSize: 16,
    color: '#FEFDFB',
  },
  subtitle: {
    fontFamily: 'TitilliumWeb_400Regular',
    fontSize: 12,
    color: 'rgba(171, 172, 185, 0.6)',
    marginTop: 1,
  },
  arrowBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontFamily: 'TitilliumWeb_700Bold',
    fontSize: 16,
    marginTop: -1,
  },
});
