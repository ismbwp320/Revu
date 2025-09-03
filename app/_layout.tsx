import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QueryProvider from '@/components/QueryProvider';


export default function RootLayout() {
  return (
  <QueryProvider>
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView style={{ flex: 1, marginBottom: 34 }}>
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  </QueryProvider>
  );
}
