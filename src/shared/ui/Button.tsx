import { Pressable, Text, View, type PressableProps } from "react-native"
import {
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect"

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger" | "glass"

interface ButtonProps extends Omit<PressableProps, "children"> {
  /** 버튼 변형 */
  variant?: ButtonVariant
  /** 버튼 라벨 */
  label: string
  className?: string
}

const containerStyles: Record<ButtonVariant, string> = {
  primary:
    "h-yb-btn-md rounded-yb-lg bg-yb-fill-strong px-yb-6 items-center justify-center active:opacity-80",
  accent:
    "h-yb-btn-md rounded-yb-lg bg-yb-accent px-yb-6 items-center justify-center active:opacity-80",
  outline:
    "h-yb-btn-md rounded-yb-lg border-yb-input border-yb-accent px-yb-6 items-center justify-center bg-transparent active:opacity-80",
  ghost:
    "h-yb-btn-sm rounded-yb-md px-yb-6 items-center justify-center bg-transparent active:opacity-80",
  danger:
    "h-yb-btn-md rounded-yb-lg bg-yb-status-error px-yb-6 items-center justify-center active:opacity-80",
  glass:
    "h-yb-btn-md rounded-yb-lg px-yb-6 items-center justify-center",
}

const labelStyles: Record<ButtonVariant, string> = {
  primary: "text-yb-on-strong text-yb-body-lg font-semibold",
  accent:  "text-yb-on-accent text-yb-body-lg font-semibold",
  outline: "text-yb-accent text-yb-body-lg font-semibold",
  ghost:   "text-yb-fg-secondary text-yb-body-sm font-medium",
  danger:  "text-white text-yb-body-lg font-semibold",
  glass:   "text-yb-fg text-yb-body-lg font-semibold",
}

const IS_GLASS = isLiquidGlassAvailable()

export function Button({ variant = "primary", label, className, disabled, ...rest }: ButtonProps) {
  if (variant === "glass" && IS_GLASS) {
    return (
      <GlassView
        className={`${containerStyles.glass} ${className ?? ""}`}
        glassEffectStyle={disabled ? "none" : "regular"}
        tintColor="#9B7E56"
        isInteractive
      >
        <Text className={`${labelStyles.glass} ${disabled ? "opacity-40" : ""}`}>{label}</Text>
      </GlassView>
    )
  }

  return (
    <Pressable
      className={`${containerStyles[variant]} ${disabled ? "opacity-40" : ""} ${className ?? ""}`}
      disabled={disabled}
      {...rest}
    >
      {variant === "glass" && (
        <View className="absolute inset-0 bg-yb-surface-muted/80 rounded-yb-lg" />
      )}
      <Text className={labelStyles[variant]}>{label}</Text>
    </Pressable>
  )
}