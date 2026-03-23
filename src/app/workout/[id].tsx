import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function WorkoutResultPage() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="h-full w-full bg-yb-bg items-center justify-center">
      <Text className="text-yb-fg text-yb-body-lg">운동 결과 (세션 {id})</Text>
    </View>
  )
}
