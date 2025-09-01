import { Link } from "expo-router";
import { Text, View } from "react-native";
const Discussions = () => {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/(drawer)/(tabs)/discussions/1"><Text>Go to discussions Details 1</Text></Link>
      <Link href="/(drawer)/(tabs)/discussions/2"><Text>Go to discussions Details 2</Text></Link>
      <Link href="/(drawer)/(tabs)/discussions/3"><Text>Go to discussions Details 3</Text></Link>
      <Text>Discussions Page</Text>
    </View>
  )
}

export default Discussions;