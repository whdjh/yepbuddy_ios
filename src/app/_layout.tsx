import "../global.css"
import "@/shared/i18n/i18n"
import { Stack } from "expo-router"
import { useColorScheme, View } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <View className={`flex-1 ${colorScheme === "dark" ? "dark" : ""}`}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}
