import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const sounds: Record<string, Audio.Sound | null> = {
  pop: null,
  win: null,
  draw: null,
};

let loaded = false;

export async function loadSounds(): Promise<void> {
  if (loaded) return;
  try {
    const [pop, win, draw] = await Promise.all([
      Audio.Sound.createAsync(require('../../assets/sounds/pop.mp3')),
      Audio.Sound.createAsync(require('../../assets/sounds/win.mp3')),
      Audio.Sound.createAsync(require('../../assets/sounds/draw.mp3')),
    ]);
    sounds.pop = pop.sound;
    sounds.win = win.sound;
    sounds.draw = draw.sound;
    loaded = true;
  } catch {
    // Sounds are non-critical — game works without them
  }
}

async function playSound(name: keyof typeof sounds): Promise<void> {
  try {
    const sound = sounds[name];
    if (!sound) return;
    await sound.replayAsync();
  } catch {
    // Ignore playback errors
  }
}

export async function onCellTap(): Promise<void> {
  await Promise.all([
    playSound('pop'),
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  ]);
}

export async function onWin(): Promise<void> {
  await Promise.all([
    playSound('win'),
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  ]);
}

export async function onDraw(): Promise<void> {
  await Promise.all([
    playSound('draw'),
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  ]);
}

export async function onButtonPress(): Promise<void> {
  if (Platform.OS === 'ios') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}
