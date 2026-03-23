import { PillNav } from "@/shared/ui/PillNav"

export default function TabLayout() {
  return (
    <PillNav tintColor="#D4883A">
      <PillNav.Item name="index">
        <PillNav.Item.Icon sf="book.fill" />
        <PillNav.Item.Label>일지</PillNav.Item.Label>
      </PillNav.Item>
      <PillNav.Item name="tempo">
        <PillNav.Item.Icon sf="timer" />
        <PillNav.Item.Label>템포</PillNav.Item.Label>
      </PillNav.Item>
      <PillNav.Item name="protein">
        <PillNav.Item.Icon sf="waterbottle.fill" />
        <PillNav.Item.Label>프로틴</PillNav.Item.Label>
      </PillNav.Item>
    </PillNav>
  )
}
