Shared UI 컴포넌트 구현 플랜

Phase 0: 다크모드 시스템 설정

현재 tailwind.config.js에 darkMode: 'class'로 설정되어 있고, global.css에 :root(Light) / .dark(Dark) CSS 변수가 정의되어 있다.

사용자 핸드폰 설정에 따라 자동 전환되려면:





layout.tsx: useColorScheme으로 시스템 설정 감지 후 NativeWind에 전달



NativeWind v4는 darkMode: 'class' + 시스템 감지를 자동으로 처리하지만, _layout.tsx에서 최상위 View에 dark class 바인딩 필요

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



Phase 1: 기본 UI 컴포넌트 (외부 의존성 없음)

FSD 규칙에 따라 모든 UI 컴포넌트는 src/shared/ui/에 배치. 도메인 무관 순수 UI.

파일 구조

src/shared/
├── ui/
│   ├── Button.tsx         ── 5가지 variant: primary, accent, outline, ghost, danger
│   ├── IconButton.tsx     ── back(뒤로가기), adjust(+/-) 2가지
│   ├── Chip.tsx           ── default/active 토글
│   ├── Badge.tsx          ── low(green), mid(blue), high(red)
│   ├── Card.tsx           ── outer/inner 구분, 2:1 radius rule
│   └── index.ts           ── Public API
└── index.ts

컴포넌트별 스펙 (HTML 기준)





Button: h:52(md)/44(sm), r:14, px:24. variant prop으로 스타일 분기



IconButton: 44x44, r:12(back)/10(adjust). children으로 아이콘 전달



Chip: h:44, r:22, border:1.5. active prop으로 토글



Badge: h:28, r:pill. level prop (low/mid/high)



Card: r-outer:16, r-inner:8, p:24, border:1, shadow:sm. variant prop (default/subtle)



Phase 2: 입력 컴포넌트

src/shared/ui/
├── Input.tsx              ── h:48, r:14, bw:1.5. focus 시 accent border
├── Textarea.tsx           ── Input 확장, min-h:120
├── NumberInput.tsx         ── 100x56, 3상태(empty/filled/editing), 탭 시 키패드
└── index.ts               ── (업데이트)





Input: TextInput 래핑. focus/error state 지원



Textarea: multiline Input. min-height:120



NumberInput: Pressable 기반. empty(disabled색)/filled(accent색)/editing(accent border+ring) 3상태



Phase 3: 복합 컴포넌트 (react-native-svg 등 필요)

src/shared/ui/
├── RingProgress.tsx       ── SVG Circle 기반 원형 프로그레스. size: cal(38)/dash(90)/tempo(200)
├── SegmentToggle.tsx      ── r-outer:12, r-inner:10, h:44. options 배열로 유연하게
├── IconBox.tsx            ── sm(44)/md(48)/lg(56). border=bg색으로 seamless blend
├── PillNav.tsx            ── always expanded 알약 네비. tabs 배열 기반
├── CalendarCell.tsx       ── 날짜 + 미니 RingProgress(38px) + dot
├── BottomDrawer.tsx       ── r:20, dark-only UI. handle + 버튼 영역
└── index.ts               ── (업데이트)





RingProgress: react-native-svg 필수. stroke-dashoffset 기반 progress



SegmentToggle: 2~3개 옵션, active에 shadow+surface 배경



PillNav: 하단 플로팅, fill-strong 배경, active tab에 accent 배경



BottomDrawer: 항상 dark 토큰 하드코딩 (명세서 규칙)



구현 순서 요약

Phase 0  _layout.tsx 다크모드 설정
   ↓
Phase 1  Button, IconButton, Chip, Badge, Card
   ↓
Phase 2  Input, Textarea, NumberInput
   ↓
Phase 3  RingProgress, SegmentToggle, IconBox, PillNav, CalendarCell, BottomDrawer

각 Phase 완료 후 index.tsx에서 컴포넌트를 렌더링하여 시각 확인.