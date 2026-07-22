# Nova Land Project Guide

이 문서는 Nova Land를 이어서 기획·디자인·개발하는 AI와 작업자가 가장 먼저 읽는 기준 문서다.

구현 파일에서 바로 확인할 수 있는 경로, 파일명, 클래스 목록과 과거 변경 이력은 기록하지 않는다. 현재 확정된 경험 설계와 소스만으로 판단하기 어려운 규칙만 유지한다.

문서 우선순위는 다음과 같다.

1. 사용자의 최신 명시적 요청
2. 이 문서의 확정 규칙
3. roadmap.md의 현재 작업 순서
4. README.md의 공개용 설명
5. 참고 시안

시안은 분위기와 구성을 참고하는 자료이며 현재 문서나 실제 구현과 충돌하면 그대로 복제하지 않는다.

---

## 프로젝트 정의

Nova Land는 테마파크를 하나의 살아 있는 세계로 표현하는 인터랙티브 브랜드 경험 포트폴리오다.

사용자는 Explorer가 되어 멈춘 네 시설을 순서대로 복구한다. 시설이 회복될수록 MAP의 조명과 상태, 기록이 변화하고 마지막에는 네 시설의 에너지가 연결되는 COSMIC VOYAGE가 개방된다.

일반적인 홈페이지나 점수 중심 게임이 아니라, 사용자의 행동으로 브랜드 세계가 다시 움직이는 경험을 만드는 것이 목적이다.

핵심 키워드는 탐험, 회복, 변화, 연결, 몰입과 희망이다.

---

## 경험 원칙

### 노바랜드가 주인공이다

Explorer는 영웅이나 성장형 캐릭터가 아니라 노바랜드의 회복을 돕는 조력자다. 연출은 Explorer의 보상보다 시설과 세계의 변화에 집중한다.


### 설명보다 체험을 우선한다

긴 설명 대신 공간, 조명, 사운드, 애니메이션과 UI 상태 변화로 정보를 전달한다. 인터페이스는 세계를 가리지 않고 다음 행동을 이해할 만큼만 존재해야 한다.


### 모든 행동에는 결과가 있어야 한다

시설 선택, Mission 진행과 복구 완료는 EVE 안내, 시설 조명, MAP 상태와 기록 변화로 이어져야 한다. 같은 내용을 EVE와 Toast처럼 여러 UI에서 동시에 반복하지 않는다.


### 게임보다 관제 경험을 유지한다

Control Room과 Mission UI는 일반적인 게임 HUD보다 실제 시설을 점검하고 복구하는 관제 인터페이스처럼 느껴져야 한다. HP, EXP, Coin, Combo, Damage와 Rank는 사용하지 않는다.

---

## 세계관과 인물

### Nova Land

놀이기구만 모인 공원이 아니라 Nova People이 살아가는 하나의 세계다. 각 시설은 이 세계의 이동, 생명, 에너지와 즐거움을 유지한다.


### Explorer

시설을 점검하고 복구하는 방문자다. 이름을 등록할 수 있으며 시설 복구 기록과 Passport Stamp만 남긴다. Level이나 전투 능력치는 사용하지 않는다.


### EVE

노바랜드 중앙 관제 AI다. Explorer에게 시설 상태와 다음 행동을 짧고 정확하게 안내한다. 주인공처럼 앞에 나서지 않으며, 엔딩에서만 평소보다 조금 따뜻한 감정을 표현한다.

---

## Voice & Tone

- 친절하지만 과도하게 감정적이지 않다.
- 승리보다 회복을 이야기한다.
- 명령보다 안내형 문장을 사용한다.
- 실패를 Game Over가 아닌 복구 중단 상태로 표현한다.
- 과도한 축하, 영웅 연출과 불필요한 감탄을 피한다.

권장 문장:

- 시설을 점검해 주세요.
- 준비가 완료되었습니다.
- 복구를 시작합니다.

---

## 언어와 표기

기본 언어는 한국어이며 설정에서 영어로 즉시 전환할 수 있어야 한다.

다음 고유명사와 고정 라벨은 영어를 유지한다.

- NOVA LAND
- Explorer
- EVE
- MAP
- WORLD MAP
- 시설명
- MISSION START

