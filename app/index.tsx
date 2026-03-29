import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MarkX } from '../src/components/MarkX';
import { ModeCard } from '../src/components/ModeCard';
import { useGameStore } from '../src/store/game-store';
import { colors, spacing } from '../src/constants/theme';
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
            <View style={styles.logoMark}>
              <MarkX size={48} />
            </View>
            <Text style={styles.appName}>TIC</Text>
            <View style={styles.taglineRow}>
              <View style={styles.taglineLine} />
              <Text style={styles.tagline}>THE CLASSIC, PERFECTED</Text>
              <View style={styles.taglineLine} />
            </View>
          </Animated.View>

          {/* Mode Cards */}
          <View style={styles.cards}>
            <ModeCard
              icon="⚔️"
              accentColor={colors.xPrimary}
              title="Pass & Play"
              subtitle="Two players, one device"
              onPress={() => startGame('local')}
              delay={100}
            />
            <ModeCard
              icon="🤖"
              accentColor={colors.oPrimary}
              title="vs Computer"
              subtitle="Easy, Medium, or Hard"
              onPress={() => startGame('ai')}
              delay={180}
            />
            <ModeCard
              icon="🌐"
              accentColor="#CDAAEE"
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
              delay={260}
              dimmed={!isSupabaseConfigured}
            />
            <ModeCard
              icon="🔗"
              accentColor="#CDAAEE"
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
              delay={340}
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
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 52,
  },
  logoMark: {
    marginBottom: 8,
    shadowColor: colors.xPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  appName: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FEFDFB',
    letterSpacing: 16,
    textShadowColor: 'rgba(247, 142, 30, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  taglineLine: {
    height: 1,
    width: 28,
    backgroundColor: 'rgba(171, 172, 185, 0.3)',
  },
  tagline: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(171, 172, 185, 0.5)',
    letterSpacing: 4,
  },
  cards: {
    gap: 10,
  },
});
