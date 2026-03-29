import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const sounds: Record<string, Audio.Sound | null> = {
  pop: null,
  win: null,
  draw: null,
};

let loaded = false;

export async function loadSounds(): Promise<void> {
  if (loaded) return;
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    const [pop, win, draw] = await Promise.all([
      Audio.Sound.createAsync(require("../../assets/sounds/pop.wav")),
      Audio.Sound.createAsync(require("../../assets/sounds/win.wav")),
      Audio.Sound.createAsync(require("../../assets/sounds/draw.wav")),
    ]);
    sounds.pop = pop.sound;
    sounds.win = win.sound;
    sounds.draw = draw.sound;
    loaded = true;
  } catch (e) {
    console.warn("Failed to load sounds:", e);
  }
}

async function playSound(name: keyof typeof sounds): Promise<void> {
  try {
    const sound = sounds[name];
    if (!sound) return;
    await sound.setPositionAsync(0);
    await sound.playAsync();
  } catch {
    // Ignore playback errors
  }
}

export async function onCellTap(): Promise<void> {
  playSound("pop");
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export async function onWin(): Promise<void> {
  playSound("win");
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

export async function onDraw(): Promise<void> {
  playSound("draw");
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}

export async function onButtonPress(): Promise<void> {
  if (Platform.OS === "ios") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}
