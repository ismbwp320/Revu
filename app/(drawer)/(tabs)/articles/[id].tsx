import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";
const ArticleDetails = () => {
    const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: `Article Details ${id}` }} />
    <View>
      <Text>ArticleDetails { id } Page</Text>
    </View>
     </>
  )
}

export default ArticleDetails; 