import { Pressable, Text, type PressableProps } from "react-native"
import { GlassBackground } from "./GlassBackground"

type ChipVariant = "default" | "active" | "glass"
type FilterPillVariant = "default" | "active"
type BodyPartPillVariant = "default" | "active"

interface ChipProps extends Omit<PressableProps, "children"> {
  variant?: ChipVariant
  label: string
}

interface FilterPillProps extends Omit<PressableProps, "children"> {
  variant?: FilterPillVariant
  label: string
}

interface BodyPartPillProps extends Omit<PressableProps, "children"> {
  variant?: BodyPartPillVariant
  label: string
}

/* Chip */

const chipContainer: Record<ChipVariant, string> = {
  default:
    "h-yb-chip rounded-yb-chip border border-yb-border bg-yb-fill-pale px-yb-6 items-center justify-center",
  active:
    "h-yb-chip rounded-yb-chip border border-yb-accent bg-yb-accent px-yb-6 items-center justify-center",
  glass:
    "h-yb-chip rounded-yb-chip px-yb-6 items-center justify-center overflow-hidden active:scale-[0.97]",
}

const chipLabel: Record<ChipVariant, string> = {
  default: "text-yb-fg text-yb-body-sm font-medium",
  active:  "text-yb-on-accent text-yb-body-sm font-medium",
  glass:   "text-yb-fg text-yb-body-sm font-medium",
}

export function Chip({ variant = "default", label, ...rest }: ChipProps) {
  return (
    <Pressable className={chipContainer[variant]} {...rest}>
      {variant === "glass" && <GlassBackground glassStyle="clear" />}
      <Text className={chipLabel[variant]}>{label}</Text>
    </Pressable>
  )
}

/* FilterPill */

const filterPillContainer: Record<FilterPillVariant, string> = {
  default:
    "h-[40px] rounded-yb-chip bg-yb-fill-pale px-yb-5 items-center justify-center",
  active:
    "h-[40px] rounded-yb-chip bg-yb-accent px-yb-5 items-center justify-center",
}

const filterPillLabel: Record<FilterPillVariant, string> = {
  default: "text-yb-fg-secondary text-yb-body-sm font-semibold",
  active:  "text-yb-on-accent text-yb-body-sm font-semibold",
}

export function FilterPill({ variant = "default", label, ...rest }: FilterPillProps) {
  return (
    <Pressable className={filterPillContainer[variant]} {...rest}>
      <Text className={filterPillLabel[variant]}>{label}</Text>
    </Pressable>
  )
}

/* BodyPartPill */

const bodyPartPillContainer: Record<BodyPartPillVariant, string> = {
  default:
    "h-[40px] rounded-yb-chip border-[1.5px] border-yb-border bg-transparent px-yb-5 items-center justify-center",
  active:
    "h-[40px] rounded-yb-chip border-[1.5px] border-yb-fill-strong bg-yb-fill-strong px-yb-5 items-center justify-center",
}

const bodyPartPillLabel: Record<BodyPartPillVariant, string> = {
  default: "text-yb-fg text-yb-body-sm font-semibold",
  active:  "text-yb-on-strong text-yb-body-sm font-semibold",
}

export function BodyPartPill({ variant = "default", label, ...rest }: BodyPartPillProps) {
  return (
    <Pressable className={bodyPartPillContainer[variant]} {...rest}>
      <Text className={bodyPartPillLabel[variant]}>{label}</Text>
    </Pressable>
  )
}
