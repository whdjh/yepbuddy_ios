import { NativeTabs } from "expo-router/unstable-native-tabs"
import type { ComponentProps } from "react"

type NativeTabsProps = ComponentProps<typeof NativeTabs>
type TriggerProps = ComponentProps<typeof NativeTabs.Trigger>
type IconProps = ComponentProps<typeof NativeTabs.Trigger.Icon>
type LabelProps = ComponentProps<typeof NativeTabs.Trigger.Label>

type PillNavProps = NativeTabsProps
type PillNavItemProps = TriggerProps
type PillNavIconProps = IconProps
type PillNavLabelProps = LabelProps

function PillNavItem(props: PillNavItemProps) {
  return <NativeTabs.Trigger {...props} />
}

function PillNavIcon(props: PillNavIconProps) {
  return <NativeTabs.Trigger.Icon {...props} />
}

function PillNavLabel(props: PillNavLabelProps) {
  return <NativeTabs.Trigger.Label {...props} />
}

PillNavItem.Icon = PillNavIcon
PillNavItem.Label = PillNavLabel

export function PillNav(props: PillNavProps) {
  return <NativeTabs {...props} />
}

PillNav.Item = PillNavItem
