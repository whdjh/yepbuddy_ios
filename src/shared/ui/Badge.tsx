import { Text, View } from "react-native";

type BadgeLevel = "low" | "mid" | "high"

const badgeStyles: Record<BadgeLevel, { container: string; text: string }> = {
  low: {
    container: "bg-success-50 dark:bg-success-400/15",
    text:      "text-success-700 dark:text-success-400",
  },
  mid: {
    container: "bg-info-50 dark:bg-info-400/15",
    text:      "text-info-700 dark:text-info-400",
  },
  high: {
    container: "bg-error-50 dark:bg-error-600/15",
    text:      "text-error-700 dark:text-error-600",
  },
}

interface BadgeProps {
  /** 배지 레벨 */
  level: BadgeLevel
  /** 배지 라벨 */
  label: string
}

export function Badge({ level, label }: BadgeProps) {
  return (
    <View
      className={`h-[28px] justify-center px-yb-3 rounded-full ${badgeStyles[level].container}`}
    >
      <Text
        className={`text-yb-caption font-semibold ${badgeStyles[level].text}`}
      >
        {label}
      </Text>
    </View>
  )
}