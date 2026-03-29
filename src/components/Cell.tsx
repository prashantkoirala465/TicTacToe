import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, radii, typography } from '../constants/theme';
import type { Cell as CellType } from '../utils/game-engine';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CellProps {
  value: CellType;
  onPress: () => void;
  disabled: boolean;
}

export function Cell({ value, onPress, disabled }: CellProps) {
  const markScale = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    if (value) {
      markScale.value = withSpring(1, { damping: 12, stiffness: 180 });
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
      pressScale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      style={[
        styles.cell,
        value ? styles.cellFilled : styles.cellEmpty,
        cellStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !!value}
    >
      {value && (
        <Animated.Text
          style={[
            styles.mark,
            value === 'X' ? styles.xMark : styles.oMark,
            markStyle,
          ]}
        >
          {value}
        </Animated.Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderRadius: radii.cell,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    backgroundColor: colors.cellFilled,
  },
  cellEmpty: {
    backgroundColor: colors.cellEmpty,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.cellBorder,
  },
  mark: {
    fontSize: typography.mark.fontSize,
    fontWeight: typography.mark.fontWeight,
  },
  xMark: {
    color: colors.xMark,
  },
  oMark: {
    color: colors.oMark,
  },
});
