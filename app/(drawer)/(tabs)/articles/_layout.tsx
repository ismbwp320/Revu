import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerLeft: () => <DrawerToggleButton />, title: "Articles" }} />
    </Stack>
  )
}

export default Layout;