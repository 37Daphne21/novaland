# Nova Land Roadmap

이 문서는 완료된 기능 명세를 반복하지 않고 현재 작업과 이후 제작 순서만 관리한다.

확정된 기획과 UX 규칙은 project.md, 외부 공개용 소개는 README.md를 기준으로 한다.

---

## 완료된 기반

- Nova Land 세계관, 전체 User Flow와 시설 진행 순서
- HTML, CSS와 JavaScript ES Module 기반 공통 구조
- 디자인 Token, UI Component, SVG Sprite와 공통 이미지
- 한국어·영어 선택, Settings Overlay와 Fullscreen 제어
- PC MAP 상태·Mission 선택·EVE 안내·시설 조명 변화 연결
- Mobile·Tablet 기능 검증용 반응형 1차 구현

---

## 완료. MAP 마무리

상태: 완료

- [x] 비활성 지도 시설 Card를 키보드 Tab 순서에서 제외
- [x] MAP에서 Control Room 진입 시 새 화면의 제목으로 Focus 이동
- [x] Control Room에서 MAP 복귀 시 진입에 사용한 지도 시설 Card로 Focus 복원
- [x] `1 / 4`가 완료 수가 아니라 현재 단계임을 Progress 이름과 접근성 문구에 명확히 표시
- [x] 1366×768과 1440×900에서 기본·선택·전체 복구 상태 회귀 검수

완료 조건: PC MAP의 선택 흐름, 화면 전환과 키보드 Focus가 일치하고 Console 오류와 화면 Overflow가 없어야 한다.

---

## 완료. Intro와 Explorer Passport 최초 발급

상태: 완료

- [x] 최초 방문과 기존 Explorer의 진입 분기
- [x] Welcome → Signal → 2단계 Explorer 등록 → Passport → MAP 연결 Flow
- [x] 이름·성별·공용 Portrait 등록과 Passport·MAP Profile 동기화
- [x] EVE 등장·대사 타이핑과 화면 전체 Click·Touch 즉시 노출
- [x] Passport 권한·신원 기록, Registered Seal과 수동 MAP 연결
- [x] 공용 Radio Choice Card와 등록 단계 Transition
- [x] 공용 뒤로가기와 Browser History 기반 Intro·Overlay·Panel·Control Room 복귀
- [x] Intro Timer 정리, 입력 유지, MAP Focus 복원과 완료 상태 저장
- [x] Intro 언어 전용 Settings와 한국어·영어 즉시 전환·저장
- [x] Keyboard, Focus, 오류 안내와 `prefers-reduced-motion` 대응
- [x] 1366×768과 390×844 전체 Flow·Overflow 회귀 검수

완료 조건: 최초 방문자가 이름과 성별·이미지를 등록하고 Passport를 발급받은 뒤 기존 MAP으로 진입하며, 재접속에서는 Intro를 반복하지 않아야 한다.

---

## Next. Explorer Archive와 Save Data

상태: 진행 중


### Explorer Archive

- [x] Explorer Log와 Explorer Passport 공통 Overlay
- [x] 두 화면을 동등한 Tab으로 전환
- [x] Recent Log에서 Explorer Log 진입
- [x] Explorer Profile에서 Passport 진입
- [x] 시설 완료 기록과 Stamp Save Data 연결
- [ ] 시설별 Stamp 페이지와 완료 연출 갱신


### 저장과 설정

- [x] Explorer 이름·성별·Passport 이미지 변경
- [x] Intro 완료와 Explorer 신원·Passport 발급 상태 복원
- [x] 시설 잠금·진행·완료 상태 저장
- [x] Mission 진행 상태 저장 구조와 공통 API
- [x] 실제 Mission Flow의 Checkpoint·Pause 복원 연결
- [x] 언어 선택 저장과 Intro·MAP 정적·동적 UI 즉시 반영
- [x] Common Dialog와 처음부터 다시 시작 Confirm 적용
- [ ] 시간과 사운드 설정 저장
- [x] Recent Log와 Explorer Log 공통 기록 저장
- [x] 처음부터 다시 시작과 저장 데이터 초기화
- [ ] Fullscreen 상태 예외와 브라우저별 동작 검수


### 완료 조건

- 새로고침 후 사용자와 시설 상태가 정확히 복원되어야 한다.
- 언어 변경이 모든 공통 UI에 즉시 반영되어야 한다.
- Explorer Log와 Passport가 역할을 유지하면서 같은 Overlay 안에서 동작해야 한다.

---

## Then. NOVA COASTER와 공통 Mission Flow

상태: PC 전체 기능 Flow 연결 완료, 화면별 Visual Development 진행 중

