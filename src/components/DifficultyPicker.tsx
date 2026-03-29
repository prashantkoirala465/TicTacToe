import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { colors, radii, spacing, typography } from '../constants/theme';
import { onButtonPress } from '../lib/feedback';
import type { Difficulty } from '../store/game-store';

const difficulties: { key: Difficulty; label: string; description: string }[] = [
  { key: 'easy', label: 'Easy', description: 'Random moves — good for beginners' },
  { key: 'medium', label: 'Medium', description: 'Mix of smart and random moves' },
  { key: 'hard', label: 'Hard', description: 'Unbeatable — can you get a draw?' },
];

interface DifficultyPickerProps {
  visible: boolean;
  onSelect: (difficulty: Difficulty) => void;
  onClose: () => void;
}

export function DifficultyPicker({ visible, onSelect, onClose }: DifficultyPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
        <Animated.View
          entering={FadeInUp.delay(100).springify().damping(14)}
          style={styles.sheet}
        >
          <Text style={styles.title}>Choose Difficulty</Text>
          <View style={styles.options}>
            {difficulties.map((d) => (
              <Pressable
                key={d.key}
                style={styles.option}
                onPress={() => {
                  onButtonPress();
                  onSelect(d.key);
                }}
              >
                <Text style={styles.optionLabel}>{d.label}</Text>
                <Text style={styles.optionDesc}>{d.description}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.cancelButton} onPress={() => { onButtonPress(); onClose(); }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xxl,
    paddingBottom: 48,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  options: {
    gap: spacing.md,
  },
  option: {
    backgroundColor: colors.modeCardBg,
    borderRadius: radii.card,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.modeCardBorder,
  },
  optionLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  optionDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cancelButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
