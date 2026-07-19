# Nova Land - 제작 로드맵

## 제작 원칙

- `project.md`를 기능, 문구와 상태 규칙의 기준 문서로 사용합니다.
- 완성된 화면 PNG는 비주얼 참고용으로만 사용하고 구현 원본으로 사용하지 않습니다.
- 배경, EVE와 프로필처럼 이미지가 필요한 요소만 독립 자산으로 제작합니다.
- 패널, 버튼, 텍스트, 테두리, Glow, Progress Bar와 Badge는 HTML/CSS로 구현합니다.
- 아이콘은 SVG Sprite로 관리합니다.
- 기존 `index.html`, CSS와 JavaScript 파일은 삭제하지 않고 같은 경로에서 새 구조로 재작성합니다.
- 기술 기반은 HTML, CSS와 JavaScript ES Module을 사용하며 프레임워크는 도입하지 않습니다.
- 각 Phase는 구현, 기능 검증, 반응형 기본 확인과 Git diff 검수를 마친 뒤 완료 처리합니다.

---

## Phase 1. 구현 자산 목록 정리

상태: 완료

### 작업

- MAP과 Control Room의 배경 자산 구분
- 공통 EVE, Explorer 프로필, 로고 심볼과 시설 썸네일 정의
- 코드로 구현할 UI와 이미지로 제작할 요소 구분
- 자산 폴더와 파일명 계획 수립
- 기존 완성 PNG를 참고 시안으로 분류


### 완료 조건

- 필요한 자산의 수량, 역할, 우선순위와 파일 경로가 `project.md`에 기록되어 있어야 합니다.

---

## Phase 2. MAP 필수 자산 제작

상태: 완료

### 제작 자산

- UI와 텍스트가 없는 MAP 배경
- Blue 컬러의 공통 EVE 홀로그램
- Explorer 프로필
- Nova Land 심볼
- Nova, Luna, Spark와 Wonder 시설 썸네일


### 제작 기준

- 배경에 패널, 버튼, 카드와 문구를 포함하지 않습니다.
- 실제 구현 위치에서 잘리지 않도록 충분한 여백을 확보합니다.
- 투명 자산은 가장자리 Halo와 배경색 잔여 여부를 확인합니다.
- 원본 PNG 또는 WebP를 보관하고 용도에 맞게 최적화합니다.
- 전체 화면 시안을 새로 만들지 않고 독립 자산만 제작합니다.


### 완료 조건

- 모든 MAP 필수 자산이 `assets`의 확정 경로에 저장되어야 합니다.
- MAP 배경은 1920 × 1080을 기준으로 하고, 투명 자산은 투명도와 선명도 검수를 통과해야 합니다.

---

## Phase 3. 프로젝트 기반과 공통 UI

상태: 완료

### 구조

- `index.html`의 `<head>`, CSS·JavaScript 연결과 `#app` 유지
- 기존 MAP 본문을 최신 기획 기준으로 재작성
- 화면 전환을 위한 공통 Screen 구조 정의
- 시설, 상태, 문구와 언어 데이터를 JavaScript Module로 분리


### 스타일

- 색상, 간격, 크기, Z-index, Motion과 시설 컬러를 CSS 변수로 정의
- 공통 Panel, Button, Card, Badge, Toast와 Overlay 구조 작성
- SVG Sprite 구축
- 기본 Focus와 Hover 상태 정의


### 완료 조건

- 임시 배경에서도 공통 컴포넌트가 독립적으로 표시되어야 합니다.
- Undefined CSS 변수와 중복 컴포넌트가 없어야 합니다.

---

## Phase 4. MAP PC 구현

상태: 완료

### 화면

- Top Navigation
- Mission List
- World Map와 시설 Card
- 짧은 대화형 EVE Panel
- Recent Log
- Setting 진입 버튼
- 4단계 Mission Progress Bar


### 인터랙션

- 시설 선택과 선택 상태 동기화
- 잠금, 선택 가능, 완료와 봉인 상태 표시
- 선택 시설 Glow 강조
- Mission List와 World Map Card 연동
- EVE 메시지 갱신
- Control Room 진입


### 제외 항목

- World Status와 Bottom Status
- MAP에서 Mission 직접 시작


### 완료 조건

- PC에서 시설 선택, 잠금 안내와 Control Room 진입 흐름이 동작해야 합니다.
- MAP 배경과 UI가 독립 레이어로 유지되어야 합니다.

---

## Phase 5. 공통 시스템

상태: 예정

### Explorer

- Explorer 등록과 이름 변경
- Explorer 프로필 표시
- Explorer Log
- Explorer Passport


### Setting

- 한국어와 영어 전환
- BGM과 효과음 조절
- Day, Sunset과 Night 변경
- 처음부터 다시 시작


### 상태 저장

- Explorer 정보
- 시설 잠금과 완료 상태
- Mission 진행 상태
- 언어, 시간과 사운드 설정
- Recent Log


