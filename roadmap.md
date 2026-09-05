# Nova Land Roadmap

이 문서는 완료된 기능 명세를 반복하지 않고 현재 작업과 이후 제작 순서만 관리한다.

확정된 기획과 UX 규칙은 project.md, 외부 공개용 소개는 README.md를 기준으로 한다.

---

## 새 채팅에서 이어가기

현재 다음 제작 대상은 **LUNA LIGHT GARDEN**이다. 이 문서의 완료 목록은 재제작 대상이 아니다. 먼저 프로젝트 작업 규칙 → project.md의 공통 시스템·Mission System·LUNA 규칙 → 이 문서의 다음 작업과 보류 범위 → README.md 순서로 읽고 실제 소스를 확인한다.

### LUNA에서 확정된 것과 먼저 결정할 것

Mint 생명 시설, 약해진 정원의 빛과 멈춘 Lotus, Light Fragment 수집, 고정 Prism의 90° 회전, 꽃·식물 활성화와 Lotus 연결이 확정돼 있다. Prism은 이동하지 않는다. 세부 단계 수·보드 배치·수집 방식·색 혼합 여부·제한 시간 수치는 아직 확정하지 않았다. NOVA의 3단계·9조각이나 기계 프레임을 그대로 이식하지 말고 LUNA 조작안을 먼저 제안한다.

1. LUNA 관제실 배경과 게임 조작·판정·완료 조건을 구체화한다.
2. 실제 공통화 가능한 수명주기와 시설별 게임 Module을 연결한다.
3. 공통 Guide·Pause·결과 UI에 LUNA 콘텐츠를 적용한다. 게임 내부의 시설별 UI는 별도 제작한다.
4. 완료 → MAP 조명·다음 시설 해금 → Log → Passport의 LUNA 기록·Stamp를 함께 연결한다.
5. PC 전체 흐름과 기본 모바일 조작·넘침을 검증하고 두 문서를 갱신한다.


### 소스 연결 지점

| 파일 | 책임과 다음 작업 시 주의점 |
| --- | --- |
| `assets/js/main.js`, `navigation.js` | 화면·Overlay·History 연결. MAP 미션 선택과 관제실 복귀 유지 |
| `assets/js/ui.js`, `assets/css/common.css` | Dialog·Overlay·공통 목록·버튼·Panel. 시설 차이는 부모 토큰·Modifier 우선 |
| `assets/js/data.js`, `locales.js` | 시설 데이터와 한영 문구 |
| `assets/js/progress.js`, `mission-state.js` | 시설 완료·해금·Checkpoint·Stamp·쿠폰 저장, 복원 단계 결정과 Preview 격리 |
| `assets/js/mission.js` | Guide·Countdown·Play·Pause·결과 수명주기. 현재 NOVA 연습·점검 표현과 게임 생성 연결이 포함돼 있어 LUNA에 맞는 분리가 필요 |
| `assets/js/coaster-repair.js` | NOVA 레일 보드·배치·회전·판정. LUNA 퍼즐은 별도 Module로 구현 |
| `assets/js/control-room.js`, `index.html` | 관제실·Mission 마크업. NOVA 전용 상태 수치와 텍스트의 실제 적용 범위를 확인 |
| `assets/js/archive.js`, `passport.js` | 페이지 전환·NOVA Stamp·쿠폰·신원 렌더링. LUNA는 같은 펼침 오른쪽 기록으로 확장 |
| `assets/js/map.js`, `assets/css/style.css` | 완료 수 0~4·시설 조명·시설별 표현 |
| `tests/regression.test.mjs` | 현재 회귀 테스트. 새 시설 적용 후 기존 NOVA 상태·복귀를 보호 |

새 게임 Module만 추가하면 모든 화면이 자동 확장되는 상태는 아니다. 현재 구현의 NOVA 의존 부분을 위 연결 지점에서 확인하되, 아직 사용하지 않는 시설용 추상 구조를 미리 만들지 않는다.


### 이번 범위에서 보류한 것

