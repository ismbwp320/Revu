import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Platform, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Divider } from '@/components/ui/divider';
import { Box } from '@/components/ui/box';
import { Badge, BadgeText } from '@/components/ui/badge';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { 
  Home, 
  MessageCircle, 
  HelpCircle,
  Settings,
  Bell,
  Shield,
  LogOut,
  Moon,
  Sun,
  Star,
  Heart,
  Coffee,
  TrendingUp,
  Award
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Custom Drawer Content Component
function CustomDrawerContent(props: any) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <Box className="flex-1">
      {/* Gradient Background */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glassmorphism Overlay */}
      <Box className="flex-1 bg-white/10">
        {/* 👉 Replaced DrawerContentScrollView with Box (no scroll) */}
        <Box className="flex-1 pt-0">
          {/* Logo & Brand Header */}
          <VStack className="justify-center items-center pt-16 pb-6 px-6">
            {/* User Profile */}
            <HStack className="items-center gap-4 w-full">
              <Avatar size="xl" className="border-2 border-white">
                <AvatarFallbackText className="text-white font-bold">JD</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                  }}
                />
              </Avatar>
              <VStack className="flex-1">
                <HStack className="items-center gap-2">
                  <Text className="text-white text-lg font-semibold">John Doe</Text>
                  <Badge className="bg-green-500/80 rounded-full">
                    <BadgeText className="text-white text-xs font-bold">PRO</BadgeText>
                  </Badge>
                </HStack>
                <Text className="text-white/80 text-sm">john@example.com</Text>
                <HStack className="items-center gap-1 mt-1">
                  <Icon as={Star} size="xs" className="text-yellow-400" />
                  <Text className="text-white/70 text-xs">Premium Member</Text>
                </HStack>
              </VStack>
            </HStack>
          </VStack>

          {/* Navigation Body */}
          <VStack className="gap-2 px-4 py-6 flex-1">
            <VStack className="gap-1">
              <DrawerNavItem
                icon={Home}
                label="Home"
                badge="4"
                onPress={() => props.navigation.navigate('(tabs)')}
                isActive={props.state.routeNames[props.state.index]?.includes('(tabs)')}
              />
              <DrawerNavItem
                icon={HelpCircle}
                label="Support"
                onPress={() => props.navigation.navigate('support')}
                isActive={props.state.routeNames[props.state.index] === 'support'}
              />
              <DrawerNavItem
                icon={Bell}
                label="Notifications"
                badge="3"
                onPress={() => console.log('Navigate to Notifications')}
              />
            </VStack>

            <Divider className="bg-white/20 mx-2 my-4" />
          </VStack>
        </Box>

        {/* Fixed Footer */}
        <VStack className="px-6 pb-8 gap-4 bg-white/5">
          <HStack className="gap-3">
            <Button 
              className="flex-1 bg-red-500/80"
              onPress={() => console.log('Logout pressed')}
            >
              <ButtonIcon as={LogOut} className="text-white mr-2" />
              <ButtonText className="text-white">Logout</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}



// Drawer Navigation Item Component
function DrawerNavItem({ 
  icon: IconComponent, 
  label, 
  badge, 
  onPress, 
  isActive = false 
}: {
  icon: any;
  label: string;
  badge?: string;
  onPress: () => void;
  isActive?: boolean;
}) {
  return (
    <Pressable 
      onPress={onPress}
      className={`
        flex-row items-center gap-3 p-4 rounded-xl
        ${isActive 
          ? 'bg-white/25 border border-white/30' 
          : 'bg-transparent active:bg-white/10'
        }
      `}
    >
      <Icon
        as={IconComponent}
        size="xl"
        className={isActive ? 'text-white' : 'text-white/80'}
      />
      <Text
        className={`
          flex-1 text-base
          ${isActive ? 'text-white font-bold' : 'text-white/90 font-medium'}
        `}
      >
        {label}
      </Text>
      {badge && (
        <Badge className="bg-red-500/80 rounded-full min-w-5 min-h-5">
          <BadgeText className="text-white text-xs font-bold">
            {badge}
          </BadgeText>
        </Badge>
      )}
    </Pressable>
  );
}

// Main Drawer Layout
const Layout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: width * 0.85, // 85% of screen width
          backgroundColor: 'transparent',
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <Drawer.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false, 
          title: "Home",
          drawerLabel: "Home",
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      <Drawer.Screen 
        name="support" 
        options={{ 
          headerShown: true, 
          title: "Support",
          drawerLabel: "Support & Help",
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
    </Drawer>
  );
};

export default Layout;