### 완료 조건

- 새로고침 후 저장 상태가 복원되어야 합니다.
- 언어 변경이 공통 UI와 안내 문구에 즉시 반영되어야 합니다.

---

## Phase 6. Nova Coaster와 공통 Mission Flow

상태: 예정

### 자산

- UI와 텍스트가 없는 Nova Coaster Control Room 배경
- Purple 컬러 EVE 적용


### 공통 Control Room

- 시설 정보
- EVE Panel
- Mission Objective
- 시설 상태 Panel
- MISSION START
- MAP과 Setting 버튼


### 공통 Mission Flow

- Mission Guide
- Countdown
- Play
- Pause
- Fail
- Complete
- Control Room 복귀와 진행 상태 복원


### Nova Coaster Mission

- 필수 레일 연결
- 시스템 점검
- 열차 운행 테스트
- 안전 도착 판정


### 완료 조건

- MAP 진입부터 Nova Coaster 완료와 MAP 상태 갱신까지 하나의 흐름으로 동작해야 합니다.
- 공통 Mission Flow가 다음 시설에서 재사용 가능한 구조여야 합니다.

---

## Phase 7. Luna Light Garden

상태: 예정

### 자산

- UI와 텍스트가 없는 Luna Light Garden Control Room 배경
- Mint 컬러 EVE 적용


### Mission

- Light Fragment 수집
- Prism 활성화와 90도 회전
- 빛의 경로 연결
- 꽃과 식물 활성화
- 중앙 Lotus 개화


### 상태 연동

- 빛 조각 수
- 경로 연결률
- 정원 활성화 상태
- 복구 상태


### 완료 조건

- Luna 완료 후 MAP의 시설 상태와 Recent Log가 갱신되어야 합니다.

---

## Phase 8. Spark Energy Tower

상태: 예정

### 자산

- UI와 텍스트가 없는 Spark Energy Tower Control Room 배경
- Orange 컬러 EVE 적용


### Mission

- Core의 모양, 색상과 위치 기억
- Core Drag
- 빈 Slot 배치
- Charge 100% 달성
- Energy Tower 재가동


### 완료 조건

- 난이도별 Core 수와 공개 시간이 적용되어야 합니다.
- Spark 완료 후 MAP 상태와 Recent Log가 갱신되어야 합니다.

---

## Phase 9. Wonder Parade Hall

상태: 예정

### 자산

- UI와 텍스트가 없는 Wonder Parade Hall Control Room 배경
- Pink 컬러 EVE 적용


### Mission

- Parade Character 확인
- 지정 위치와 행진 순서 기억
- Character Drag와 배치
- 무대 활성화
- Parade 시작


### 완료 조건

- 난이도별 Character 수와 배치 조건이 적용되어야 합니다.
- Wonder 완료 후 Cosmic Voyage가 개방되어야 합니다.

---

## Phase 10. Cosmic Voyage와 Ending

상태: 예정

### 자산

- Cosmic Voyage 배경
- 전체 시설 에너지가 연결되는 연출 자산


### Cosmic Voyage

- 4개 시설 완료 조건 확인
- Gate 개방
- Movement, Life, Energy와 Joy 연결
- Harmony 체험


### Ending

- Explorer Certification
- Explorer Passport 최종 상태
- Nova Land 복구 연출
- EVE 최종 메시지
- Ending과 프로젝트 소개 연결


### 완료 조건

- 첫 진입부터 Ending까지 전체 User Flow가 끊김 없이 동작해야 합니다.

---

## Phase 11. 반응형과 최종 QA

상태: 예정

### 반응형

- Mobile
- Tablet
- PC
- 가로·세로 전환
- Touch 조작


### 접근성

- 키보드 조작
- Focus 이동과 Focus Visible
- Button과 Dialog 이름
- 상태 변화 Live Region
- 명도 대비
- `prefers-reduced-motion`


### 품질

- 이미지 WebP 변환과 용량 최적화
- 필요한 이미지 Preload와 Lazy Loading 구분
- 애니메이션 성능
- BGM과 효과음 정책
- Chrome, Edge, Safari와 Mobile Browser 확인
- 저장 데이터 초기화와 오류 복구
- GitHub 배포와 최종 회귀 테스트


### 완료 조건

- 주요 화면과 Mission을 PC와 Mobile에서 완료할 수 있어야 합니다.
- 치명적인 접근성, 저장, 성능과 화면 깨짐 문제가 없어야 합니다.

---

## 현재 우선순위

```text
Phase 5. 공통 시스템

→

Phase 6. Nova Coaster와 공통 Mission Flow

→

Phase 7. Luna Light Garden Mission
```

완료된 MAP PC 화면에 공통 시스템을 연결한 뒤 Nova Coaster에서 Control Room과 Mission Flow의 재사용 구조를 완성합니다.
