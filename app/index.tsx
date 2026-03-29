import React from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { GameBackground } from "../src/components/GameBackground";
import { GameButton } from "../src/components/GameButton";
import { MarkX } from "../src/components/MarkX";
import { MarkO } from "../src/components/MarkO";
import { useGameStore } from "../src/store/game-store";
import { colors } from "../src/constants/theme";
import { isSupabaseConfigured } from "../src/lib/supabase";
import { onButtonPress } from "../src/lib/feedback";

export default function HomeScreen() {
  const router = useRouter();
  const setMode = useGameStore((s) => s.setMode);
  const resetBoard = useGameStore((s) => s.resetBoard);
  const resetScores = useGameStore((s) => s.resetScores);

  const play = (mode: "local" | "ai" | "online") => {
    onButtonPress();
    setMode(mode);
    resetBoard();
    resetScores();
    if (mode === "online") {
      router.push("/lobby/create");
    } else {
      router.push(`/game/${mode}`);
    }
  };

  return (
    <GameBackground>
      <SafeAreaView style={styles.safe}>
        <View style={styles.spacer} />

        {/* Hero section */}
        <Animated.View
          entering={FadeInUp.duration(800)}
          style={styles.hero}
        >
          <View style={styles.marksRow}>
            <MarkX size={44} />
            <MarkO size={44} />
          </View>
          <Text style={styles.title}>TICTACTOE</Text>
          <Text style={styles.subtitle}>THE CLASSIC, PERFECTED</Text>
        </Animated.View>

        {/* Menu */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.menu}
        >
          {/* Primary actions — big buttons */}
          <GameButton
            title="PASS & PLAY"
            onPress={() => play("local")}
          />
          <GameButton
            title="VS COMPUTER"
            onPress={() => play("ai")}
            variant="secondary"
          />

          {/* Online — subtle row */}
          <View style={styles.onlineRow}>
            <Pressable
              style={[styles.onlineBtn, !isSupabaseConfigured && { opacity: 0.3 }]}
              onPress={() =>
                isSupabaseConfigured
                  ? play("online")
                  : Alert.alert("Online Mode", "Set up Supabase credentials in .env")
              }
            >
              <Text style={styles.onlineText}>CREATE GAME</Text>
            </Pressable>
            <View style={styles.onlineDivider} />
            <Pressable
              style={[styles.onlineBtn, !isSupabaseConfigured && { opacity: 0.3 }]}
              onPress={() => {
                if (!isSupabaseConfigured) {
                  Alert.alert("Online Mode", "Set up Supabase credentials in .env");
                  return;
                }
                onButtonPress();
                setMode("online");
                resetScores();
                router.push("/lobby/join");
              }}
            >
              <Text style={styles.onlineText}>JOIN GAME</Text>
            </Pressable>
          </View>
        </Animated.View>

        <View style={styles.spacerBottom} />
      </SafeAreaView>
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  spacer: { flex: 2 },
  spacerBottom: { flex: 1 },
  hero: {
    alignItems: "center",
    marginBottom: 56,
  },
  marksRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  title: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 48,
    color: "#FEFDFB",
    letterSpacing: 6,
    textShadowColor: "rgba(247, 142, 30, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
  },
  subtitle: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 11,
    color: "rgba(171, 172, 185, 0.4)",
    letterSpacing: 6,
    marginTop: 8,
  },
  menu: {
    paddingHorizontal: 40,
    gap: 14,
  },
  onlineRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },
  onlineBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  onlineText: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 13,
    color: "rgba(171, 172, 185, 0.45)",
    letterSpacing: 2,
  },
  onlineDivider: {
    width: 1,
    height: 16,
    backgroundColor: "rgba(171, 172, 185, 0.2)",
  },
});