- [x] Control Room 공통 Layout 재설계
- [x] Control Room 화면 Controller 분리
- [x] NOVA COASTER PC 관제실 Production Background 적용
- [x] NOVA COASTER 관제실 2560×1080 Production Background 확정
- [x] NOVA COASTER Gate·관제 Console·Mission Start Visual Development
- [x] 시설별 Theme Modifier
- [x] EVE와 Mission Objective
- [x] 시설 상태 Panel
- [x] Mission Guide 기본 구조와 기능 Flow
- [x] 공통 Mission Flow와 시설별 Game Module 책임 분리
- [x] Countdown 기본 기능 Flow
- [x] NOVA COASTER Full-screen Countdown Visual Development
- [x] NOVA COASTER Full-screen Play HUD Visual Development
- [x] Top View Rail의 금속 베드·침목·이중 레일 고밀도 Asset 적용
- [x] Rail과 동일한 Top View 시점의 START 기차와 GOAL 종착역 Production Image 적용
- [x] Top View 분기 제어기 Production Image와 왼쪽 Rail 접속 적용
- [x] 출발역·종착역 Label 상단 배치와 한글·영문 가독성 보완
- [x] Rail 방향 화살표 제거와 직선 중앙 Cyan 점선 강화
- [x] 정사각형 Candidate Card와 Rail 모양·이름 세로 배치
- [x] Board Description과 EVE 조작 안내 분리 및 얼굴 중심 Crop
- [x] EVE 단계 안내 유지와 조작 Live Status 개별 타이핑
- [x] Play Header 전체 연결 상태의 가변 Segment 수 기준 중앙 정렬
- [x] 실제 Play Asset 기반 Mission Guide Visual Development
- [x] 단계마다 새 경로로 교체되는 Rail Network Play 화면
- [x] 복구 단계 1: 빈 공간 2개와 후보 2개 기본 연결
- [x] 복구 단계 2: 빈 공간 3개와 중복 없는 Rail Type 3개의 반복 배치·회전
- [x] 복구 단계 3: 빈 공간 4개와 Rail Type 3개의 반복 배치·T자 분기
- [x] 동일 Rail Type의 슬롯별 반복 배치와 독립 회전 판정
- [x] 현재 STEP의 조각·회전 초기화
- [x] 연결 실패 시 오류 공간 표시와 첫 오류 공간 자동 활성화
- [x] 연결 실패 Live Status Red Text와 다음 조작까지 오류 상태 유지
- [x] Board 공간 선택 시 두 자리 공간 번호를 포함한 EVE 조각 선택 안내
- [x] STEP 1의 두 빈 공간을 서로 다른 단절 구간으로 분리
- [x] Board 공간 번호와 Candidate A·B·C 식별 Badge 확대
- [x] 현재 Rail 복구 후 다음 Rail Board로 이어지는 Stage Transition
- [x] 전체 연결 검사·코스터 시운전·안전 시스템 확인
- [x] Pause
- [x] Fail
- [x] Complete
- [x] 복구 완료 시설의 Control Room 상태 보호와 Mission 재시작 차단
- [x] 복구 완료 Control Room의 MISSION START 위치 정상 운행 상태 표시
- [x] Control Room 복구 현황의 3단계·9조각 Checkpoint 연동과 9개 Segment 표시
- [x] MAP 복귀와 상태 갱신
- [x] 현재 복구 단계와 구간 상태 Checkpoint 저장
- [x] Guide·Countdown·Pause 새로고침 복원
- [x] Play에서 다시 연 Mission Guide의 닫기 X Button과 게임 복귀 Focus
- [x] 완료 시설 MAP 재선택 대사와 Control Room 복구 결과 문구 동기화
- [x] 완료 화면 잔여 Timer 제거와 Pause·Fail·Complete 상태 Visual 보완
- [x] Rail Type별 금속·침목·Cyan 점선 규격과 Tile 이음부 통일
- [x] 출발역·분기 제어기·종착역 Label·Production Image 공통 반응형 Scale 적용
- [x] Play Header의 정보 아이콘 Guide·시계 Icon Timer와 불필요한 `남은 시간` Text 제거
- [x] Board Panel 상단 중앙의 `복구 01 / 03` Notch Plate와 단계 중복 정보 제거
- [x] START·GOAL 고정 표기와 현지화 역명의 2단 Label 적용
- [x] Train과 분리된 Top View 출발역 Base Asset과 종착역 Scale 보강
- [x] Header의 Mission Identity·연결 상태·조작부 분리와 얇은 Mechanical Frame 적용
- [x] Play Header·Board·Candidate Workspace의 얇은 통합 Mechanical Border 정리
- [x] Board 상단 결합형 복구 Notch와 낮은 명도의 Grid·Dot Matrix 적용
- [x] 시안 기준 세로형 출발역과 직사각형 종착역 Top View Asset·Rail 연결점 적용
- [x] 곡선·직선·T자 Rail의 좁은 금속 베드·침목·이중 레일 규격 통일
- [x] 게임 Board 집중도를 위한 낮은 Candidate Workspace 높이 유지
- [x] Candidate 묶음의 Workspace 전체 기준 중앙 정렬
- [x] 출발역·종착역 전광판 크기와 Label Scale 통일, 코너·T자 Candidate Artwork 수직 중앙 정렬
- [x] STEP 1 회전 불가 직선 Rail B의 가로 방향 교정
- [x] Rail SVG의 금속 베드·침목·체결판·볼트 Detail 보강
- [x] NOVA Stamp 기록과 Passport 연결
- [ ] PC 한국어 화면 검수
- [ ] PC 영어 화면 검수
- [ ] 반응형·반응형 영어 화면 검수

완료 조건: MAP 진입부터 세 단계의 Rail Board 복구, 시운전과 안전 확인, NOVA Stamp와 기록 갱신까지 하나의 흐름으로 동작하고, 다음 시설에서 공통 Mission Flow를 재사용할 수 있어야 한다.

---

## Later. 모바일 MAP 재설계

상태: PC NOVA COASTER 전체 흐름 검증 후 진행

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
- [ ] EVE 언어별 음성 적용과 이퀄라이저 재생 연동
- [ ] BGM과 효과음 정책
- [ ] Chrome, Edge, Safari와 Mobile Browser
- [ ] 저장 데이터 초기화와 오류 복구
- [ ] 전체 User Flow 회귀 테스트
- [ ] 배포 환경 검수

---

## 현재 작업 순서

    Explorer Archive와 Save Data
    → NOVA COASTER와 공통 Mission Flow
    → 모바일 MAP Wireframe과 UI 재구성
    → 나머지 시설
    → COSMIC VOYAGE와 Ending
    → 전체 QA와 배포