메뉴, 패널 제목, 기능명, 상태, 본문과 버튼 보조 문장은 선택한 언어로 표시한다.

시설명:

- NOVA COASTER
- LUNA LIGHT GARDEN
- SPARK ENERGY TOWER
- WONDER PARADE HALL
- COSMIC VOYAGE

용어 기준:

| 개념 | 표기 |
| --- | --- |
| 사용자 | Explorer / 탐험가 |
| 주민 | Nova People / 노바인 |
| 시설 | Facility |
| 관제실 | Control Room |
| 탐험 기록 | Explorer Log |
| 탐험가 여권 | Explorer Passport |
| 시설 복구 완료 | Facility Restored |

---

## 비주얼 시스템

### 타이포그래피

- 한글 본문과 UI: Pretendard Variable
- 영문 타이틀과 시설명: Orbitron
- 시간, 온도, 시설 번호와 진행 수치: Rajdhani 500·600
- 일반 UI 본문은 13px 이상을 기본으로 한다.
- 어떤 상황에서도 10px 이하 글자는 사용하지 않는다.


### 시설 컬러

| 시설 | 역할 | 컬러 |
| --- | --- | --- |
| NOVA COASTER | Movement | Electric Violet #8c72ff |
| LUNA LIGHT GARDEN | Life | Mint #51e7cc |
| SPARK ENERGY TOWER | Energy | Orange #ffb84a |
| WONDER PARADE HALL | Joy | Pink #ff6eb6 |
| COSMIC VOYAGE | Harmony | Pearl White 중심의 Aurora Gradient |

COSMIC VOYAGE는 봉인 상태에서 Gray를 사용하며 단일 대표색을 갖지 않는다. 개방 후에는 네 시설의 컬러가 Pearl White 중심광으로 연결되는 Aurora로 표현한다.


### 구현 표현 원칙

- 배경과 UI는 독립된 레이어로 관리한다.
- 배경, 인물과 복잡한 Emblem처럼 이미지가 필요한 요소만 래스터 이미지로 사용한다.
- 패널, 카드, 버튼, 텍스트, 테두리, Glow와 Progress는 HTML/CSS로 구현한다.
- 아이콘은 기존 SVG Sprite를 우선 사용한다.
- 공통 컴포넌트에 시설별 Modifier를 더해 확장한다.
- 완성 PNG 시안은 구현 원본이 아니라 비주얼 참고 자료다.

---

## 전체 사용자 흐름

    Intro
    → Explorer Registration
    → MAP
    → Control Room
    → Mission Guide
    → Countdown
    → Play
    → Pause / Fail / Complete
    → Explorer Log
    → Explorer Passport
    → MAP
    → 네 시설 복구 완료
    → COSMIC VOYAGE
    → Explorer Certification
    → Ending

MAP은 모든 탐험의 시작과 복귀 지점이다. 시설별 Mission은 독립적이지만 공통 Flow와 Overlay 구조를 공유한다.

---

## 공통 시스템

### Explorer Archive

Explorer Log와 Explorer Passport는 하나의 공통 Overlay 안에서 동등한 두 Tab으로 제공한다.

- Recent Log의 기록 보기: 탐험 기록 Tab으로 진입
- Explorer Profile: 탐험가 패스포트 Tab으로 진입
- 이름 변경 Button: 이름 변경만 수행

Explorer Log는 사건과 Mission 완료 내역을 시간순으로 보여준다. Explorer Passport는 시설별 복구 상태와 Stamp를 수집형 기록으로 보여준다. 둘의 역할은 합치지 않는다.


### Settings

공통 설정 항목:

- 탐험가 이름 변경
- 한국어 / 영어
- BGM 음량
- 효과음
- Day / Sunset / Night
- 전체 화면 On / Off
- 처음부터 다시 시작

브라우저 Fullscreen API는 사용자의 직접 입력에서만 실행하고, 브라우저가 전체 화면을 해제하면 설정 상태도 동기화한다.


### Time

Day, Sunset과 Night는 배경, 조명, 반사와 분위기를 바꾸는 브랜드 경험용 시스템이다. Mission 난이도나 결과에는 영향을 주지 않는다.


### Save Data

새로고침 후 다음 상태를 복원해야 한다.

- Explorer 이름
- 시설 잠금·진행·완료 상태
- Mission 진행 상태
- 언어, 시간과 사운드 설정
- Recent Log

