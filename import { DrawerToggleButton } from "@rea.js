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

// import { DrawerToggleButton } from "@react-navigation/drawer";
// import { Tabs, useRouter } from "expo-router";
// import {
//   Home,
//   MessageCircle,
//   Newspaper,
//   User,
//   Users,
//   Search, Filter, ArrowLeft
// } from "lucide-react-native";


// // components/Header.tsx
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";

// type HeaderProps = {
//   title?: string;
//   showFilters?: boolean; // hide on detail pages
// };

// const Header = function ({ title, showFilters = true }: HeaderProps) {
//   const router = useRouter();
//   const navigation = useNavigation();
//   const [activeFilter, setActiveFilter] = useState("all");

//   const canGoBack = navigation.canGoBack();

//   return (
//     <LinearGradient
//       colors={["#4F46E5", "#7C3AED"]}
//       style={styles.container}
//     >
//       <View style={styles.topRow}>
//         {/* Back or Logo */}
//         {canGoBack ? (
//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={() => navigation.goBack()}
//           >
//             <ArrowLeft size={24} color="white" />
//           </TouchableOpacity>
//         ) : (
//           <Text style={styles.logoText}>EduReview Pro</Text>
//         )}

//         {/* Title if given */}
//         {title && !canGoBack && (
//           <Text style={styles.titleText}>{title}</Text>
//         )}

//         {/* Right user icon */}
//         <TouchableOpacity style={styles.iconButton}>
//           <Users size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Search & Filters only on main pages */}
//       {showFilters && (
//         <>
//           {/* Search Bar */}
//           <View style={styles.searchBar}>
//             <Search size={20} color="#6B7280" />
//             <TextInput
//               placeholder="Search institutions, programs..."
//               style={styles.input}
//               placeholderTextColor="#9CA3AF"
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 router.push("./filter");
//               }}
//             >
//               <Filter size={20} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           {/* Quick Filters */}
//           <View style={styles.filterRow}>
//             {["All", "Recent", "Top Rated", "Trending"].map((filter) => (
//               <TouchableOpacity
//                 key={filter}
//                 style={[
//                   styles.filterButton,
//                   activeFilter === filter.toLowerCase() && styles.filterActive,
//                 ]}
//                 onPress={() => setActiveFilter(filter.toLowerCase())}
//               >
//                 <Text
//                   style={
//                     activeFilter === filter.toLowerCase()
//                       ? styles.filterActiveText
//                       : styles.filterText
//                   }
//                 >
//                   {filter}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </>
//       )}
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingTop: 48,
//     paddingBottom: 16,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   logoText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   titleText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     flex: 1,
//     textAlign: "center",
//   },
//   iconButton: {
//     padding: 6,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 8,
//     color: "#111827",
//   },
//   filterRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   filterButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     backgroundColor: "rgba(255,255,255,0.2)",
//   },
//   filterActive: {
//     backgroundColor: "white",
//   },
//   filterText: {
//     color: "white",
//     fontWeight: "500",
//   },
//   filterActiveText: {
//     color: "#4F46E5",
//     fontWeight: "600",
//   },
// });



// const Layout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         header: () => <Header />,
//         headerLeft: () => <DrawerToggleButton />,
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "#94A3B8",
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 0,
//           elevation: 7,
//           shadowColor: "#000000",
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.1,
//           shadowRadius: 4,
//           height: 70,
//           paddingBottom: 10,
//           paddingTop: 10,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "500",
//         },
//       }}
//     >
//       <Tabs.Screen 
//         name="index" 
//         options={{ 
//           title: "Home",
//           tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
//           headerShown: false,
//         }} 
//       />
//       <Tabs.Screen 
//         name="discussions" 
//         options={{ 
//           headerShown: false, 
//           title: "Discussions", 
//           tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} /> 
//         }} 
//       />
//       <Tabs.Screen 
//         name="feed" 
//         options={{ 
//           headerShown: false, 
//           title: "Feed", 
//           tabBarIcon: ({ color, size }) => <Users color={color} size={size} /> 
//         }} 
//       />
//       <Tabs.Screen 
//         name="articles" 
//         options={{ 
//           headerShown: false, 
//           title: "Articles", 
//           tabBarIcon: ({ color, size }) => <Newspaper color={color} size={size} /> 
//         }} 
//       />
//       <Tabs.Screen 
//         name="profile" 
//         options={{ 
//           header: () => <Header title="Profile" showFilters={false} />,
//           title: "Profile", 
//           tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
//         }} 
//       />
//     </Tabs>
//   )
// }

// export default Layout;