import { Stack } from 'expo-router';

export default function LobbyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
        gestureEnabled: true,
        presentation: 'modal',
      }}
    />
  );
}
