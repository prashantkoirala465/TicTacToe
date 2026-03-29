import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Share, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { supabase, generateRoomCode } from '../../src/lib/supabase';
import { useOnlineGame } from '../../src/hooks/useOnlineGame';
import { useGameStore } from '../../src/store/game-store';
import { onButtonPress } from '../../src/lib/feedback';
import { colors, spacing, typography, radii } from '../../src/constants/theme';

export default function CreateRoomScreen() {
  const router = useRouter();
  const resetBoard = useGameStore((s) => s.resetBoard);
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    createRoom();
  }, []);

  const createRoom = async (retries = 0) => {
    if (!supabase) {
      setError('Online mode not configured.');
      return;
    }
    if (retries >= 5) {
      setError('Failed to create room. Try again.');
      return;
    }
    const code = generateRoomCode();
    try {
      const { error: dbError } = await supabase
        .from('rooms')
        .insert({ code, status: 'waiting' });

      if (dbError) {
        if (dbError.code === '23505') {
          createRoom(retries + 1);
          return;
        }
        setError('Failed to create room. Try again.');
        return;
      }
      setRoomCode(code);
    } catch {
      setError('Connection error. Check your internet.');
    }
  };

  const handleOpponentMove = useCallback(() => {}, []);
  const handleOpponentJoined = useCallback(() => {
    resetBoard();
    router.replace({
      pathname: '/game/online',
      params: { code: roomCode, host: '1' },
    });
  }, [resetBoard, router, roomCode]);
  const handleOpponentLeft = useCallback(() => {}, []);
  const handleOpponentReset = useCallback(() => {}, []);

  const { status } = useOnlineGame({
    roomCode,
    isHost: true,
    onOpponentMove: handleOpponentMove,
    onOpponentJoined: handleOpponentJoined,
    onOpponentLeft: handleOpponentLeft,
    onOpponentReset: handleOpponentReset,
  });

  const handleShare = async () => {
    onButtonPress();
    await Share.share({ message: `Join my Tic game! Code: ${roomCode}` });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.duration(200)} style={styles.header}>
          <Text style={styles.title}>Your Room</Text>
        </Animated.View>

        {roomCode ? (
          <Animated.View
            entering={FadeInUp.delay(100).springify().damping(14)}
            style={styles.codeArea}
          >
            <Text style={styles.code}>{roomCode}</Text>
            <Text style={styles.subtitle}>Share this code with a friend</Text>

            <Pressable style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Share Code</Text>
            </Pressable>

            <View style={styles.waitingArea}>
              <ActivityIndicator color={colors.brandGradientStart} />
              <Text style={styles.waitingText}>Waiting for opponent...</Text>
            </View>
          </Animated.View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ActivityIndicator color={colors.brandGradientStart} />
        )}

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
  header: {
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  codeArea: {
    alignItems: 'center',
  },
  code: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 8,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  shareButton: {
    backgroundColor: colors.brandGradientStart,
    borderRadius: radii.card,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: spacing.xxxl,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  waitingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  waitingText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.caption,
    color: colors.oMark,
  },
  backButton: {
    marginTop: spacing.xxxl,
    paddingVertical: spacing.sm,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
