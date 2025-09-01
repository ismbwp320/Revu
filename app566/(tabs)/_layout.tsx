export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
  Tabs,
} from 'expo-router';

import { Stack, Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="reviews" options={{ title: 'Reviews', tabBarLabel: 'Reviews' }} />
      <Tabs.Screen name="discussion" options={{ title: 'Discussion', tabBarLabel: 'Discussion' }} />
      <Tabs.Screen name="articles" options={{ title: 'Articles', tabBarLabel: 'Articles' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
