import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GameBackground } from '../src/components/GameBackground';
import { ModeCard } from '../src/components/ModeCard';
import { useGameStore } from '../src/store/game-store';
import { colors } from '../src/constants/theme';
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
    <GameBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            entering={FadeInDown.delay(0).duration(600)}
            style={styles.logoArea}
          >
            <Text style={styles.appName}>TICTACTOE</Text>
            <View style={styles.subtitleRow}>
              <View style={styles.subtitleLine} />
              <Text style={styles.subtitle}>THE CLASSIC, PERFECTED</Text>
              <View style={styles.subtitleLine} />
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
              delay={200}
            />
            <ModeCard
              icon="🤖"
              accentColor={colors.oPrimary}
              title="vs Computer"
              subtitle="Easy, Medium, or Hard"
              onPress={() => startGame('ai')}
              delay={300}
            />
            <ModeCard
              icon="🌐"
              accentColor="#CDAAEE"
              title="Create Game"
              subtitle={isSupabaseConfigured ? 'Host a room for a friend' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => { setMode('online'); resetScores(); router.push('/lobby/create'); }
                  : () => Alert.alert('Online Mode', 'Set up Supabase and add credentials to .env')
              }
              delay={400}
              dimmed={!isSupabaseConfigured}
            />
            <ModeCard
              icon="🔗"
              accentColor="#CDAAEE"
              title="Join Game"
              subtitle={isSupabaseConfigured ? 'Enter a room code' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => { setMode('online'); resetScores(); router.push('/lobby/join'); }
                  : () => Alert.alert('Online Mode', 'Set up Supabase and add credentials to .env')
              }
              delay={500}
              dimmed={!isSupabaseConfigured}
            />
          </View>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontFamily: 'TitilliumWeb-Black',
    fontSize: 44,
    color: '#FEFDFB',
    letterSpacing: 6,
    textShadowColor: 'rgba(247, 142, 30, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
  },
  subtitleLine: {
    height: 1,
    width: 30,
    backgroundColor: 'rgba(123, 107, 196, 0.4)',
  },
  subtitle: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 10,
    color: 'rgba(171, 172, 185, 0.5)',
    letterSpacing: 4,
  },
  cards: {
    gap: 10,
  },
});
