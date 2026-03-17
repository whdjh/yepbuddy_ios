import { Pressable, Text, type PressableProps } from "react-native"
import { GlassBackground } from "./GlassBackground"

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger" | "glass"

interface ButtonProps extends Omit<PressableProps, "children"> {
  /** 버튼 변형 */
  variant?: ButtonVariant
  /** 버튼 라벨 */
  label: string
}

const containerStyles: Record<ButtonVariant, string> = {
  primary:
    "h-yb-btn-md rounded-yb-lg bg-yb-fill-strong px-yb-6 items-center justify-center active:opacity-80",
  accent:
    "h-yb-btn-md rounded-yb-lg bg-yb-accent px-yb-6 items-center justify-center active:opacity-80",
  outline:
    "h-yb-btn-md rounded-yb-lg border-yb-input border-yb-accent px-yb-6 items-center justify-center bg-transparent active:opacity-80",
  ghost:
    "h-yb-btn-sm rounded-yb-md px-yb-4 items-center justify-center bg-transparent active:opacity-80",
  danger:
    "h-yb-btn-md rounded-yb-lg bg-error-500 px-yb-6 items-center justify-center active:opacity-80",
  glass:
    "h-yb-btn-md rounded-yb-lg px-yb-6 items-center justify-center overflow-hidden active:scale-[0.98]",
}

const labelStyles: Record<ButtonVariant, string> = {
  primary: "text-yb-on-strong text-yb-body-lg",
  accent: "text-yb-on-accent text-yb-body-lg",
  outline: "text-yb-accent text-yb-body-md font-medium",
  ghost: "text-yb-fg-secondary text-yb-body-sm",
  danger: "text-white text-yb-body-lg",
  glass: "text-yb-fg text-yb-body-lg",
}

export function Button({ variant = "primary", label, ...rest }: ButtonProps) {
  return (
    <Pressable className={containerStyles[variant]} {...rest}>
      {variant === "glass" && <GlassBackground />}
      <Text className={labelStyles[variant]}>{label}</Text>
    </Pressable>
  )
}