---

## MAP

MAP은 메뉴가 아니라 노바랜드의 현재 회복 상태를 보여주는 Home이다.

사용자는 MAP에서 시설을 선택하고 잠금·복구 상태를 확인한다. Mission 시작은 MAP이 아니라 Control Room에서 한다.


### 시설 진행 순서

    NOVA COASTER
    → LUNA LIGHT GARDEN
    → SPARK ENERGY TOWER
    → WONDER PARADE HALL
    → COSMIC VOYAGE

초기에는 Nova만 활성화되고 나머지 세 시설은 잠긴다. COSMIC VOYAGE는 ???와 봉인 상태로 표시하다가 네 시설이 모두 복구되면 이름과 개방 상태를 공개한다.


### PC MAP 확정 구조

- 상단 왼쪽: Logo와 Explorer
- 상단 오른쪽: Time, Weather와 Settings
- 중앙: WORLD MAP과 시설 Card
- 왼쪽 하단: 항상 펼쳐진 Mission List
- 오른쪽 하단: EVE와 Recent Log 세로 그룹
- Notification은 사용하지 않는다.

PC Mission List는 닫기나 접기를 지원하지 않는다. 패널 제목은 현재 언어의 미션 또는 MISSION만 표시하며 FACILITY MISSION 같은 중복 Eyebrow를 사용하지 않는다.

Mission Card는 상태가 바뀌어도 높이와 Icon 크기가 변하지 않아야 한다. 번호, Icon과 정보는 고정된 열로 정렬한다.

- 활성 또는 복구 시설: 시설 유형과 상태 표시
- 잠긴 시설: 잠금 해제 조건과 잠금 상태 표시
- COSMIC VOYAGE: 별도의 Compact Card로 조건과 봉인·개방 상태 표시
- 하단 Progress: 현재 단계 / 4와 단계형 Bar만 사용하고 퍼센트는 표시하지 않음


### MAP 선택 흐름

    Mission List에서 시설 선택
    → 정적인 선택 상태
    → EVE 시설 안내
    → 안내 종료
    → 지도 시설 Card의 Guide Glow와 행동 유도
    → 지도 시설 Card 선택
    → Control Room 진입

- Mission List와 지도 Card는 같은 시설 상태를 공유한다.
- Mission List 선택만으로 Control Room에 진입하지 않는다.
- 선택 상태는 Border와 Background로 구분한다.
- Guide Glow는 다음 행동을 안내할 때만 나타난다.
- EVE 안내와 같은 내용을 Toast로 중복 표시하지 않는다.
- EVE Signal Wave는 음성이 끝난 순간의 움직임에서 자연스럽게 정지한다.
- 전체 복구 이후에도 시설 선택과 안내 반응은 유지한다.


### MAP 상태 표현

- 활성·복구 시설 Marker: 순서 번호
- 잠긴 시설 Marker: 잠금 Icon
- 복구 완료: 시설 고유 컬러와 복구 완료
- 전체 복구: 4 / 4, COSMIC VOYAGE 개방, EVE 완료 안내와 Recent Log 갱신
- 배경 전체를 어둡게 덮지 않고 잠긴 시설 영역만 Dim 처리한다.
- 시설이 활성화되면 해당 시설 영역을 선명하게 복원한다.

개발 중 전체 복구 상태는 URL의 ?map-state=restored로 확인한다.


### Recent Log

최근 시설 복구, Mission 완료와 시설 개방을 짧게 보여준다. 전체 기록은 Explorer Archive에서 확인한다.


### 모바일 MAP 현재 판단 지점

모바일 전용 세로 배경과 1차 반응형 구조는 구현되어 있지만 디자인은 확정되지 않았다. 현재 구현을 완료본으로 간주하지 않는다.

확인된 문제:

1. 접힌 Mission Panel에 Divider와 빈 공간이 남는다.
2. Recent Log가 지도에 비해 크고 시선을 과도하게 차지한다.
3. PC Glass Panel을 축소한 박스형 UI가 모바일 게임 화면과 어울리지 않는다.
4. 시설 비주얼보다 Card가 먼저 보여 지도 속 시설을 직접 선택한다는 느낌이 약하다.
5. 작은 화면에서 Logo, 시간과 Settings가 각각 큰 박스로 나뉘어 상단이 답답하다.