- 모바일 전용 이미지·HUD 재설계와 세밀한 비주얼: 전체 시설·Ending 후 진행. 기본 조작·접근성과 넘침은 시설 제작 중 확인한다.
- 시간·날씨·사운드 실제 기능, 쿠폰 실제 혜택·사용 조건·발급 방식
- 관제실 제목에서 과거 삭제했다는 항목의 근거 조사: 미확정 상태로 보류하며 임의 제거하지 않는다.
- 실제 모바일 기기·Safari·운영체제 모션 감소·배포 환경 최종 검수

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
- [x] 완료 시설 수 `0 / 4` → `4 / 4`를 Progress·한영 문구·접근성 값에 동일하게 반영 (해금 수와 구분)
- [x] 1366×768과 1440×900에서 기본·선택·전체 복구 상태 회귀 검수

완료 조건: PC MAP의 선택 흐름, 화면 전환과 키보드 Focus가 일치하고 Console 오류와 화면 Overflow가 없어야 한다.

---

## 완료. Intro와 Explorer Passport 최초 발급

상태: 완료

- [x] 최초 방문과 기존 Explorer의 진입 분기
- [x] Welcome → Signal → 2단계 Explorer 등록 → Passport → MAP 연결 Flow
- [x] Passport 복구 색 상태를 실제 Passport 요소에 적용하도록 수정하여 등록 후 발급 전환 오류 해소, 별도 테스트 주소에서 Welcome부터 MAP까지 전체 진입 확인
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

## 완료 기반. Explorer Archive와 Save Data

상태: NOVA 기록·쿠폰 준비 중·저장과 초기화 연결 완료. 이후 시설의 기록 확장과 시간·사운드는 후속 작업


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

## 완료. NOVA COASTER와 공통 Mission Flow

상태: PC 기능·확정 디자인 반영과 LUNA 착수 전 리팩터링·회귀 검수 완료. 실제 기기·브라우저별 최종 QA는 보류 범위 참고

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
- [x] Mission Guide 공통 Panel·직접 조작 연습·번호 설명 박스 적용
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
- [x] Pause 공통 Panel·진행 상태 Header·행동 우선순위와 반응형 배치 적용
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
- [x] `mission-preview=completed` 복구 완료 창 직접 진입 및 임시 Stamp로 Passport 기록 검수 연결
- [x] 모바일 Rail Board의 PC 여백 계산 제거, 44px 빈 공간과 가로 스크롤 확보
- [x] 모바일 Play Header·단계 표기 겹침 수정과 콘텐츠 세로 스크롤
- [x] 낮은 화면 Guide·Pause 내부 스크롤과 하단 버튼 접근 복구
- [x] Rail 배치·회전·빈 공간 선택 Focus 유지, Fail 재시도 Focus와 Pause Tab 순서 수정
- [x] 일반 Passport 열람에서 권한·신원·획득한 NOVA 기록으로 이동하는 하단 접힌 귀퉁이 연결
- [x] Passport 본문·항목명·일련번호의 13px 기준 적용과 EVE 안내·역명 가독성 보정
- [x] Passport 안쪽 귀퉁이 접힘·아래 장 노출, Hover·Focus, 앞뒷면 책장 회전, 첫·마지막 경계와 모션 감소 전환
- [x] 접힌 두 면의 크기를 맞춘 대각선도 완만하게 휜 세로가 조금 긴 말린 귀퉁이·페이지 회전 중 숨김 및 완료 후 접힘·접힘선 축의 상시 들림·Hover 크기 전환·공통 토스트 최초 안내, 등록 표지와 같은 페이지 회전 및 모서리 라운드와 NOVA 기록 오른쪽 빈 종이 적용 (전환용 페이지의 편집 버튼 배치를 유지하여 글줄 높이 차이 해소)
- [ ] 이후 시설의 양면 기록 페이지 구성
- [x] 모바일 MAP의 복구 시설 주변 밝기 마스크 연결 (전용 조명 상태 이미지와 구분)
- [x] Guide 조작 문구, Play 중복 공간 번호 제거, 결과 화면과 MAP·관제실 공통 UI 정리
- [x] 이번 수정 범위 PC 한국어 주요 화면 검수
- [x] 이번 수정 범위 PC 영어 주요 화면 검수
- [x] 브라우저 390px·844px 가로·1024px·1280px·1366px 주요 화면 검수 (한국어·영어)
- [ ] 실제 모바일 기기와 모션 감소 설정의 최종 수동 검수

완료 조건: MAP 진입부터 세 단계의 Rail Board 복구, 시운전과 안전 확인, NOVA Stamp와 기록 갱신까지 하나의 흐름으로 동작하고, 다음 시설에서 공통 Mission Flow를 재사용할 수 있어야 한다.


