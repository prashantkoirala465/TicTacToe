import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { MarkX } from './MarkX';
import { MarkO } from './MarkO';
import { colors, radii } from '../constants/theme';
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
      pressScale.value = withSpring(0.93, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const getBorderColor = () => {
    if (value === 'X') return colors.xPrimary;
    if (value === 'O') return colors.oPrimary;
    return colors.bgCellBorder;
  };

  return (
    <AnimatedPressable
      style={[
        styles.cell,
        { borderColor: getBorderColor(), borderWidth: value ? 3 : 1 },
        cellStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !!value}
    >
      {value && (
        <Animated.View style={markStyle}>
          {value === 'X' ? <MarkX size={70} /> : <MarkO size={70} />}
        </Animated.View>
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
    backgroundColor: colors.bgCell,
  },
});
