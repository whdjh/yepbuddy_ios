import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { GlassTextarea } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Stepper } from "@/shared/ui/Stepper"
import { BodyPartPill } from "@/shared/ui/Chip"
import { Host, ScrollView as SwiftScrollView, HStack } from "@expo/ui/swift-ui"

const BODY_PART_KEYS = ["chest", "back", "legs", "shoulders", "arms", "core"] as const

export function RecordWorkoutForm() {
  const router = useRouter()
  const { t } = useTranslation()

  const [selectedParts, setSelectedParts] = useState<Record<string, number>>({})
  const [memo, setMemo] = useState("")

  const togglePart = (key: string) => {
    setSelectedParts((prev) => {
      const next = { ...prev }
      if (key in next) {
        delete next[key]
      } else {
        next[key] = 4
      }
      return next
    })
  }

  const updateSets = (key: string, value: number) => {
    setSelectedParts((prev) => ({ ...prev, [key]: value }))
  }

  const partKeys = Object.keys(selectedParts)
  const canStart = partKeys.length > 0 && partKeys.every((k) => selectedParts[k] > 0)

  return (
    <ScrollView className="bg-yb-bg" contentInsetAdjustmentBehavior="automatic">
      {/* 운동 부위 선택 */}
      <View className="px-yb-5 mt-yb-8">
        <Text className="text-yb-fg font-bold text-yb-body-lg mb-yb-3">{t("workout.record.bodyPart")}</Text>
        <Host style={{ height: 44 }}>
          <SwiftScrollView axes="horizontal" showsIndicators={false}>
            <HStack spacing={10}>
              {BODY_PART_KEYS.map((key) => (
                <BodyPartPill
                  key={key}
                  variant={key in selectedParts ? "active" : "default"}
                  label={t(`workout.bodyParts.${key}`)}
                  onPress={() => togglePart(key)}
                />
              ))}
            </HStack>
          </SwiftScrollView>
        </Host>
      </View>

      {/* 부위별 세트수 */}
      {partKeys.map((key) => (
        <View key={key} className="px-yb-5 mt-yb-5">
          <Text className="text-yb-fg font-bold text-yb-body-md mb-yb-2">
            {t(`workout.bodyParts.${key}`)}
          </Text>
          <Stepper
            variant="glass"
            label={t("workout.record.setsUnit")}
            value={selectedParts[key]}
            unit={t("workout.record.setsUnit")}
            min={1}
            onDecrement={() => updateSets(key, selectedParts[key] - 1)}
            onIncrement={() => updateSets(key, selectedParts[key] + 1)}
          />
        </View>
      ))}

      {/* 메모 입력 */}
      <View className="px-yb-5 mt-yb-8">
        <Text className="text-yb-fg font-bold text-yb-body-lg mb-yb-3">{t("workout.record.memo")}</Text>
        <GlassTextarea
          placeholder={t("workout.record.memoPlaceholder")}
          defaultValue={memo}
          onChangeText={setMemo}
        />
      </View>

      {/* 운동 시작 버튼 */}
      <View className="px-yb-5 mt-yb-10 pb-yb-10">
        <Button
          variant="glass"
          label={t("workout.record.startWorkout")}
          disabled={!canStart}
          onPress={() => router.push("/workout/active")}
        />
      </View>
    </ScrollView>
  )
}
