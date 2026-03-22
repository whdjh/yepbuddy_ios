import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function ProteinDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="flex-1 bg-yb-bg items-center justify-center">
      <Text className="text-yb-fg text-yb-body-lg">프로틴 상세 ({id})</Text>
    </View>
  )
}
