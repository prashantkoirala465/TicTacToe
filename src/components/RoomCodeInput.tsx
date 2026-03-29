import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';

interface RoomCodeInputProps {
  value: string;
  onChange: (code: string) => void;
  onComplete: (code: string) => void;
}

export function RoomCodeInput({ value, onChange, onComplete }: RoomCodeInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handleChange = (text: string) => {
    const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    onChange(cleaned);
    if (cleaned.length === 4) {
      onComplete(cleaned);
    }
  };

  const digits = value.padEnd(4, ' ').split('');

  return (
    <View style={styles.container}>
      {digits.map((char, i) => (
        <View
          key={i}
          style={[styles.box, i < value.length && styles.boxFilled]}
        >
          {char.trim() ? (
            <TextInput
              style={styles.char}
              value={char}
              editable={false}
            />
          ) : null}
        </View>
      ))}
      <TextInput
        ref={inputRef}
        style={styles.realInput}
        value={value}
        onChangeText={handleChange}
        maxLength={4}
        autoCapitalize="characters"
        autoCorrect={false}
        autoFocus
        keyboardType="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    position: 'relative',
  },
  box: {
    width: 56,
    height: 64,
    borderRadius: radii.badge,
    backgroundColor: colors.bgCell,
    borderWidth: 2,
    borderColor: colors.bgCellBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    borderColor: colors.xPrimary,
  },
  char: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 24,
    color: '#FEFDFB',
    textAlign: 'center',
  },
  realInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
  },
});
