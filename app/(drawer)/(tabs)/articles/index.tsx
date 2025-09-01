import { Link } from "expo-router";
import { Text, View } from "react-native";
const Articles = () => {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/(drawer)/(tabs)/articles/1"><Text>Go to article Details 1</Text></Link>
      <Link href="/(drawer)/(tabs)/articles/2"><Text>Go to article Details 2</Text></Link>
      <Link href="/(drawer)/(tabs)/articles/3"><Text>Go to article Details 3</Text></Link>
      <Text>article Page</Text>
    </View>
  )
}

export default Articles;