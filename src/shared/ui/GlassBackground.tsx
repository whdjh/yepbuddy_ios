import {
  GlassView,
  isLiquidGlassAvailable,
} from "expo-glass-effect"
import { View } from "react-native"

import type { GlassStyle } from "expo-glass-effect"

interface GlassBackgroundProps {
  /** GlassView 스타일 */
  glassStyle?: GlassStyle
  /** Liquid Glass 미지원 환경 폴백 className */
  fallbackClassName?: string
}

const IS_GLASS = isLiquidGlassAvailable()

export function GlassBackground({
  glassStyle = "regular",
  fallbackClassName = "bg-yb-surface-muted/80",
}: GlassBackgroundProps) {
  if (IS_GLASS) {
    return (
      <GlassView
        className="absolute inset-0"
        glassEffectStyle={glassStyle}
      />
    )
  }

  return <View className={`absolute inset-0 ${fallbackClassName}`} />
}
