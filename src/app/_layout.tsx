import "../global.css"
import { Slot } from "expo-router"
import { useColorScheme, View } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <View className={`flex-1 ${colorScheme === "dark" ? "dark" : ""}`}>
      <Slot />
    </View>
  )
}