### 검수 후 수정 우선순위

1. 완료: Play 위 Pause·Fail·Complete·최종 점검 구성, 실제 완료 후 자동 Passport 이동과 최초 NOVA Stamp 획득 연출
2. 완료: Guide·Play 조작 안내 — 2단계 설명, 조각 반복 사용·제거 예시, 정보 중복과 시간 임박 안내
3. 완료: 확정 동작과 구현 불일치 — Explorer Log 순서, 초기화 진입점, Timer·Navigation 기준 대조와 정리
4. 완료: MAP·관제실 공통 UI — 프로필 옆 연필 아이콘, 지도·Mission 목록의 시설 역할 유지, 잠금 조건 별도 표시와 짧은 문구, 고정 환경 표시와 상태·버튼 위계
5. 완료: 모바일 MAP 복구 상태 — 진행 상태별 시설 조명 반영 (모바일 전체 HUD 재설계와 구분)
6. 완료: Passport 보완 — NOVA 쿠폰 준비 중 상태·저장·기존 기록 보완과 Violet 표지 가장자리 반영 (실제 혜택·사용 조건·발급 방식은 별도 확정 필요)
7. 주요 검증 완료: 문서 정합성, 한국어·영어 주요 화면, 브라우저 반응형, 저장·복귀·키보드 확인. 실제 모바일 기기·모션 감소 실행 검수는 남음

검증: 전체 JavaScript 문법·Git diff·HTML 자산 경로·중복 ID 검사 통과. 앞선 쿠폰 최초 생성·복구·중복 방지·기존 기록 보완·Preview 저장 격리 테스트에 더해, 별도 테스트 계정으로 Welcome → 등록 → Passport → MAP → NOVA 세 단계 직접 완료 → 자동 Passport 이동·기록 저장·LUNA 해금을 확인했다. 초기화·언어 유지, 시간 종료·재시도·오답 안내도 검수했다. 실제 사용자 저장 데이터는 초기화하지 않았다. 모바일 MAP은 시설 주변 밝기 마스크 방식이며 전용 조명 이미지 기반 검수와 구분한다.


### LUNA 전 회귀 수정

- [x] MAP Progress를 완료 시설 수 기준 0 / 4 → 4 / 4로 변경, 한·영 문구와 접근성 범위 동기화

