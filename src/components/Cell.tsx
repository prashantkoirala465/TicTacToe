import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { colors } from '../constants/theme';
import type { Cell as CellType } from '../utils/game-engine';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CellProps {
  value: CellType;
  onPress: () => void;
  disabled: boolean;
  size: number;
}

export function Cell({ value, onPress, disabled, size }: CellProps) {
  const markScale = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    if (value) {
      markScale.value = withSpring(1, { damping: 10, stiffness: 150 });
    } else {
      markScale.value = 0;
    }
  }, [value, markScale]);

  const cellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const markStyle = useAnimatedStyle(() => ({
    transform: [{ scale: markScale.value }],
    opacity: markScale.value,
  }));

  const handlePressIn = () => {
    if (!disabled && !value) {
      pressScale.value = withSpring(0.92, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const borderColor = value === 'X' ? colors.xPrimary
    : value === 'O' ? colors.oPrimary
    : 'rgba(171, 172, 185, 0.4)';

  // Reference: 4px stroke on filled, 1px on empty
  const borderWidth = value ? 4 : 1;

  // Mark fills ~80% of the cell
  const markSize = Math.floor(size * 0.78);

  return (
    <AnimatedPressable
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderColor,
          borderWidth,
        },
        cellStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !!value}
    >
      {/* Inner glow for filled cells */}
      {value && (
        <View
          style={[
            styles.innerGlow,
            {
              shadowColor: value === 'X' ? colors.xPrimary : colors.oPrimary,
            },
          ]}
        />
      )}
      {value && (
        <Animated.View style={markStyle}>
          {value === 'X' ? <MarkX size={markSize} /> : <MarkO size={markSize} />}
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(58, 39, 140, 0.3)',
    overflow: 'hidden',
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 0,
  },
});
