import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { colors, radii, spacing, typography } from '../constants/theme';
import { onButtonPress } from '../lib/feedback';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ModeCardProps {
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  delay: number;
  dimmed?: boolean;
}

export function ModeCard({
  icon,
  iconBgColor,
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
        style={[styles.card, animatedStyle, dimmed && { opacity: 0.35 }]}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}
        onPress={() => {
          onButtonPress();
          onPress();
        }}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.chevron}>&rsaquo;</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.card,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.icon,
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
    ...typography.body,
    color: colors.textWhite,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textGray,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: colors.textGray,
    fontWeight: '700',
  },
});