- [x] 관제실 MISSION START 문구 고정 및 MAP 재렌더링 시 선택 시설의 활성 표시 복원
- [x] 새 탭 미션 복원 후 MAP 복귀 경로 확보와 명시적 MAP 이동
- [x] 관제실 Settings 닫기 후 MAP Button 소실 수정 및 Mission Preview의 MAP 이력 보존 (닫기 Button·Escape 후 Button 유지, Preview에서 실제 MAP 도착 확인)
- [x] Browser 뒤로가기 시 Mission 닫기·Timer 정지·Checkpoint 저장
- [x] 초기화 안내에 시설 복구·Mission·Stamp·쿠폰 삭제 범위 명시
- [x] 초기화 후 이름 입력 직행을 제거하고 Welcome부터 재시작하도록 복원 (테스트 계정으로 Welcome·언어 유지·구조 신호 진입 확인)
- [x] 1280×720 Passport 하단 귀퉁이 노출과 낮은 PC 화면 간격 보정
- [x] Mobile 영어 Header 겹침 해소와 Settings 조작 영역 확보
- [x] Guide·Pause·점검·Fail·Complete에 MAP 공통 Panel 적용, 관제실 MISSION START·게임 HUD·Board의 기존 Frame 유지
- [x] 공통 보조 Button 재사용과 Guide 닫기 Icon 통일
- [x] Settings 제목 구분선 유지, 항목 사이에만 Divider 적용
- [x] 최근 기록·미션 목표·복구 현황·Settings의 라인 목록과 항목을 `ui-info-list--lined`·`ui-info-list__item`으로 통일 (최근 기록 동적 생성 포함): 항목 사이 Padding, 첫 위·마지막 아래 Padding 제거. 일괄 12px 적용을 보정하여 최근 기록 16px·Settings 24px·미션 목표 8px·복구 현황 12px로 기존 목록별 밀도 유지. 제목 다음 콘텐츠·설명 다음 목록 간격은 공통 16px 적용
- [x] 완료 결과 표시를 5초로 늘리고 즉시 기록 확인 Button 유지
- [x] Guide에 선택·배치·90° 회전 연습 추가 (실제 진행과 저장에 영향 없음)
- [x] Guide 번호를 제목 첫 줄에 정렬, 16px Padding·14px 제목·13px 설명과 약한 테두리 적용, 설명 문구 정리
- [x] 관제실 직접 진입·저장 게임 복원 경로에서 MAP 미션 목록 선택과 시설 카드 진입 상태 동기화: 8783 본화면 검수 계정으로 게임 시작·Pause 저장·재접속 → 관제실 → MAP의 선택/진입 활성 유지와 목록 재선택 없이 관제실 재진입 확인. Preview 동일 경로 확인
- [x] Play Header 가이드 Button의 기존 최소 높이·Padding 복원
- [x] Play Header 일시정지 Button을 공통 Icon Button 기반의 약한 라운드로 적용, 일시정지 팝업 Icon·소제목을 공통 Primary 색상으로 통일
- [x] Guide 팝업 고정 높이 제거, 콘텐츠 자동 높이와 화면 기준 max-height 적용
- [x] Guide 팝업 위아래 외곽 여백 통일·중복 본문 Padding 제거: 1280×720·1366×768 내부 스크롤 없음, 390px에서는 필요한 본문 스크롤과 대칭 16px 외곽 여백 유지
- [x] 회전 상태별 안내 높이 확보, 설명 부모 목록의 공통 ui-info-list--angular Modifier(var(--radius-sm), 8px), 복구 시작·게임으로 돌아가기 공통 중앙 정렬
- [x] 공통 미션 가이드 제목·16px 소제목, 공간 선택 안내와 점선 Motion 적용. 왼쪽 연습 순번·잠금 Icon 제거, 오른쪽 설명은 공통 Panel·정보 목록 박스를 유지하고 번호만 테두리 없는 숫자로 표시, 배치·제거·재배치와 연결 후 반복 회전 허용, 가로 시설명 아래 Margin 제거. 본문 소제목은 시설별 미션명(NOVA: 레일 복구 미션) 사용. 관제실 재진입·반복 회전·제거·재배치·초기화 및 390px 조작 확인

### LUNA 착수 전 리팩터링 검수 (2026-09-05)

과거 시점별 검수 문구와 미커밋 파일 수를 누적하지 않고 아래 결과를 현재 기준으로 관리한다. 변경 이력은 Git에서 확인한다.

- [x] Pause·Guide 중 예약된 단계 전환 정지, 재개 시 다음 단계 한 번만 진행
- [x] 다음 단계 복원 시 이전 조각과 선택 위치 초기화
- [x] Mission 종료 정리 공통화, Fail 복원 시 실제 표시된 재시도 버튼으로 포커스
- [x] Intro 언어 변경 중 Passport 최종 대사 완료 콜백 보존
- [x] 숨겨진 EVE의 클릭 간섭 제거, 게임 대사·상태 안내 즉시 노출 연결. 공통 입력 처리에서 조작 요소는 첫 클릭에 대사 완료와 원래 동작을 함께 실행 (게임 대사 타이핑 중 조각 첫 클릭 배치·배경 클릭 즉시 표시 확인)
- [x] 같은 관제실에서 설정을 여닫을 때 EVE와 제목 포커스 재시작 방지
- [x] Overlay 배경 inert·최초 Shift+Tab·언어 버튼 포커스 보존
- [x] 공통 목록 아이콘의 기본색을 공통 토큰으로 관리, 시설색은 관제실 부모에서 지정. 제목 구분선은 기존 Violet 기본값을 유지하여 콘텐츠 내부 선색과 구분
- [x] 효과 없는 목록 글자 크기 선언 제거, 중복 56rem 미디어쿼리 통합
- [x] 점검·결과 팝업의 너비·Padding 공통 Option 적용, 상태별 중복 배치·제목·목록 규칙 정리. 열차 너비·이동 끝점을 부모 기준으로 수정하고 빈 장식 요소 제거
- [x] `mission-preview=testing` 고정 점검 화면과 저장 격리·실제 점검 순서 회귀 테스트 추가
- [x] 점검 팝업 한국어·영어와 1366×768·1024×768·1280×480·390×844 검수: 가로 넘침 없음, 낮은 화면의 세로 스크롤 유지. 완료·일시정지·실제 시간 종료 실패 팝업과 Settings 기본 480px·24px 여백 유지 확인
- [x] 네이티브 Dialog Escape 기본 닫기 중복 차단: Guide → Play → Pause 반복, 초기화 Confirm·프로필 편집 취소와 원래 버튼 포커스 복귀 확인
- [x] JavaScript 19개 문법, 자동 회귀 17개, Git diff, HTML 중복 ID·로컬 자산 경로·CSS 중괄호와 자산 경로 검사 통과

