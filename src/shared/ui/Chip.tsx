import { Text, Pressable, type PressableProps } from "react-native"

type ChipVariant = "default" | "active"

interface ChipProps extends Omit<PressableProps, "children"> {
  /** 칩 변형 */
  variant?: ChipVariant
  /** 칩 라벨 */
  label: string
}

const containerStyles: Record<ChipVariant, string> = {
  default: "h-yb-chip rounded-yb-chip border-yb-input border-yb-border px-yb-6 items-center justify-center",
  active: "h-yb-chip rounded-yb-chip border-yb-input border-yb-accent px-yb-6 items-center justify-center bg-yb-accent",
}

const labelStyles: Record<ChipVariant, string> = {
  default: "text-yb-fg text-yb-body-sm",
  active: "text-yb-on-accent text-yb-body-sm",
}

export function Chip({ variant = "default", label, ...rest }: ChipProps) {
  return (
    <Pressable className={`${containerStyles[variant]}`} {...rest}>
      <Text className={`${labelStyles[variant]}`}>{label}</Text>
    </Pressable>
  )
}