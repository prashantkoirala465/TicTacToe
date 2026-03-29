import { Stack } from 'expo-router';

export default function LobbyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000000' },
        gestureEnabled: true,
        presentation: 'modal',
      }}
    />
  );
}
