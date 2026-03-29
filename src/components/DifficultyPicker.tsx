import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../constants/theme';
import { onButtonPress } from '../lib/feedback';
import type { Difficulty } from '../store/game-store';

const difficulties: { key: Difficulty; label: string; desc: string; color: string }[] = [
  { key: 'easy', label: 'Easy', desc: 'Random moves — good for warmups', color: '#B1D94D' },
  { key: 'medium', label: 'Medium', desc: 'Smart half the time — a fair fight', color: colors.xPrimary },
  { key: 'hard', label: 'Hard', desc: 'Unbeatable — can you draw?', color: '#BA4300' },
];

interface DifficultyPickerProps {
  visible: boolean;
  onSelect: (difficulty: Difficulty) => void;
  onClose: () => void;
}

export function DifficultyPicker({ visible, onSelect, onClose }: DifficultyPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>CHOOSE DIFFICULTY</Text>

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
                <View style={[styles.dot, { backgroundColor: d.color }]} />
                <View style={styles.optionText}>
                  <Text style={styles.optionLabel}>{d.label}</Text>
                  <Text style={styles.optionDesc}>{d.desc}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.cancelBtn} onPress={() => { onButtonPress(); onClose(); }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#130d3a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(171, 172, 185, 0.3)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3,
    color: 'rgba(171, 172, 185, 0.6)',
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    gap: 10,
  },
  option: {
    backgroundColor: 'rgba(58, 39, 140, 0.35)',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(171, 172, 185, 0.12)',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FEFDFB',
  },
  optionDesc: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(171, 172, 185, 0.6)',
    marginTop: 2,
  },
  cancelBtn: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: 'rgba(171, 172, 185, 0.5)',
    fontSize: 14,
    fontWeight: '600',
  },
});
