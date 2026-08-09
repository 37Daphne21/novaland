# Nova Land Roadmap

이 문서는 완료된 기능 명세를 반복하지 않고 현재 작업과 이후 제작 순서만 관리한다.

확정된 기획과 UX 규칙은 project.md, 외부 공개용 소개는 README.md를 기준으로 한다.

---

## 완료된 기반

- 전체 User Flow와 시설 진행 순서
- 지구·공명·중심 순환을 포함한 Nova Land 세계관
- 시설 역할, Identity Color와 Mission 방향
- Intro, Explorer 등록과 Passport 경험 설계
- HTML, CSS와 JavaScript ES Module 기반
- 공통 디자인 Token과 UI Component
- 한국어·영어 선택 UI
- Settings Overlay와 전체 화면 제어
- MAP용 공통 이미지와 Icon
- PC MAP 기본 상태와 전체 복구 상태
- Mission List와 지도 시설 상태 동기화
- Mission 선택 → EVE 안내 → 선택한 지도 시설 활성화
- 최초 Mission 즉시 선택 시에도 Dim 배경 전환 유지
- PC EVE 위치 고정형 발화 집중 상태와 대기 상태 전환
- 미복구 진행 시설만 감싸는 Guide Glow
- COSMIC VOYAGE 봉인·개방 전환
- 시설별 누적 조명 배경과 전체 복구 배경 전환
- PC MAP 1차 Refactoring
- 모바일 전용 MAP 배경
- Mobile·Tablet 반응형 1차 구현

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

상태: Passport 고도화 구현 완료, 최종 반응형 검수 필요

- [x] 최초 방문과 기존 Explorer의 진입 분기
- [x] 멈춘 노바랜드와 구조 신호 연결 Intro
- [x] EVE 등장과 Explorer 이름 등록
- [x] Explorer ID와 발급일 생성
- [x] Explorer Passport 최초 발급과 이름 각인
- [x] Explorer Registered Seal과 MAP 전환
- [x] Signal·Register·Passport 공통 Nova 우주 배경 적용
- [x] Welcome 고유 타이틀 배치를 유지하고 MAP형 타이핑 노출과 관제 궤도·광축·별빛 Motion 적용
- [x] Welcome WORLD STATUS Failed Beacon과 Signal 연결 반응 적용
- [x] Signal 수신기·궤도·좌표·Telemetry 비주얼 고도화
- [x] Signal 포착 순차 연출·NL-SOS Channel·회전 추적점 적용
- [x] Signal 중앙 수신기에서 Lock 완료 후 좌우 관제 Layout으로 전환
- [x] Register EVE를 손과 허리 아래까지 보이는 홀로그램으로 교체
- [x] Register EVE 하단 투사광·Scan Fragment·입자 분산과 조립 연출 적용
- [x] EVE 조립 완료 후 안내·등록 Form 순차 노출과 Focus 이동
- [x] Signal 수신·발신 관계와 외부 응답 요청 문구 정리
- [x] EVE 자기소개·외부 복구 권한 안내 네 줄 유지와 MAP형 대사 타이핑 적용
- [x] Register 이름 강조와 Passport 신원 정보로 이어지는 Identity Trace 적용
- [x] NOVA LAND AUTHORITY 권한 페이지와 Explorer Identity 페이지 역할 분리
- [x] 프로젝트 기본 Explorer Avatar 기반 Passport ID Portrait 제작·적용
- [x] PENDING → 정보 기록 → Registered Seal → REGISTERED 상태 전환 적용
- [x] Mobile 최초 발급에서 권한 페이지와 신원 페이지를 한 장씩 자동 전환
- [x] EVE의 이름 호명과 외부 복구 권한·WORLD MAP 경로 안내 타이핑 적용
- [x] Passport 닫힘 후 이름 각인과 Emblem 점등 시간을 확보
- [x] Passport Route Dock 수동 MAP 연결과 발광 Artifact 제거
- [x] Intro 중단·재접속·처음부터 다시 시작 상태 처리
- [x] Keyboard, Focus, 오류 안내와 `prefers-reduced-motion` 대응
- [x] 1366×768과 390×844에서 전체 Flow와 화면 Overflow 검수
- [ ] Passport 고도화 결과를 1366×768과 390×844에서 최종 회귀 검수

완료 조건: 최초 방문자가 이름을 등록하고 Passport를 발급받은 뒤 기존 MAP으로 진입하며, 재접속에서는 Intro를 반복하지 않아야 한다.

---

## Next. Explorer Archive와 Save Data

상태: 예정


### Explorer Archive

- [ ] Explorer Log와 Explorer Passport 공통 Overlay
- [ ] 두 화면을 동등한 Tab으로 전환
- [ ] Recent Log에서 Explorer Log 진입
- [ ] Explorer Profile에서 Passport 진입
- [ ] 시설 완료 기록과 Stamp 갱신


### 저장과 설정

- [ ] Explorer 이름 등록·변경과 복원
- [x] Intro 완료와 Passport 발급 상태 저장
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

## Then. NOVA COASTER와 공통 Mission Flow

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
