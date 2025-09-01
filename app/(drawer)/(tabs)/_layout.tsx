import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import {
  Home,
  SlidersHorizontal,
  User
} from "lucide-react-native";
const Layout = () => {
  return (
    <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton /> }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="discussions" options={{ headerShown: false, title: "Discussions", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
      <Tabs.Screen name="feed" options={{ headerShown: false, title: "Feed", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
      <Tabs.Screen name="articles" options={{ headerShown: false, title: "Articles", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
    </Tabs>
  )
}

export default Layout;