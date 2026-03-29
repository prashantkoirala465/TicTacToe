import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { supabase } from '../../src/lib/supabase';
import { RoomCodeInput } from '../../src/components/RoomCodeInput';
import { useGameStore } from '../../src/store/game-store';
import { onButtonPress } from '../../src/lib/feedback';
import { colors, spacing, typography } from '../../src/constants/theme';

export default function JoinRoomScreen() {
  const router = useRouter();
  const resetBoard = useGameStore((s) => s.resetBoard);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoin = async (roomCode: string) => {
    if (!supabase) {
      setError('Online mode not configured.');
      return;
    }
    setJoining(true);
    setError('');

    try {
      const { data, error: dbError } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', roomCode)
        .eq('status', 'waiting')
        .single();

      if (dbError || !data) {
        setError('Room not found or already in use.');
        setJoining(false);
        setCode('');
        return;
      }

      await supabase
        .from('rooms')
        .update({ status: 'playing' })
        .eq('id', data.id);

      resetBoard();
      router.replace({
        pathname: '/game/online',
        params: { code: roomCode, host: '0' },
      });
    } catch {
      setError('Connection error. Try again.');
      setJoining(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(200)}>
          <Text style={styles.title}>Join Game</Text>
          <Text style={styles.subtitle}>Enter the 4-character room code</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(100).springify().damping(14)}
          style={styles.inputArea}
        >
          {joining ? (
            <ActivityIndicator color={colors.brandGradientStart} size="large" />
          ) : (
            <RoomCodeInput
              value={code}
              onChange={setCode}
              onComplete={handleJoin}
            />
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Animated.View>

        <Pressable
          style={styles.backButton}
          onPress={() => {
            onButtonPress();
            router.back();
          }}
        >
          <Text style={styles.backText}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xxxl,
  },
  inputArea: {
    marginBottom: spacing.xxxl,
    minHeight: 80,
    justifyContent: 'center',
  },
  errorText: {
    ...typography.caption,
    color: colors.oMark,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  backButton: {
    paddingVertical: spacing.sm,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
