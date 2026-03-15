import { Pressable, Text, type PressableProps } from "react-native"

type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "danger"

interface ButtonProps extends Omit<PressableProps, "children"> {
  /** 버튼 변형 */
  variant?: ButtonVariant
  /** 버튼 라벨 */
  label: string
}

const containerStyles: Record<ButtonVariant, string> = {
  primary:
    "h-yb-btn-md rounded-yb-lg bg-yb-fill-strong px-yb-6 items-center justify-center",
  accent:
    "h-yb-btn-md rounded-yb-lg bg-yb-accent px-yb-6 items-center justify-center",
  outline:
    "h-yb-btn-md rounded-yb-lg border-yb-input border-yb-accent px-yb-6 items-center justify-center bg-transparent",
  ghost:
    "h-yb-btn-sm rounded-yb-md px-yb-4 items-center justify-center bg-transparent",
  danger:
    "h-yb-btn-md rounded-yb-lg bg-error-500 px-yb-6 items-center justify-center",
}

const labelStyles: Record<ButtonVariant, string> = {
  primary: "text-yb-on-strong text-yb-body-lg",
  accent: "text-yb-on-accent text-yb-body-lg",
  outline: "text-yb-accent text-yb-body-md font-medium",
  ghost: "text-yb-fg-secondary text-yb-body-sm",
  danger: "text-white text-yb-body-lg",
}

export function Button({ variant = "primary", label, ...rest }: ButtonProps) {
  return (
    <Pressable
      className={`${containerStyles[variant]} active:opacity-80`}
      {...rest}
    >
      <Text className={labelStyles[variant]}>{label}</Text>
    </Pressable>
  )
}
