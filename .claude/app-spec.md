# yepbuddy 최종 확정 명세서 v3.0

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 앱 이름 | **yepbuddy** (입에 착 붙는 헬스장 추임새) |
| 목표 | '확장형 알약 UI'와 '카멜레온 UI'를 활용해 조작을 최소화한 미니멀리즘 iOS 피트니스 앱 |
| 플랫폼 | iOS 전용 (React Native Expo / TypeScript) |
| 디자인 시스템 | Earthen UI (크림, 모래, 대지톤의 감성적인 내추럴 테마) |

---

## 2. 글로벌 UI: 알약 네비게이션

- **구조:** 화면 하단 중앙에 플로팅되는 단일 네비게이션 바.
- **기본 상태:** 현재 화면 아이콘만 표시하여 화면 점유 최소화.
- **터치 시:** `react-native-reanimated`를 통해 가로 확장, `[ 일지 | 템포 | 프로틴 ]` 선택지 노출.
- **햅틱:** 확장/축소 시 `expo-haptics` 경량 진동 피드백.

---

## 3. 메뉴별 상세 기능

### 메뉴 1: 운동 일지 (카멜레온 UI)

유저의 운동 상태를 앱이 추적하여 화면을 동적으로 전환.

#### 상태 관리

- Zustand 전역 스토어에 `phase: 'recording' | 'completed'` 필드로 운동 단계 관리.
- 앱 전체가 유저의 운동 단계를 공유.

#### 상태 A — 운동 중/전 (`phase: 'recording'`)

| 요소 | 설명 |
|------|------|
| 부위 선택 | 다중 선택 가능한 Chip 버튼 |
| 세트 조절 | 숫자 탭 → 넘버 키패드 직접 입력 (입력 확정 시 햅틱 피드백) |
| 상세 메모 | `TextInput` 자유 양식 |
| 자동 저장 | 디바운싱(1초) 후 Zustand 스토어 + AsyncStorage에 객체 형태로 자동 저장. 앱 재진입 시 즉시 복원 |
| 캘린더 등록 | 버튼 클릭 시 `[부위] 세트수` → 제목, `메모` → 일정 설명으로 애플 캘린더에 자동 등록 |
| 완료 전환 | "완료" 버튼 탭 → `phase`를 `'completed'`로 전환 |

#### 상태 B — 운동 완료 후 (`phase: 'completed'`)

- 캘린더 형태의 기록 요약 뷰. (디테일 기획 대기 중, v3.1에서 확정 예정)

#### 캘린더 퍼미션 플로우 (`expo-calendar` + `expo-linking`)

```
트리거: "캘린더 등록" 버튼 최초 탭 시
├─ undetermined → requestCalendarPermissionsAsync() → iOS 시스템 팝업
├─ granted → 일정 등록 실행
├─ denied → 커스텀 모달 표시
│   ├─ "설정으로 이동" → Linking.openSettings()
│   └─ "나중에" → 모달 닫기, 등록 스킵
└─ 재진입 시 → getCalendarPermissionsAsync()로 상태 재확인
```

> Just-in-Time 방식 채택: 앱 최초 실행이 아닌, 유저가 캘린더 기능을 처음 사용하는 시점에 권한 요청.

---

### 메뉴 2: 템포 조절기

웹의 로직을 계승하되, 모바일 최적화 시각 요소 도입.

#### 핵심 UI

- **중앙 대형 원형 프로그레스 바** (`react-native-svg` + `react-native-reanimated`)
  - 수축/이완/휴식 타이밍에 맞춰 원형 게이지가 시각적으로 차오름.
  - SVG `<Circle>`의 `strokeDashoffset`을 Reanimated로 애니메이팅.
  - 게이지 중앙에 현재 횟수(Reps)와 세트 정보 표시.

#### 입력 필드

| 항목 | 최대값 |
|------|--------|
| 수축 시간 | 10초 |
| 이완 시간 | 10초 |
| 횟수 (Reps) | 20회 |
| 세트 | 10세트 |
| 휴식 시간 | 300초 |

