import type { ReactNode } from "react"
import { Pressable, type PressableProps } from "react-native"
import { GlassBackground } from "./GlassBackground"

type IconButtonVariant = "back" | "adjust" | "glass"

interface IconButtonProps extends Omit<PressableProps, "children"> {
  /** 아이콘 버튼 변형 */
  variant?: IconButtonVariant
  /** 아이콘 버튼 자식 요소 */
  children: ReactNode
}

const variantStyles: Record<IconButtonVariant, string> = {
  back: "w-yb-icon-sm h-yb-touch rounded-yb-icon bg-yb-surface-muted items-center justify-center active:opacity-80",
  adjust: "w-yb-icon-sm h-yb-touch rounded-yb-md bg-yb-fill-pale border-yb border-yb-border items-center justify-center active:opacity-80",
  glass: "w-yb-icon-sm h-yb-touch rounded-yb-icon items-center justify-center overflow-hidden active:scale-[0.95]",
}

export function IconButton({ variant = "back", children, ...rest }: IconButtonProps) {
  return (
    <Pressable className={variantStyles[variant]} {...rest}>
      {variant === "glass" && <GlassBackground />}
      {children}
    </Pressable>
  )
}