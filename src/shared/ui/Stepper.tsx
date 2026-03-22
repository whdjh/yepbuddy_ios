import { Pressable, Text, View, type ViewProps } from "react-native"

interface StepperProps extends Omit<ViewProps, "children"> {
  label: string
  value: number
  unit: string
  min?: number
  max?: number
  onDecrement?: () => void
  onIncrement?: () => void
  jumpStep?: number
  onJumpDown?: () => void
  onJumpUp?: () => void
}

export function Stepper({
  label,
  value,
  unit,
  min,
  max,
  onDecrement,
  onIncrement,
  jumpStep,
  onJumpDown,
  onJumpUp,
  className,
  ...rest
}: StepperProps) {
  const hasJump = jumpStep != null
  const atMin = min != null && value <= min
  const atMax = max != null && value >= max

  return (
    <View
      className={`flex-row items-center justify-between p-[14px] rounded-yb-lg bg-yb-surface border border-yb-border gap-yb-2${hasJump ? " px-yb-5" : ""}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {hasJump && (
        <Pressable
          className={`w-[44px] h-[44px] rounded-yb-icon bg-yb-surface-muted items-center justify-center${atMin ? " opacity-30" : ""}`}
          onPress={onJumpDown}
          disabled={atMin}
        >
          <Text className="text-[13px] font-bold text-yb-fg-secondary">−{jumpStep}</Text>
        </Pressable>
      )}
      <Pressable
        className={`w-[44px] h-[44px] rounded-yb-icon bg-yb-surface-muted items-center justify-center${atMin ? " opacity-30" : ""}`}
        onPress={onDecrement}
        disabled={atMin}
      >
        <Text className="text-[20px] font-semibold text-yb-fg">−</Text>
      </Pressable>
      <View className={`flex-1 items-center${hasJump ? " min-w-[80px]" : ""}`}>
        <Text className="text-yb-caption text-yb-fg-secondary">{label}</Text>
        <Text className="text-[24px] font-bold text-yb-fg mt-[2px]">
          {value}
          <Text className="text-yb-body-sm font-medium text-yb-fg-secondary">{unit}</Text>
        </Text>
      </View>
      <Pressable
        className={`w-[44px] h-[44px] rounded-yb-icon bg-yb-surface-muted items-center justify-center${atMax ? " opacity-30" : ""}`}
        onPress={onIncrement}
        disabled={atMax}
      >
        <Text className="text-[20px] font-semibold text-yb-fg">+</Text>
      </Pressable>
      {hasJump && (
        <Pressable
          className={`w-[44px] h-[44px] rounded-yb-icon bg-yb-surface-muted items-center justify-center${atMax ? " opacity-30" : ""}`}
          onPress={onJumpUp}
          disabled={atMax}
        >
          <Text className="text-[13px] font-bold text-yb-fg-secondary">+{jumpStep}</Text>
        </Pressable>
      )}
    </View>
  )
}