다음 작업에서는 코드를 미세 조정하기 전에 390px 세로 화면 기준의 모바일 와이어프레임을 먼저 확정한다.

권장 방향:

- PC UI의 축소판이 아니라 모바일 게임형 HUD로 재구성
- 지도 속 시설 직접 Tap을 주 동작으로 사용
- 시설 Label은 위치 확인을 돕는 작은 Marker 또는 선택 시 확장되는 Label로 축소
- Settings와 기록은 상단의 작은 Utility Button으로 배치
- Mission은 필요할 때 펼치는 Bottom Sheet 또는 Compact Drawer로 제공
- 기존 시설 데이터, 상태와 선택 로직은 재사용
- 필요하면 모바일 전용 표현 마크업은 허용하되 동일 데이터를 중복 관리하지 않음

모바일 시안과 동작이 확정되기 전에는 현재 박스 구조를 기준으로 세부 디자인을 고정하지 않는다.

---

## Control Room

Control Room은 시설 상태를 확인하고 Mission을 시작하는 관제 공간이다. 시설마다 분위기와 비주얼은 다르지만 정보 계층, 공통 컴포넌트와 사용 흐름은 유지한다.

공통 구성:

- 시설명과 설명
- EVE 안내
- 시설 상태
- Mission Objective
- MISSION START
- MAP과 Settings 진입

Mission Objective는 긴 Checklist가 아니라 현재 해야 할 일을 설명하는 Brief다. Timer는 Play에서만 표시한다.


### 시설 상태 패널

- 읽기 전용 UI다.
- Mission 시작 전에는 저장 상태 또는 시설별 초기 상태를 표시한다.
- Mission 진행 중에는 결과를 즉시 반영한다.
- Pause는 시설 상태를 바꾸지 않는다.
- 중단 또는 재진입 시 저장된 상태를 복원한다.
- 수집 개수나 연결률처럼 연속적인 값에만 Progress Bar를 사용한다.
- 대기, 복구 중, 완료 같은 단계 상태는 문구나 Badge로 표시한다.

---

## Mission System

모든 시설은 다음 Flow를 공유한다.

    Control Room
    → Mission Guide
    → Countdown
    → Play
    → Pause / Fail / Complete
    → Explorer Archive
    → MAP

Mission Guide, Countdown, Pause, Fail과 Complete는 Control Room 위의 공통 Overlay로 제공하며 별도 페이지로 만들지 않는다.


### Mission Guide

목표를 반복하는 설명 화면이 아니라 30초 이내에 조작을 이해시키는 튜토리얼이다.

- 시설과 문제 상황
- Mission 목표
- 최대 3단계 진행 순서
- 조작 예시
- 짧은 Tip
- EVE 안내
- 시작 Button


### Countdown

시설 시스템이 활성화되는 짧은 연출이다. Nova는 Rail, Luna는 Light, Spark는 Energy, Wonder는 Stage 준비를 중심으로 표현한다.


### Play

공통 UI는 Mission, Status, Timer, EVE와 Pause로 제한한다. 시설을 운영하고 복구하는 감각을 우선한다.


### Pause / Fail / Complete

- Pause: Resume, Restart와 MAP 제공
- Fail: 과도한 실패 연출 없이 재시도와 MAP 제공
- Complete: 시설 복구 결과, Explorer Log 기록과 Passport 갱신 후 MAP 복귀

---

## 시설별 Mission

### NOVA COASTER

- 역할: Movement
- 문제: 끊어진 Rail로 열차 운행 중단
- 장르: Rail Connection Puzzle
- 핵심 조작: Rail 조각을 빈칸으로 이동하고 90° 회전
- 규칙: 출발점과 목적지는 고정, Rail끼리 직접 교환 불가, 모든 연결 방향이 일치해야 함
- 완료: 경로 완성 후 열차가 목적지에 안전하게 도착
- 난이도: Board 크기, 분기·교차·더미 Rail과 제한 시간으로 상승
- 복구 결과: Rail 점등, 열차 운행과 이동 재개


### LUNA LIGHT GARDEN

