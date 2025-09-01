import { Drawer } from "expo-router/drawer";
const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
      <Drawer.Screen name="support" options={{ headerShown: true, title: "Support" }} />
    </Drawer>
  )
}

export default Layout;