#### 타이머 로직

- `async/await` + `Promise` 기반 1초 단위 동기화.
- **경과 시간 기반 설계:** `Date.now()` 타임스탬프를 기준으로 계산하여 백그라운드 복귀 시 정확한 동기화 보장.

#### 오디오 피드백

- `expo-av`를 이용한 구간별 비프음(pip, pik) 및 숫자 음성 지원.

#### 백그라운드 처리

```
오디오 지속 재생
├─ expo-av: Audio.setAudioModeAsync({ staysActiveInBackground: true })
└─ app.json: "UIBackgroundModes": ["audio"]

타이머 동기화 (AppState 기반)
├─ 타이머 시작 시 → startedAt: Date.now() 를 Zustand에 저장
├─ 백그라운드 진입 → JS 스레드 suspend (타이머 정지)
├─ 포그라운드 복귀 → AppState 'active' 감지
│   └─ elapsed = Date.now() - startedAt
│   └─ syncProgressToElapsed(elapsed) 호출
│       → 현재 구간(수축/이완/휴식), 세트, 횟수 역산
│       → 프로그레스 바 + UI 즉시 동기화
└─ 결과: 유저는 화면 복귀 시 정확한 현재 상태를 확인
```

---

### 메뉴 3: 프로틴 가격 분석기

Supabase DB와 직접 연동하여 실시간 프로틴 정보 제공.

#### 데이터 아키텍처

- **데이터 원본:** 별도 크론 프로젝트에서 5분 주기로 프로틴 가격 추적 및 Supabase DB 갱신.
- **앱 역할:** 읽기 전용(read-only) 클라이언트. `@supabase/supabase-js`로 직접 조회.
- **보안:** Supabase RLS(Row Level Security) 활성화, `anon` 키에 `SELECT`만 허용.

#### 기능

| 요소 | 설명 |
|------|------|
| 필터 | 카테고리 필터 (WPC, WPI 등) |
| 검색 | 제품명 검색 |
| 상세 정보 | 제품 상세 + g당 가격 계산 결과 표시 |

#### 가격 뱃지 로직

최근 180일 가격 데이터를 기반으로 백분위(Percentile) 계산:

| 뱃지 | 조건 | 색상 |
|------|------|------|
| 저점 | 하위 20% 이하 | Green |
| 중간 | 평균 범위 | Blue |
| 고점 | 상위 20% 이상 | Red |

#### 데이터 페칭 전략

```typescript
useQuery({
  queryKey: ['proteins', category, search],
  queryFn: fetchProteins,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  retry: 3,
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
});
```

#### 예정 기능 (v3.1+)

- 인스타용 오운완 카드 생성 및 공유 기능.

---

## 4. 기술 스택 및 라이브러리

### 코어

| 역할 | 라이브러리 |
|------|-----------|
| 애니메이션 | `react-native-reanimated` |
| 상태 관리 | `Zustand` + `AsyncStorage` |
| 데이터 페칭 | `@tanstack/react-query` |
| 오디오 | `expo-av` |
| 네비게이션 | `expo-router` |

### 신규 추가 (v3)

| 역할 | 라이브러리 |
|------|-----------|
| 캘린더 연동 | `expo-calendar` |
| 설정 앱 유도 | `expo-linking` |
| SVG 렌더링 | `react-native-svg` (원형 프로그레스 바) |
| DB 클라이언트 | `@supabase/supabase-js` |
| 날짜 처리 | `dayjs` |
| 햅틱 피드백 | `expo-haptics` |

---

## 5. 미확정 사항 (v3.1에서 확정 예정)

| 항목 | 상태 |
|------|------|
| 상태 B 캘린더 요약 뷰 디테일 기획 | 대기 중 |
| 인스타 오운완 카드 공유 기능 | 예정 |

---

*문서 버전: v3.0 | 최종 업데이트: 2026-03-15*
