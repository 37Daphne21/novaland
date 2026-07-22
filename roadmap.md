# Nova Land Roadmap

이 문서는 완료된 기능 명세를 반복하지 않고 현재 작업과 이후 제작 순서만 관리한다.

확정된 기획과 UX 규칙은 project.md, 외부 공개용 소개는 README.md를 기준으로 한다.

---

## 완료된 기반

- 프로젝트 세계관과 전체 User Flow
- 시설 역할, Identity Color와 Mission 방향
- HTML, CSS와 JavaScript ES Module 기반
- 공통 디자인 Token과 UI Component
- 한국어·영어 전환
- Settings Overlay와 전체 화면 제어
- MAP용 공통 이미지와 Icon
- PC MAP 기본 상태와 전체 복구 상태
- Mission List와 지도 시설 상태 동기화
- Mission 선택 → EVE 안내 → 지도 행동 유도
- COSMIC VOYAGE 봉인·개방 전환
- PC MAP 1차 Refactoring
- 모바일 전용 MAP 배경
- Mobile·Tablet 반응형 1차 구현

---

## Now. 모바일 MAP 재설계

상태: 진행 중

현재 반응형 구현은 기능 검증용 1차 버전이다. PC 패널을 축소한 인상이 강하므로 모바일 게임형 HUD를 기준으로 시각 구조를 다시 확정한다.


### 먼저 결정할 것

- [ ] 390px 세로 화면 Wireframe
- [ ] 지도 속 시설 직접 Tap을 주 동작으로 사용할지 확정
- [ ] 시설 Marker의 기본·선택·잠금 표현
- [ ] Mission 진입을 Bottom Sheet로 유지할지 확정
- [ ] Recent Log와 Settings의 상단 Utility Button 구성
- [ ] Logo, Explorer와 시간 정보의 우선순위


### 확인된 수정 사항

- [ ] 접힌 Mission Panel에 남는 Divider와 빈 공간 제거
- [ ] Recent Log의 크기와 시각 비중 축소
- [ ] PC와 동일한 큰 Glass Box 구조 제거
- [ ] 시설 건물이 UI보다 먼저 보이도록 Label과 Card 축소
- [ ] 상단 Header의 큰 박스 분할 완화
- [ ] EVE가 지도와 시설을 가리지 않도록 노출 방식 조정
- [ ] 10px 이하 글자 금지와 일반 UI 13px 기준 유지


### 구현 원칙

- 기존 시설 데이터, 진행 상태와 선택 로직을 재사용한다.
- PC와 Mobile의 동일 상태를 중복 관리하지 않는다.
- Mobile 전용 표현 마크업은 필요할 때만 추가한다.
- 시각 방향을 확정한 뒤 현재 1차 CSS를 정리한다.
- 세로 화면을 먼저 완성한 뒤 가로와 Tablet을 조정한다.


### 완료 조건

- 360px과 390px 세로 화면에서 시설과 핵심 행동이 한눈에 보여야 한다.
- Mission, Recent Log와 EVE가 시설을 불필요하게 가리지 않아야 한다.
- 시설 Tap → 안내 → 다음 행동 흐름이 명확해야 한다.
- 768px Tablet과 Mobile Landscape에서 화면 넘침과 Panel 충돌이 없어야 한다.
- 키보드, Touch Target, Focus와 Reduced Motion을 다시 검수해야 한다.

---

## Next. 공통 시스템 완성

상태: 모바일 MAP 확정 후 진행


### Explorer Archive

- [ ] Explorer Log와 Explorer Passport 공통 Overlay
- [ ] 두 화면을 동등한 Tab으로 전환
- [ ] Recent Log에서 Explorer Log 진입
- [ ] Explorer Profile에서 Passport 진입
- [ ] 시설 완료 기록과 Stamp 갱신


### 저장과 설정

- [ ] Explorer 이름 등록·변경과 복원
- [ ] 시설 잠금·진행·완료 상태 저장
- [ ] Mission 진행 상태 저장
- [ ] 언어, 시간과 사운드 설정 저장
- [ ] Recent Log 저장
- [ ] 처음부터 다시 시작과 저장 데이터 초기화
- [ ] Fullscreen 상태 예외와 브라우저별 동작 검수


