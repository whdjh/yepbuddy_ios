import { View, type ViewProps } from "react-native"

type CardVariant = "default" | "subtle"

interface CardProps extends ViewProps {
  variant?: CardVariant
}

const containerStyles: Record<CardVariant, string> = {
  default:
    "rounded-yb-xl p-yb-6 bg-yb-surface border border-yb-border shadow-sm",
  subtle:
    "rounded-yb-md p-yb-4 bg-yb-surface-subtle border border-yb-border",
}

export function Card({ variant = "default", className, children, ...rest }: CardProps) {
  return (
    <View className={`${containerStyles[variant]}${className ? ` ${className}` : ""}`} {...rest}>
      {children}
    </View>
  )
}
