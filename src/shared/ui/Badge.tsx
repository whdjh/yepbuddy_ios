import { View, Text } from "react-native"

type BadgeLevel = "low" | "mid" | "high"

const badgeStyles: Record<BadgeLevel, { container: string; text: string }> = {
  low:  { container: "bg-success-50", text: "text-success-700" },
  mid:  { container: "bg-info-50",    text: "text-info-700" },
  high: { container: "bg-error-50",   text: "text-error-700" },
}

interface BadgeProps {
  /** 배지 레벨 */
  level: BadgeLevel
  /** 배지 라벨 */
  label: string
}

export function Badge({ level, label}: BadgeProps) {
  return (
    <View className={`px-yb-3 py-[4px] rounded-full ${badgeStyles[level].container}`}
    >
      <Text className={`text-yb-caption font-semibold ${badgeStyles[level].text}`}>
        {label}
      </Text>
    </View>
  )
}