import { useLocalSearchParams } from "expo-router";
import { View, Text } from 'react-native';

export default function ReviewDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Review Details for Review ID: {id}</Text>
    </View>
  );
}
