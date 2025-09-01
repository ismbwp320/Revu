import { Link } from "expo-router";
import { Text, View } from "react-native";
const Feed = () => {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/(drawer)/(tabs)/feed/1"><Text>Go to Feed Details 1</Text></Link>
      <Link href="/(drawer)/(tabs)/feed/2"><Text>Go to Feed Details 2</Text></Link>
      <Link href="/(drawer)/(tabs)/feed/3"><Text>Go to Feed Details 3</Text></Link>
      <Text>Feed Page</Text>
    </View>
  )
}

export default Feed;