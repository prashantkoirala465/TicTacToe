import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from '@expo-google-fonts/titillium-web/useFonts';
import { loadSounds } from '../src/lib/feedback';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'TitilliumWeb-Regular': require('@expo-google-fonts/titillium-web/400Regular'),
    'TitilliumWeb-SemiBold': require('@expo-google-fonts/titillium-web/600SemiBold'),
    'TitilliumWeb-Bold': require('@expo-google-fonts/titillium-web/700Bold'),
    'TitilliumWeb-Black': require('@expo-google-fonts/titillium-web/900Black'),
  });

  useEffect(() => {
    loadSounds();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#F78E1E" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
        }}
      />
    </SafeAreaProvider>
  );
}
