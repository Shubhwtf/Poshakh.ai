import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Text } from 'react-native';

// Import fonts
import {
  Lato_400Regular as LatoRegular,
  Lato_700Bold as LatoBold,
} from '@expo-google-fonts/lato';

import {
  PlayfairDisplay_400Regular as PlayfairDisplayRegular,
  PlayfairDisplay_700Bold as PlayfairDisplayBold,
} from '@expo-google-fonts/playfair-display';

export default function RootLayoutNav() {
  const [loaded, error] = useFonts({
    'Lato-Regular': LatoRegular,
    'Lato-Bold': LatoBold,
    'PlayfairDisplay-Regular': PlayfairDisplayRegular,
    'PlayfairDisplay-Bold': PlayfairDisplayBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" options={{ animation: 'none' }} />
      <Stack.Screen name="(tabs)" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}