import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { MarkX } from "./MarkX";
import { GameButton } from "./GameButton";
import { onButtonPress } from "../lib/feedback";
import type { Difficulty } from "../store/game-store";

interface DifficultyPickerProps {
  visible: boolean;
  onSelect: (difficulty: Difficulty) => void;
  onClose: () => void;
}

export function DifficultyPicker({
  visible,
  onSelect,
  onClose,
}: DifficultyPickerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <LinearGradient
        colors={["rgba(4,8,15,0.95)", "rgba(4,8,15,0.98)"]}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <Animated.View
            entering={FadeIn.delay(100).duration(400)}
            style={styles.iconWrap}
          >
            <MarkX size={48} />
          </Animated.View>

          <Animated.View entering={FadeIn.delay(200).duration(400)}>
            <Text style={styles.title}>CHOOSE YOUR</Text>
            <Text style={styles.titleAccent}>CHALLENGE</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            style={styles.buttons}
          >
            <View style={styles.btnRow}>
              <GameButton
                title="EASY"
                onPress={() => onSelect("easy")}
                variant="secondary"
              />
              <Text style={styles.desc}>Random moves</Text>
            </View>
            <View style={styles.btnRow}>
              <GameButton
                title="MEDIUM"
                onPress={() => onSelect("medium")}
              />
              <Text style={styles.desc}>Smart half the time</Text>
            </View>
            <View style={styles.btnRow}>
              <GameButton
                title="HARD"
                onPress={() => onSelect("hard")}
              />
              <Text style={styles.desc}>Unbeatable</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(600).duration(300)}>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => {
                onButtonPress();
                onClose();
              }}
            >
              <Text style={styles.cancelText}>BACK</Text>
            </Pressable>
          </Animated.View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
    width: "100%",
  },
  iconWrap: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 14,
    color: "rgba(171, 172, 185, 0.5)",
    letterSpacing: 6,
    textAlign: "center",
  },
  titleAccent: {
    fontFamily: "TitilliumWeb_900Black",
    fontSize: 32,
    color: "#FEFDFB",
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "rgba(247, 142, 30, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  buttons: {
    width: "100%",
    gap: 16,
    marginBottom: 32,
  },
  btnRow: {
    alignItems: "center",
    gap: 6,
  },
  desc: {
    fontFamily: "TitilliumWeb_400Regular",
    fontSize: 12,
    color: "rgba(171, 172, 185, 0.4)",
    letterSpacing: 1,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 14,
    color: "rgba(171, 172, 185, 0.4)",
    letterSpacing: 3,
  },
});
