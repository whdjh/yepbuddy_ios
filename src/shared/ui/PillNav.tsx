import { Pressable, Text, View, type ViewProps } from "react-native"
import { GlassBackground } from "./GlassBackground"

interface PillNavItem {
  label: string
  icon: React.ReactNode
}

interface PillNavProps extends Omit<ViewProps, "children"> {
  items: PillNavItem[]
  activeIndex: number
  onChangeIndex?: (index: number) => void
  glass?: boolean
}

export function PillNav({
  items,
  activeIndex,
  onChangeIndex,
  glass = false,
  className,
  ...rest
}: PillNavProps) {
  return (
    <View
      className={`flex-row items-center rounded-full p-[6px] overflow-hidden${glass ? "" : " bg-yb-fill-strong"}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {glass && <GlassBackground />}
      {items.map((item, i) => {
        const isActive = i === activeIndex
        return (
          <Pressable
            key={i}
            className={`flex-1 items-center gap-[3px] rounded-[16px] py-[10px] min-h-[52px] justify-center${isActive ? " bg-yb-accent" : ""}`}
            onPress={() => onChangeIndex?.(i)}
          >
            <View className="w-[20px] h-[20px] items-center justify-center opacity-70" style={isActive ? { opacity: 1 } : undefined}>
              {item.icon}
            </View>
            <Text
              className={`text-[11px] font-semibold${isActive ? " text-yb-on-accent opacity-100" : " text-yb-on-strong opacity-70"}`}
            >
              {item.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
