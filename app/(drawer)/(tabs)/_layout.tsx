import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import SignInModal from "../../(modals)/sign-in";
// import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "expo-router";
import {
  Home,
  SlidersHorizontal,
  User
} from "lucide-react-native";
import { use, useState, useEffect } from 'react';
const Layout = () => {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = false; 
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <SignInModal isOpen={showDialog}         onClose={() => {
          console.log("SignInModal closed ✅");
          setShowDialog(false);
        }} />
      <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton /> }}>
        <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
        <Tabs.Screen
          name="discussions"
          options={{
            headerShown: false,
            title: "Discussions",
            tabBarIcon: ({ color, size }) => (
              <SlidersHorizontal color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault(); // stops default navigation
                console.log("User not logged in, redirecting to login page");
                setShowDialog(true);
                return; // or any other screen like /auth
              } else {
                // optional: force navigation to discussions
                router.push("/(drawer)/(tabs)/discussions");
              }
            },
          })}
        />
        {/* <Tabs.Screen       listeners={{
          tabPress: () => {
            if (!isLoggedIn) {
              console.log("User not logged in, redirecting to discussions");
              return;
            } else {
              router.push('/(drawer)/(tabs)/discussions');
            }
          },
        }} name="discussions" options={{ headerShown: false, title: "Discussions", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} /> */}
        <Tabs.Screen name="feed" options={{ headerShown: false, title: "Feed", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
        <Tabs.Screen name="articles" options={{ headerShown: false, title: "Articles", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
        <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
      </Tabs>
    </>
  )
}

export default Layout;