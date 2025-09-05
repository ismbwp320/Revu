// import { DrawerToggleButton } from "@react-navigation/drawer";
// import { Tabs } from "expo-router";
// import SignInModal from "../../(modals)/sign-in";
// // import { useAuth } from "../../../context/AuthContext";
// import { useRouter } from "expo-router";
// import {
//   Home,
//   SlidersHorizontal,
//   User
// } from "lucide-react-native";
// import { use, useState, useEffect } from 'react';
// const Layout = () => {
//   // const { isLoggedIn } = useAuth();
//   const isLoggedIn = false; 
//   const router = useRouter();
//   const [showDialog, setShowDialog] = useState(false);
//   return (
//     <>
//       <SignInModal isOpen={showDialog}         onClose={() => {
//           console.log("SignInModal closed ✅");
//           setShowDialog(false);
//         }} />
//       <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton /> }}>
//         <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
//         <Tabs.Screen
//           name="discussions"
//           options={{
//             headerShown: false,
//             title: "Discussions",
//             tabBarIcon: ({ color, size }) => (
//               <SlidersHorizontal color={color} size={size} />
//             ),
//           }}
//           listeners={({ navigation }) => ({
//             tabPress: (e) => {
//               if (!isLoggedIn) {
//                 e.preventDefault(); // stops default navigation
//                 console.log("User not logged in, redirecting to login page");
//                 setShowDialog(true);
//                 return; // or any other screen like /auth
//               } else {
//                 // optional: force navigation to discussions
//                 router.push("/(drawer)/(tabs)/discussions");
//               }
//             },
//           })}
//         />
//         {/* <Tabs.Screen       listeners={{
//           tabPress: () => {
//             if (!isLoggedIn) {
//               console.log("User not logged in, redirecting to discussions");
//               return;
//             } else {
//               router.push('/(drawer)/(tabs)/discussions');
//             }
//           },
//         }} name="discussions" options={{ headerShown: false, title: "Discussions", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} /> */}
//         <Tabs.Screen name="feed" options={{ headerShown: false, title: "Feed", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
//         <Tabs.Screen name="articles" options={{ headerShown: false, title: "Articles", tabBarIcon: ({ color, size }) => <SlidersHorizontal color={color} size={size} /> }} />
//         <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
//       </Tabs>
//     </>
//   )
// }

// export default Layout;

import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs, useRouter } from "expo-router";
import {
  Home,
  MessageCircle,
  Newspaper,
  User,
  Users,
  Search, Filter
} from "lucide-react-native";


// components/Header.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SignInModal from "@/app/(modals)/sign-in";
import { useAuth } from "@/context/AuthContext";

const Header =  function () {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      className="px-4 pt-12 pb-6 rounded-b-3xl"
    >
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-white text-2xl font-bold">EduReview Pro</Text>
          <Text className="text-indigo-100 text-sm">
            Discover trusted educational insights
          </Text>
        </View>
        <TouchableOpacity className="bg-white/20 p-2 rounded-full">
          <Users size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4">
        <Search size={20} color="#6B7280" />
        <TextInput
          placeholder="Search institutions, programs..."
          className="flex-1 ml-3 text-gray-900"
        />
        <TouchableOpacity
          onPress={() => {
            router.push("./filter");
          }}
        >
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      <View className="flex-row justify-between mb-2">
        {["All", "Recent", "Top Rated", "Trending"].map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter.toLowerCase() ? "bg-white" : "bg-white/20"
            }`}
            onPress={() => setActiveFilter(filter.toLowerCase())}
          >
            <Text
              className={
                activeFilter === filter.toLowerCase()
                  ? "text-indigo-600 font-medium"
                  : "text-white font-medium"
              }
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}


const Layout = () => {
    // const { isLoggedIn } = useAuth();

  //  const isLoggedIn = auth
   const { user, logout, isLoading, login, session } = useAuth();
    // const isLoggedIn = true; 
  const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);

  return (
    <>    <SignInModal isOpen={showDialog}         onClose={() => {
          console.log("SignInModal closed ✅");
          setShowDialog(false);
        }} />
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton />,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 7,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerShown: false,
        }} 
      />
      <Tabs.Screen 
        name="discussions" 
        options={{ 
          headerShown: false, 
          title: "Discussions", 
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} /> 
        }} 
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!user) {
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
      <Tabs.Screen 
        name="feed" 
        options={{ 
          headerShown: false, 
          title: "Feed", 
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> 
        }} 
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!user) {
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
      <Tabs.Screen 
        name="articles" 
        options={{ 
          headerShown: false, 
          title: "Articles", 
          tabBarIcon: ({ color, size }) => <Newspaper color={color} size={size} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile", 
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }} 
      />
    </Tabs>
    </>
  )
}

export default Layout;