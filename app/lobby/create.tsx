import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Share, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GameBackground } from '../../src/components/GameBackground';
import { GameButton } from '../../src/components/GameButton';
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
    <GameBackground>
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
                <LinearGradient
                  colors={colors.xGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.shareButtonGradient}
                >
                  <Text style={styles.shareText}>Share Code</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.waitingArea}>
                <ActivityIndicator color={colors.xPrimary} />
                <Text style={styles.waitingText}>Waiting for opponent...</Text>
              </View>
            </Animated.View>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ActivityIndicator color={colors.xPrimary} />
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
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: colors.textWhite,
  },
  codeArea: {
    alignItems: 'center',
  },
  code: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.textWhite,
    letterSpacing: 8,
    marginBottom: spacing.sm,
    textShadowColor: colors.xPrimary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textGray,
    marginBottom: spacing.xxl,
  },
  shareButton: {
    borderRadius: radii.badge,
    overflow: 'hidden',
    marginBottom: spacing.xxxl,
    shadowColor: colors.xPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  shareButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: radii.badge,
  },
  shareText: {
    color: colors.textWhite,
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
    color: colors.textGray,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
  backButton: {
    marginTop: spacing.xxxl,
    paddingVertical: spacing.sm,
  },
  backText: {
    color: colors.textGray,
    fontSize: 15,
    fontWeight: '600',
  },
});
