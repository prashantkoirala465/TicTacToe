import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { loadSounds } from '../src/lib/feedback';

export default function RootLayout() {
  useEffect(() => {
    loadSounds();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'default',
        }}
      />
    </>
  );
}
