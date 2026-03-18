import { Pressable, Text, type PressableProps } from "react-native"
import { GlassBackground } from "./GlassBackground"

type ChipVariant = "default" | "active" | "glass"

interface ChipProps extends Omit<PressableProps, "children"> {
  /** 칩 변형 */
  variant?: ChipVariant
  /** 칩 라벨 */
  label: string
}

const containerStyles: Record<ChipVariant, string> = {
  default:
    "h-yb-chip rounded-yb-chip border border-yb-border bg-yb-fill-pale px-yb-6 items-center justify-center",
  active:
    "h-yb-chip rounded-yb-chip border border-yb-accent bg-yb-accent px-yb-6 items-center justify-center",
  glass:
    "h-yb-chip rounded-yb-chip px-yb-6 items-center justify-center overflow-hidden active:scale-[0.97]",
}

const labelStyles: Record<ChipVariant, string> = {
  default: "text-yb-fg text-yb-body-sm font-medium",
  active:  "text-yb-on-accent text-yb-body-sm font-medium",
  glass:   "text-yb-fg text-yb-body-sm font-medium",
}

export function Chip({ variant = "default", label, ...rest }: ChipProps) {
  return (
    <Pressable className={containerStyles[variant]} {...rest}>
      {variant === "glass" && <GlassBackground glassStyle="clear" />}
      <Text className={labelStyles[variant]}>{label}</Text>
    </Pressable>
  )
}