- 역할: Life
- 문제: 정원의 빛이 약해지고 중앙 Lotus 정지
- 장르: Light Prism Puzzle
- 핵심 조작: Light Fragment를 모으고 Prism을 90° 회전
- 규칙: Prism은 이동 불가, 연결된 방향으로만 빛 진행
- 완료: 꽃과 식물을 활성화하고 최종 빛을 중앙 Lotus까지 연결
- 난이도: Prism 수, 분기 경로, 빛의 색과 제한 시간으로 상승
- 복구 결과: 식물·조명·분수 활성화와 Lotus 개화


### SPARK ENERGY TOWER

- 역할: Energy
- 문제: Core 불안정으로 도시 전력 공급 중단
- 장르: Core Memory Puzzle
- 핵심 조작: 잠시 공개되는 Core의 모양·색·위치를 기억해 Slot에 Drag
- 규칙: Core는 빈 Slot에만 배치, 잘못 배치한 Core는 재이동 가능
- 완료: 모든 Core 위치 일치와 Charge 100%
- 난이도: Core와 Slot 수, 유사한 형태·색, 공개 시간과 제한 시간으로 상승
- 복구 결과: Core 활성화, 전력 공급과 도시 조명 복구


### WONDER PARADE HALL

- 역할: Joy
- 문제: Character 위치와 순서가 사라져 Parade 중단
- 장르: Parade Arrangement Puzzle
- 핵심 조작: Character를 지정 위치와 행진 순서에 맞게 Drag
- 규칙: 빈 위치에만 배치, 잘못 배치한 Character는 재이동 가능
- 완료: 모든 위치와 순서를 만족하고 Stage 활성화
- 난이도: Character 수, 유사한 외형, Hint 감소와 제한 시간으로 상승
- 복구 결과: Stage 조명, 공연과 Parade 재개


### COSMIC VOYAGE

다섯 번째 시설이 아니라 Movement, Life, Energy와 Joy가 Harmony로 연결되는 마지막 체험이다.

- 개방 조건: 네 시설 복구 완료
- 중심 경험: 경쟁이나 퍼즐보다 Gate 개방과 세계 연결 연출
- 컬러: Pearl White 중심광과 네 시설의 Aurora
- 결과: Explorer Certification, Passport 최종 상태와 Ending 연결

---

## 개발 기준

- HTML, CSS와 JavaScript ES Module을 사용하며 프레임워크를 임의로 추가하지 않는다.
- CSS로 해결할 수 있는 표현은 CSS를 우선한다.
- 기존 공통 컴포넌트 → Modifier → Wrapper → 신규 구조 순서로 검토한다.
- 시설 데이터와 화면 상태는 한곳에서 관리하고 PC·Mobile 마크업에 중복 저장하지 않는다.
- 상태 표현은 프로젝트의 is-* 클래스 방식을 유지한다.
- 언어, 잠금, 완료와 선택 상태를 정적인 마크업으로 복제하지 않는다.
- 사용자가 직접 손본 스타일은 요청 범위를 벗어나 임의로 되돌리지 않는다.
- 디자인 방향이 합의되지 않은 요소는 구현 전에 먼저 논의한다.
- Commit은 사용자가 직접 한다.

---

## 현재 상태와 다음 진입점

완료:

- 프로젝트 기반과 공통 UI Token
- PC MAP 기본·전체 복구 상태
- 시설 선택 → EVE 안내 → 지도 행동 유도
- 잠금·복구·COSMIC VOYAGE 개방 상태 동기화
- Settings의 언어·시간·전체 화면 등 현재 제공 기능
- MAP PC 1차 Refactoring
- 모바일 전용 MAP 배경과 반응형 1차 구현

진행 중:

- 모바일 MAP UI 방향 재설계

다음 작업 시작점:

1. 현재 모바일 화면과 참고 시안을 기준으로 390px Wireframe 확정
2. 접힌 Mission Panel 잔여 공간 제거
3. Recent Log를 작은 Utility 진입 방식으로 변경
4. 시설 직접 Tap이 중심이 되도록 Marker와 HUD 재구성
5. 세로·가로·Tablet 회귀 검수

그다음 단계는 Explorer Archive와 저장을 포함한 공통 시스템, Nova Coaster Control Room과 공통 Mission Flow 구현이다.

세부 일정은 roadmap.md에서 관리한다.