import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ModeCard } from '../src/components/ModeCard';
import { useGameStore } from '../src/store/game-store';
import { colors, spacing, radii } from '../src/constants/theme';
import { isSupabaseConfigured } from '../src/lib/supabase';

export default function HomeScreen() {
  const router = useRouter();
  const setMode = useGameStore((s) => s.setMode);
  const resetBoard = useGameStore((s) => s.resetBoard);
  const resetScores = useGameStore((s) => s.resetScores);

  const startGame = (mode: 'local' | 'ai') => {
    setMode(mode);
    resetBoard();
    resetScores();
    router.push(`/game/${mode}`);
  };

  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            entering={FadeIn.delay(0).springify().damping(12)}
            style={styles.logoArea}
          >
            <Text style={styles.appName}>TIC</Text>
            <Text style={styles.tagline}>THE CLASSIC, PERFECTED.</Text>
          </Animated.View>

          {/* Mode Cards */}
          <View style={styles.cards}>
            <ModeCard
              icon="👥"
              iconBgColor="rgba(247, 142, 30, 0.2)"
              title="Pass & Play"
              subtitle="Two players, one device"
              onPress={() => startGame('local')}
              delay={0}
            />
            <ModeCard
              icon="🤖"
              iconBgColor="rgba(69, 139, 188, 0.2)"
              title="vs Computer"
              subtitle="Easy, Medium, or Hard"
              onPress={() => startGame('ai')}
              delay={80}
            />
            <ModeCard
              icon="🌐"
              iconBgColor="rgba(205, 170, 238, 0.2)"
              title="Create Game"
              subtitle={isSupabaseConfigured ? 'Host a room for a friend' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => {
                      setMode('online');
                      resetScores();
                      router.push('/lobby/create');
                    }
                  : () =>
                      Alert.alert(
                        'Online Mode',
                        'To play online, set up Supabase and add your credentials to .env. See .env.example for details.',
                      )
              }
              delay={160}
              dimmed={!isSupabaseConfigured}
            />
            <ModeCard
              icon="🔗"
              iconBgColor="rgba(205, 170, 238, 0.2)"
              title="Join Game"
              subtitle={isSupabaseConfigured ? 'Enter a room code' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => {
                      setMode('online');
                      resetScores();
                      router.push('/lobby/join');
                    }
                  : () =>
                      Alert.alert(
                        'Online Mode',
                        'To play online, set up Supabase and add your credentials to .env. See .env.example for details.',
                      )
              }
              delay={240}
              dimmed={!isSupabaseConfigured}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.textWhite,
    letterSpacing: 12,
    textShadowColor: colors.xPrimary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textGray,
    letterSpacing: 4,
    marginTop: spacing.sm,
  },
  cards: {
    gap: spacing.md,
  },
});