### 완료 조건

- 새로고침 후 사용자와 시설 상태가 정확히 복원되어야 한다.
- 언어 변경이 모든 공통 UI에 즉시 반영되어야 한다.
- Explorer Log와 Passport가 역할을 유지하면서 같은 Overlay 안에서 동작해야 한다.

---

## Phase 1. NOVA COASTER와 공통 Mission Flow

상태: 예정

- [ ] Control Room 공통 Layout
- [ ] 시설별 Theme Modifier
- [ ] EVE와 Mission Objective
- [ ] 시설 상태 Panel
- [ ] Mission Guide
- [ ] Countdown
- [ ] Play
- [ ] Pause
- [ ] Fail
- [ ] Complete
- [ ] MAP 복귀와 상태 갱신
- [ ] Rail Connection Puzzle

완료 조건: MAP 진입부터 NOVA COASTER 복구와 기록 갱신까지 하나의 흐름으로 동작하고, 다음 시설에서 Control Room과 Overlay를 재사용할 수 있어야 한다.

---

## Phase 2. LUNA LIGHT GARDEN

상태: 예정

- [ ] 시설 배경과 Mint Theme
- [ ] Light Fragment 수집
- [ ] Prism 회전과 빛 경로 연결
- [ ] 꽃과 식물 활성화
- [ ] 중앙 Lotus 개화
- [ ] MAP과 Archive 갱신

---

## Phase 3. SPARK ENERGY TOWER

상태: 예정

- [ ] 시설 배경과 Orange Theme
- [ ] Core 정보 공개와 기억 단계
- [ ] Core Drag와 Slot 배치
- [ ] Charge 100%
- [ ] 난이도별 Core 수와 공개 시간
- [ ] MAP과 Archive 갱신

---

## Phase 4. WONDER PARADE HALL

상태: 예정

- [ ] 시설 배경과 Pink Theme
- [ ] Character 확인
- [ ] 위치와 행진 순서 배치
- [ ] Stage 활성화와 Parade 시작
- [ ] 난이도별 Character와 Hint
- [ ] MAP과 Archive 갱신

---

## Phase 5. COSMIC VOYAGE와 Ending

상태: 예정

- [ ] 네 시설 완료 조건 확인
- [ ] 봉인 해제와 Gate 개방
- [ ] 네 시설 에너지 연결
- [ ] Pearl White와 Aurora 연출
- [ ] Explorer Passport 최종 상태
- [ ] Explorer Certification
- [ ] EVE 최종 Message
- [ ] Ending과 프로젝트 소개 연결

---

## Final. 전체 품질 검수

상태: 예정


### Responsive

- [ ] 360px
- [ ] 390px
- [ ] 768px
- [ ] 1024px
- [ ] 1366px
- [ ] 1440px
- [ ] 1920px
- [ ] Mobile Landscape와 화면 회전


### Accessibility

- [ ] Semantic 구조
- [ ] 키보드 조작과 Focus 이동
- [ ] Button과 Dialog의 접근 가능한 이름
- [ ] 상태 변화 Live Region
- [ ] 색 대비
- [ ] Touch Target
- [ ] prefers-reduced-motion


### Quality

- [ ] 이미지 용량과 Format
- [ ] Preload와 Lazy Loading
- [ ] Animation 성능
- [ ] BGM과 효과음 정책
- [ ] Chrome, Edge, Safari와 Mobile Browser
- [ ] 저장 데이터 초기화와 오류 복구
- [ ] 전체 User Flow 회귀 테스트
- [ ] 배포 환경 검수

---

## 현재 작업 순서

    모바일 MAP Wireframe 확정
    → 모바일 MAP UI 재구성
    → 공통 시스템과 Explorer Archive
    → NOVA COASTER와 공통 Mission Flow
    → 나머지 시설
    → COSMIC VOYAGE와 Ending
    → 전체 QA와 배포