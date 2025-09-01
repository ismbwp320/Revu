/* eslint-disable @typescript-eslint/ban-ts-comment */
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Reviews() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome to the Reviews Screen</Text>

     {/* @ts-ignore */}
      <Link href="/reviews/1" asChild>
        <Pressable className="bg-blue-500 px-4 py-2 rounded">
          <Text className="text-white">Go to Review Details</Text>
        </Pressable>
      </Link>
    </View>
  );
}
