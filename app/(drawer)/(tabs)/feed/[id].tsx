import { useLocalSearchParams } from "expo-router/build/hooks";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
const FeedDetails = () => {
    const { id } = useLocalSearchParams();
  return (
    <>
    <Stack.Screen options={{ title: `Feed Details ${id}` }} />
    <View>
      <Text>FeedDetails { id } Page</Text>
    </View>
    </>
  )
}

export default FeedDetails;