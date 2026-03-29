import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { GameBackground } from '../src/components/GameBackground';
import { GameButton } from '../src/components/GameButton';
import { MarkX } from '../src/components/MarkX';
import { MarkO } from '../src/components/MarkO';
import { IconLocalPlay } from '../src/components/icons/IconLocalPlay';
import { IconComputer } from '../src/components/icons/IconComputer';
import { IconOnline } from '../src/components/icons/IconOnline';
import { IconJoin } from '../src/components/icons/IconJoin';
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
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Logo Section */}
          <Animated.View entering={FadeInUp.delay(0).duration(700)} style={styles.logoArea}>
            {/* Floating marks */}
            <View style={styles.marksRow}>
              <View style={styles.floatingMark}>
                <MarkX size={32} />
              </View>
              <View style={styles.floatingMark}>
                <MarkO size={32} />
              </View>
            </View>

            <Text style={styles.title}>TICTACTOE</Text>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>THE CLASSIC, PERFECTED</Text>
              <View style={styles.dividerLine} />
            </View>
          </Animated.View>

          {/* Mode Cards */}
          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.cards}>
            <ModeCard
              icon={<IconLocalPlay size={24} />}
              accentColor={colors.xPrimary}
              title="Pass & Play"
              subtitle="Two players, one device"
              onPress={() => startGame('local')}
              delay={400}
            />
            <ModeCard
              icon={<IconComputer size={24} />}
              accentColor={colors.oPrimary}
              title="vs Computer"
              subtitle="Easy, Medium, or Hard"
              onPress={() => startGame('ai')}
              delay={500}
            />
            <ModeCard
              icon={<IconOnline size={24} />}
              accentColor="#CDAAEE"
              title="Create Game"
              subtitle={isSupabaseConfigured ? 'Host a room for a friend' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => { setMode('online'); resetScores(); router.push('/lobby/create'); }
                  : () => Alert.alert('Online Mode', 'Set up Supabase and add credentials to .env')
              }
              delay={600}
              dimmed={!isSupabaseConfigured}
            />
            <ModeCard
              icon={<IconJoin size={24} />}
              accentColor="#CDAAEE"
              title="Join Game"
              subtitle={isSupabaseConfigured ? 'Enter a room code' : 'Requires online setup'}
              onPress={
                isSupabaseConfigured
                  ? () => { setMode('online'); resetScores(); router.push('/lobby/join'); }
                  : () => Alert.alert('Online Mode', 'Set up Supabase and add credentials to .env')
              }
              delay={700}
              dimmed={!isSupabaseConfigured}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 44,
  },
  marksRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  floatingMark: {
    shadowColor: '#F78E1E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  title: {
    fontFamily: 'TitilliumWeb_900Black',
    fontSize: 42,
    color: '#FEFDFB',
    letterSpacing: 8,
    textShadowColor: 'rgba(247, 142, 30, 0.45)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 35,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  dividerLine: {
    height: 1,
    width: 28,
    backgroundColor: 'rgba(123, 107, 196, 0.35)',
  },
  dividerText: {
    fontFamily: 'TitilliumWeb_600SemiBold',
    fontSize: 9,
    color: 'rgba(171, 172, 185, 0.45)',
    letterSpacing: 4,
  },
  cards: {
    gap: 10,
  },
});