실제 일반 주소의 별도 검수 계정으로 Welcome → Signal → 등록 → Passport → MAP → 관제실 → 게임 3단계 → 점검 → 자동 Passport → NOVA Stamp·쿠폰 준비 중·LUNA 개방을 실행했다. 단계 완료 직후 Pause·재접속 복원, 완료 후 재접속·9/9·3/3 표시와 재시작 차단, 프로필 이름 저장, MAP 선택 유지, 초기화 후 Welcome·영어 유지도 확인했다. 사용자 원래 계정은 초기화하지 않았다.

화면 검증: 한국어·영어 Guide와 관제실·Settings·Passport를 확인했다. 1366×768 영문 Guide는 내부 넘침 없이 표시되며 1280×600과 390×844에서는 필요한 본문 스크롤로 버튼에 접근한다. 실제 모바일 기기·Safari·운영체제 모션 감소 설정 실행 검수는 이번 완료 범위에 포함하지 않는다.

마지막 Dialog·EVE 입력 처리 수정 후 별도 회귀로 가이드 Escape 복귀·일시정지·재시작 직후 MAP 복귀·Settings 진입을 확인했다. 시간 종료 → Fail의 재시도 포커스 → 재시도도 실제 실행했다. 1024×768 영문 게임과 390×844 Pause는 문서 가로 넘침 없이 결과 버튼에 접근한다. Console warning/error는 없었다. 모션 감소는 소스 규칙 확인이며 운영체제 설정 실행과 구분한다.

자동 회귀 테스트는 진행 0~4·순차 해금·중복 보상 방지·Preview 저장 격리·각 단계 복원·Timer·Guide/Pause·Overlay·Intro 콜백·Escape 처리를 검사한다. 실행 명령과 검증 범위는 project.md의 개발 기준을 따른다.


---

## Later. 모바일 MAP 재설계

상태: 전체 시설과 COSMIC VOYAGE 연결 후 전용 이미지·세부 디자인 진행. 시설 제작 중 Mobile 기본 조작·접근성·화면 넘침 검증은 병행

현재 반응형 구현은 기능 검증용 1차 버전이다. PC 패널을 축소한 인상이 강하므로 모바일 게임형 HUD를 기준으로 시각 구조를 다시 확정한다.


### 먼저 결정할 것

- [ ] 390px 세로 화면 Wireframe
- [ ] 지도 속 시설 직접 Tap을 주 동작으로 사용할지 확정
- [ ] 시설 Marker의 기본·선택·잠금 표현
- [ ] Mission 진입을 Bottom Sheet로 유지할지 확정
- [ ] Recent Log와 Settings의 상단 Utility Button 구성
- [ ] Logo, Explorer와 시간 정보의 우선순위


### 확인된 수정 사항

시간·날씨 준비 중 표시의 제거·축소는 보류하며 실제 기능 연결 전까지 유지한다.

- [ ] 접힌 Mission Panel에 남는 Divider와 빈 공간 제거
- [ ] Recent Log의 크기와 시각 비중 축소
- [ ] PC와 동일한 큰 Glass Box 구조 제거
- [ ] 시설 건물이 UI보다 먼저 보이도록 Label과 Card 축소
- [ ] 상단 Header의 큰 박스 분할 완화
- [ ] 시설명 말줄임 개선과 게임 Board 가로·조작부 세로 스크롤 부담 완화 (전체 모바일 디자인 단계)
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

상태: 다음 제작 대상 (Mobile 터치 조작·버튼 접근·화면 넘침 검증 병행)

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

    LUNA LIGHT GARDEN (각 시설에서 Archive·Save Data 함께 확장)
    → SPARK ENERGY TOWER
    → WONDER PARADE HALL
    → COSMIC VOYAGE와 Ending
    → 모바일 전용 이미지·MAP UI 재구성과 전체 QA
    → 배포
