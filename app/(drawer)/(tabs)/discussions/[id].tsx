import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";
const DiscussionDetails = () => {
    const { id } = useLocalSearchParams();
    
    
  return (
    <>
    <Stack.Screen options={{ title: `Discussion Details ${id}` }} />
    <View>
      <Text>DiscussionDetails { id } Page</Text>
    </View>
    </>
  )
}

export default DiscussionDetails; 