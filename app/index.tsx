import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ModeCard } from '../src/components/ModeCard';
import { useGameStore } from '../src/store/game-store';
import { colors, spacing, typography, radii } from '../src/constants/theme';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          entering={FadeIn.delay(0).springify().damping(12)}
          style={styles.logoArea}
        >
          <LinearGradient
            colors={[colors.brandGradientStart, colors.brandGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoSquare}
          >
            <Text style={styles.logoMark}>X</Text>
          </LinearGradient>
          <Text style={styles.appName}>Tic</Text>
          <Text style={styles.tagline}>The classic, perfected.</Text>
        </Animated.View>

        {/* Mode Cards */}
        <View style={styles.cards}>
          <ModeCard
            icon="👥"
            iconBgColor={colors.localIconBg}
            title="Pass & Play"
            subtitle="Two players, one device"
            onPress={() => startGame('local')}
            delay={0}
          />
          <ModeCard
            icon="🤖"
            iconBgColor={colors.aiIconBg}
            title="vs Computer"
            subtitle="Easy, Medium, or Hard"
            onPress={() => startGame('ai')}
            delay={80}
          />
          <ModeCard
            icon="🌐"
            iconBgColor={colors.onlineIconBg}
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
            style={isSupabaseConfigured ? undefined : { opacity: 0.4 }}
          />
          <ModeCard
            icon="🔗"
            iconBgColor={colors.onlineIconBg}
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
            style={isSupabaseConfigured ? undefined : { opacity: 0.4 }}
          />
        </View>
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
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoSquare: {
    width: 72,
    height: 72,
    borderRadius: radii.appIcon,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.brandGradientStart,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  logoMark: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  appName: {
    ...typography.heading,
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cards: {
    gap: spacing.md,
  },
});
