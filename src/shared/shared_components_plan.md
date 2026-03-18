# Shared UI 컴포넌트 구현 플랜

## Phase 0: 다크모드 시스템 설정

```tsx
// _layout.tsx
import "../global.css";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <View className={`flex-1 ${colorScheme === "dark" ? "dark" : ""}`}>
      <Slot />
    </View>
  );
}
```

---

## Phase 1: 기본 UI 컴포넌트 (외부 의존성 없음)

```
src/shared/ui/
├── Button.tsx
├── IconButton.tsx
├── Chip.tsx
├── FilterPill.tsx
├── BodyPartPill.tsx
├── Badge.tsx
├── Card.tsx
├── IconBox.tsx
├── HomeIndicator.tsx
└── index.ts
```

| 컴포넌트 | variant / props | 스펙 |
|---|---|---|
| **Button** | primary, accent, outline, ghost, danger, glass | h:52/44, r:14, px:24 |
| **IconButton** | back-square, back-round, adjust, glass | 44×44, r:12/full/10 |
| **Chip** | default, active, glass | h:44, r:22, border:1 |
| **FilterPill** | default, active | h:40, r:22, px:20. 프로틴/세션 필터용 |
| **BodyPartPill** | default, active | h:40, r:22, border:1.5. 운동 기록 부위 선택 |
| **Badge** | low, mid, high | h:28, r:full. 다크모드 투명도 배경 |
| **Card** | default, subtle | r:16/8, p:24/16, border:1, shadow:sm |
| **IconBox** | sm, md, lg, xl | 44/48/56/80, r:8/full |
| **HomeIndicator** | — | w:134, h:5, r:8. 라이트/다크 색상 분기 |

---

## Phase 2: 입력 컴포넌트

```
src/shared/ui/
├── Input.tsx
├── Textarea.tsx
├── NumberInput.tsx
├── Stepper.tsx
├── StepperRest.tsx
└── index.ts (업데이트)
```

| 컴포넌트 | 설명 | 스펙 |
|---|---|---|
| **Input** | TextInput 래핑. focus/error state | h:48, r:14, bw:1.5 |
| **Textarea** | multiline Input | min-h:160, p:16 |
| **NumberInput** | 탭→키패드. empty/filled/editing 3상태 | 72×56, r:14 |
| **Stepper** | −/값/+ 수축·이완·횟수·세트용 | label+value, btn 44×44 |
| **StepperRest** | Stepper 확장. ±10 점프 버튼 포함 | 풀 너비, 5칸 레이아웃 |

---

## Phase 3: SVG 컴포넌트 (react-native-svg 필요)

```
src/shared/ui/
├── RingProgress.tsx
├── HRChart.tsx
├── PriceChart.tsx
└── index.ts (업데이트)
```

| 컴포넌트 | variant / props | 스펙 |
|---|---|---|
| **RingProgress** | calendar(38), dashboard(90), tempo(200), countdown(240), mini(40) | stroke 가변, track+fill |
| **HRChart** | — | SVG polyline+area, 가이드선, 피크 닷, 시작/종료 마커 |
| **PriceChart** | — | SVG line+area, Y축 라벨, X축 날짜, 현재 포인트 닷 |

---

## Phase 4: 복합 레이아웃 컴포넌트

```
src/shared/ui/
├── SegmentToggle.tsx
├── PillNav.tsx
├── BottomDrawer.tsx
├── CalendarCell.tsx
└── index.ts (업데이트)
```

| 컴포넌트 | 설명 | 스펙 |
|---|---|---|
| **SegmentToggle** | 2~3옵션. active에 shadow+surface | r-outer:12, r-inner:10, h:44 |
| **PillNav** | 하단 알약 네비. tabs 배열 | fill-strong bg, active=accent, icon+label |
| **BottomDrawer** | 운동 중 하단 시트. 항상 다크 토큰 | r:20, handle+icon+timer+ring |
| **CalendarCell** | 날짜 + 미니 RingProgress + dot | min-h:44, today badge |

---

## Phase 5: 도메인 카드 컴포넌트

```
src/shared/ui/
├── SessionCard.tsx
├── ProteinCard.tsx
├── StatGrid.tsx
├── MemoCard.tsx
├── MapCard.tsx
└── index.ts (업데이트)
```

| 컴포넌트 | 사용 화면 | 스펙 |
|---|---|---|
| **SessionCard** | 세션 리스트, 이번 주 세션 | icon+부위+kcal+날짜, Card 확장 |
| **ProteinCard** | 프로틴 리스트 | name+badge+4칸 메타, Card 확장 |
| **StatGrid** | 운동 상세, 요약 | 2열 그리드, label+value(accent) |
| **MemoCard** | 운동 상세 | 다크 배경(라이트에서도), min-h:360 |
| **MapCard** | 운동 상세 | 플레이스홀더, dot+label, h:220 |

---

## 구현 순서

```
Phase 0  _layout.tsx 다크모드
   ↓
Phase 1  Button, IconButton, Chip, FilterPill, BodyPartPill, Badge, Card, IconBox, HomeIndicator
   ↓
Phase 2  Input, Textarea, NumberInput, Stepper, StepperRest
   ↓
Phase 3  RingProgress, HRChart, PriceChart
   ↓
Phase 4  SegmentToggle, PillNav, BottomDrawer, CalendarCell
   ↓
Phase 5  SessionCard, ProteinCard, StatGrid, MemoCard, MapCard
```

총 **27개** 컴포넌트. 각 Phase 완료 후 스토리북 또는 테스트 화면에서 시각 확인.