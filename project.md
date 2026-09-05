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

Nova Land는 지구에서는 테마파크처럼 알려져 있지만, 실제로는 Nova People이 살아가는 하나의 세계를 표현하는 인터랙티브 브랜드 경험 포트폴리오다.

사용자는 Explorer가 되어 노바랜드를 탐험하고 시설을 복구하며, 브랜드 세계가 다시 살아나는 과정을 경험한다.

일반적인 홈페이지나 점수 중심 게임이 아니라, 사용자의 행동으로 브랜드 세계가 변화하는 인터랙티브 경험을 만드는 것이 목적이다.

핵심 키워드는 탐험, 회복, 연결, 공명, 몰입과 희망이다.

### Brand Symbol: NOVA COMPASS

Nova Land의 공식 Symbol은 별과 나침반을 결합한 `NOVA COMPASS`다. MAP을 중심으로 Explorer의 탐험 구조를 정리하는 과정에서 브랜드명 `NOVA`의 별과 새로운 길을 찾는 Compass Rose가 하나의 형태로 결합되었으며, 이후 Logo, Passport Emblem과 시설별 Stamp의 공통 원형이 되었다.

- 중앙의 빛은 노바랜드의 중심 순환과 COSMIC CORE를 의미한다.
- 네 방향으로 뻗은 별은 서로 다른 역할을 가진 네 핵심 시설과 Explorer의 복구 경로를 의미한다.
- 별을 둘러싼 원형 궤도는 지구와 노바랜드 사이를 오가는 공명과 에너지의 순환을 의미한다.
- Gold는 노바랜드가 지구에 전하는 설렘, 기억과 온기를 의미한다.
- Cyan은 EVE, 관제 기술과 외부 연결 신호를 의미한다.

NOVA COMPASS는 정해진 목적지를 지시하는 표식이 아니다. 멈춘 세계에서 발견된 첫 외부 신호를 따라 Explorer가 새로운 연결과 길을 만들어가는 과정을 상징한다. Logo와 파생 Emblem은 네 방향의 별, 중앙점과 원형 궤도라는 핵심 구조를 유지하되 사용 위치에 따라 재질과 정보 밀도를 달리한다.

---

## 세계관

### 세계

- 노바랜드는 지구에서는 테마파크로 알려져 있지만, 실제로는 Nova People이 살아가는 하나의 세계다.
- 지구와 노바랜드는 공명을 통해 서로 연결되어 있다.

### 중심 순환

- 노바랜드는 지구에 즐거움과 설렘, 위로를 전한다.
- 지구인의 긍정적인 경험은 공명이 되어 노바랜드의 중심 에너지로 순환한다.
- 공명의 흐름이 약해지면 네 핵심 시설과 중심 순환도 멈춘다.
- 중심 순환이 정지하면 노바랜드 내부 관제 권한만으로는 복구 절차를 시작할 수 없으며, 지구에서 돌아온 외부 공명 응답이 최초의 복구 경로를 연다.

### Explorer

- Explorer는 지구에서 EVE의 구조 신호에 응답한 방문자다.
- 노바랜드 밖에서 온 존재이기 때문에 최초의 복구 권한을 부여받는다.
- Explorer는 영웅이 아니라 노바랜드의 회복을 돕는 조력자다.
- Explorer Passport는 제한된 복구 권한과 시설 복구 기록을 보관하는 접근 증표다.
- Level, 전투 능력치와 성장 수치는 사용하지 않는다.

### EVE

- Nova People이 만든 중앙 관제 AI다.
- 공명의 이상을 감지하고 지구로 구조 신호를 보낸다.
- Explorer를 지원하지만 직접 문제를 해결하지는 않는다.

Explorer에게 시설 상태와 다음 행동을 짧고 정확하게 안내한다. 주인공처럼 앞에 나서지 않으며 Ending에서만 평소보다 조금 따뜻한 감정을 표현한다.

EVE 대사가 타이핑되는 모든 현재·향후 페이지는 같은 전역 Interaction Rule을 사용한다. 대사 출력 중에는 화면 어느 곳이든 한 번 Click·Touch하면 전체 문장을 즉시 표시하며, 그 첫 입력은 대사 완료에만 사용하고 대상 Button이나 Link의 원래 동작은 실행하지 않는다. 대사가 완료된 뒤의 다음 입력부터 원래 화면 동작을 실행한다.

MAP과 Control Room의 EVE는 같은 `.eve-panel` HTML 구조, 공통 CSS와 공통 Controller를 사용한다. 화면별 차이는 Wrapper 배치와 Modifier로만 처리하며 Control Room은 `.eve-panel--control`에서 확대·축소와 자동 숨김을 사용하지 않는다. Control Room의 EVE 홀로그램, Signal Wave, Border와 Glow는 현재 시설의 Theme Color를 따른다. 대사, 번역 Key와 접근성 연결을 제외한 내부 구조를 화면별로 다시 만들지 않는다.

추후 EVE 대사에 실제 음성을 적용한다. 현재 EVE UI의 이퀄라이저는 장식용 반복 Animation이 아니라 실제 음성의 재생 상태와 음량 변화에 연동하며, 음성이 없거나 종료된 상태에서는 자연스럽게 대기 상태로 돌아간다. 자막은 음성 사용 여부와 관계없이 항상 제공하고, 언어별 음원 제작 방식과 대사 Skip 시 음성 처리 규칙은 음성 작업 단계에서 확정한다.

### COSMIC VOYAGE

- 다섯 번째 시설이 아니다.
- 네 핵심 시설의 에너지를 다시 하나의 순환으로 연결하는 중심 관문이다.
- 네 시설이 모두 복구되면 봉인이 해제된다.

### 세계관 요약

노바랜드는 지구에 즐거움과 설렘을 전하는 세계이며, 그 경험에서 태어난 공명이 다시 노바랜드의 중심 에너지로 순환한다.

Explorer는 EVE의 구조 신호에 응답한 지구의 방문자로, 멈춘 세계를 다시 연결하는 조력자다.

네 핵심 시설이 모두 복구되면 COSMIC VOYAGE가 다시 개방되고, 노바랜드와 지구의 연결도 회복된다.

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

라인이 있는 정보 목록(최근 기록·미션 목표·복구 현황·설정)은 `ui-info-list--lined`와 항목 클래스 `ui-info-list__item`을 공통 사용한다. 동적으로 생성하는 최근 기록에도 같은 항목 클래스를 적용하고, 항목 배치 차이만 부모 범위에서 지정한다. 항목 사이 Gap 대신 상하 Padding을 적용하고 구분선은 항목 사이에만 표시한다. 공통화는 구조와 처리 방식을 통일하는 작업이며 기존 화면의 간격을 일괄 축소하지 않는다. 목록별 항목 밀도만 공통 Padding 변수로 조절한다. 제목 구분선 다음 콘텐츠와 설명 다음 목록의 간격은 공통 16px로 유지하며 화면별로 재정의하지 않는다. Mobile 최근 기록을 접을 때만 해당 간격을 함께 접는다. 첫 항목 위와 마지막 항목 아래 Padding을 모두 제거하며, 제목과 목록의 간격은 공통 인접 요소 규칙에서 관리한다. 한 항목만 보이는 Intro 설정도 위아래 Padding이 없어야 한다.

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

선택한 언어는 공통 언어 상태로 관리하고 저장한다. Intro, Passport, MAP, Control Room의 정적 문구와 동적 EVE 대사, 오류 안내, 상태 메시지와 접근성 라벨은 화면을 다시 열지 않아도 즉시 같은 언어로 갱신한다.

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
- Input의 글자 수처럼 입력값과 함께 변하는 보조 숫자는 `facility-card__number`를 기준으로 `--font-numeric`과 `tabular-nums`를 사용한다.
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
- 입력 요소는 텍스트와 경계 사이에 1.5rem 이상의 내부 여백을 확보하고, Focus Ring은 본체에서 .375rem 떨어뜨린다. Focus Ring 바깥쪽과 Label·도움말 사이에도 최소 .75rem의 시각적 여백을 남겨 서로 붙어 보이지 않도록 한다.
- 완성 PNG 시안은 구현 원본이 아니라 비주얼 참고 자료다.

---

## 전체 사용자 흐름

    Intro
    → Explorer Registration
    → Explorer Passport 발급
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

Intro는 첫 방문자가 EVE의 구조 신호에 응답하고 이름을 등록해 Explorer가 되는 최초 진입 경험이다.

Explorer Invitation은 별도 화면으로 분리하지 않고 Intro의 구조 요청과 응답 과정에 포함한다.

Explorer Passport 발급이 완료된 뒤 기존 MAP으로 진입한다. 첫 번째 시설 안내와 MAP 내 행동 유도는 Intro가 아니라 MAP에서 시작한다.

MAP은 모든 탐험의 시작과 복귀 지점이다. 시설별 Mission은 독립적이지만 공통 Flow와 Overlay 구조를 공유한다.

---

## Intro와 Explorer 등록

Intro는 일반적인 로고 소개나 세계관 설명 영상이 아니라, 사용자가 노바랜드의 구조 신호에 응답하고 Explorer로 등록되는 최초 진입 경험이다.

사용자는 이미 Nova Land 이벤트 페이지에 진입한 상태이므로 현실의 이벤트 페이지나 테마파크 홈페이지를 다시 설명하지 않는다.

Intro의 핵심은 세계관 전체를 설명하는 것이 아니라, 사용자가 입력한 이름이 Explorer Passport에 기록되며 노바랜드의 Explorer가 되는 순간을 기억에 남게 만드는 것이다.

### 진입 조건

* Explorer 정보가 없는 최초 방문에서만 Intro를 진행한다.
* Explorer 정보와 Intro 완료 상태가 저장되어 있으면 새로고침이나 재접속 시 Intro를 반복하지 않고 기존 진행 상태로 복귀한다.
* Intro 완료 전 같은 Tab에서 새로고침하면 현재 장면과 이름·성별 선택을 임시 복원한다. 진행 중이던 Animation은 중간 Frame부터 재생하지 않고 해당 장면의 완료된 안정 상태로 복원한다.
* Settings의 처음부터 다시 시작을 실행한 경우 Explorer 정보와 진행 기록을 삭제하고 Intro부터 다시 시작한다.
* 이름 변경에서는 Intro와 최초 여권 발급 연출을 반복하지 않는다.

### Intro 진행 흐름

    노바랜드의 정지된 풍경
    → 구조 신호 포착
    → 구조 상황 안내
    → 신호에 응답하기
    → EVE 식별과 양방향 연결
    → Explorer 권한 안내
    → Explorer 이름 등록
    → Explorer 성별과 Passport 이미지 선택
    → Explorer Passport 발급
    → 이름 각인과 등록 Seal
    → WORLD MAP 연결 경로 선택
    → 여권 닫힘
    → MAP 전환

자동으로 진행되는 연출은 사용자의 이름과 Explorer 이미지 선택 대기 시간을 제외하고 약 15~20초 안에 끝낸다.

장면마다 다음 Button을 반복해서 제공하지 않는다. 사용자의 핵심 입력은 신호에 응답하기, Explorer 이름·성별·이미지 등록과 마지막 WORLD MAP 연결 선택으로 제한한다. 등록 이후 여권 발급·기록·Seal과 Route Dock 표시는 자동으로 이어지고, 사용자가 연결 경로를 선택하면 여권이 닫히며 MAP으로 전환된다.

첫 시설 이름, 시설 선택 방법과 첫 Mission 안내는 Intro에서 제공하지 않는다. 해당 안내는 기존 MAP의 EVE와 Mission 선택 흐름에서 담당한다.

### Intro 장면

#### 1. 멈춘 노바랜드

조명이 꺼지고 움직임이 멈춘 노바랜드의 전경을 짧게 보여준다.

첫 화면에서는 구조 신호, EVE, 대사, 입력 UI와 Passport를 표시하지 않는다.

사용자가 화면을 선택하면 노바랜드 배경이 약 0.8초 동안 천천히 Fade Out된다.

`NOVA LAND`와 `A WORLD IN HARMONY`의 크기와 위치는 Intro 고유 구성을 유지한다. 노출 방식만 MAP의 `WORLD MAP`과 `노바랜드 전체 보기`처럼 제목을 한 글자씩 표시한 뒤 서브 문구를 Fade Up한다.

정지된 풍경 위에는 원형 관제 궤도가 서로 다른 속도로 천천히 회전하고, 중앙 광축과 별빛이 미세하게 밝아졌다 어두워진다. 시작 문구 아래에는 스크롤로 오해할 수 있는 화살표 대신 중심점에서 원형 파동이 퍼지는 Touch Beacon을 표시한다. 텍스트는 위치를 이동하지 않으며 `prefers-reduced-motion`에서는 배경 Motion과 Touch Beacon 파동을 정지한다.

왼쪽 아래 `WORLD STATUS`는 노바랜드 전체 시스템과 지구 연결 상태를 표시한다. 상태 Sensor는 Cyan 탐색광이 끊어진 궤도를 따라 연결을 시도하다 Amber Core에서 실패하는 `Failed Beacon`으로 표현한다. 화면을 선택하면 Fade Out 동안 Core와 궤도가 Cyan으로 한 번 연결되며 다음 Signal 화면을 예고한다.

Fade Out이 끝나면 어두운 구조 신호 연결 화면으로 전환한다.

#### 2. 구조 신호 연결

Signal, Register와 Passport는 Intro의 풍경 화면과 분리된 동일한 Nova 계열의 어두운 우주 배경을 사용한다. 배경은 먼 관제 공간과 빛의 축을 암시하되 콘텐츠의 대비를 방해하지 않는다.

어두운 공간 중앙에 정체를 알 수 없는 구조 신호 수신기가 나타난다. 수신기는 중심 빛, 회전 궤도, 스캔과 좌표·동기화 상태를 함께 표시해 단순한 원형 장식이 아니라 실제 연결 장치처럼 보이게 한다.

아직 EVE의 모습과 이름은 공개하지 않는다.

구조 신호는 대사가 출력되는 동안 밝기와 크기가 미세하게 변하며 맥동한다. 대사가 끝나면 약한 대기 상태로 돌아간다.

Signal 화면 진입 직후에는 수신기만 화면 중앙에 표시한다. 수신기 점등, Scan, `SOURCE`, `SYNC RATE`와 `SIGNAL LOCKED`를 순차 표시하고 Lock이 완료되면 수신기가 왼쪽으로 이동하며 오른쪽 안내·Telemetry·응답 영역이 열린다. 응답 영역이 완전히 열린 뒤 Button을 활성화한다.

EVE가 공개되기 전의 Channel 표기는 `NL-SOS / 001`을 사용한다. 수신기의 `SOURCE`는 `NOVA LAND`, Telemetry의 `SIGNAL`은 현재 통신 품질을 표시한다. 회전 궤도에는 추적점과 밝은 Arc를 두어 실제 회전 방향을 확인할 수 있게 한다.

안내 문구:

> 구조 신호를 수신했습니다.

이어서 현재 상황을 짧게 안내한다.

> 노바랜드의 중심 순환이 멈추고 있습니다.
> 외부 응답 채널을 요청합니다.

Button:

> 신호에 응답하기

공명, COSMIC VOYAGE, 네 시설의 상세 역할과 전체 세계관은 Intro에서 길게 설명하지 않는다.

#### 3. EVE 등장과 Explorer 신원 등록

사용자가 신호에 응답하면 Button을 비활성화하고 구조 신호의 빛이 입자로 분해되기 시작한다.

입자는 약 1초 동안 하나의 형태로 모이며 EVE가 처음 홀로그램으로 나타난다.

홀로그램은 하단 투사 장치 점등, 투사광 확장, EVE 조립 순서로 등장한다. 허벅지 아래로 갈수록 형상이 투명해지고 Scan Fragment와 빛 입자가 흩어지도록 표현해 이미지가 수평으로 잘려 보이지 않게 한다. 조립이 끝난 뒤에도 하단 입자와 투사광은 약하게 움직이며 연결 중인 상태를 유지한다.

EVE 조립이 완료된 뒤 안내 대화와 2단계 Explorer 등록 Form을 차례로 표시한다. Form이 완전히 표시되기 전에는 조작할 수 없으며, 표시가 끝난 뒤 Explorer 이름 입력 항목으로 Focus를 이동한다.

PC에서는 EVE의 손과 허리 아래까지 보이는 중간 길이의 홀로그램을 사용하고, Mobile에서는 등록 Form을 가리지 않는 범위에서 상반신 중심으로 자연스럽게 Crop한다.

EVE의 안내는 MAP의 EVE 대사처럼 한 글자씩 출력한다. 자기소개, 외부 연결 권한과 이름 요청까지 네 줄을 하나의 연속 대사로 출력하고 앞선 문장을 교체하지 않는다. 네 줄이 모두 출력되기 전에는 이름 등록 Form을 열지 않으며, 출력 중 입력은 전역 EVE Interaction Rule을 따른다. `prefers-reduced-motion`에서는 타이핑을 생략하고 완성된 문장을 표시한다.

첫 안내에서 신호 발신자의 정체를 공개한다.

> 응답을 확인했습니다.
> 저는 노바랜드 중앙 관제 AI, EVE입니다.

두 번째 안내에서 외부 응답이 필요한 이유와 이름 등록을 연결한다.

> 중심 순환의 복구에는 외부 연결 권한이 필요합니다.
> Explorer Passport에 기록할 이름을 알려주세요.

`01 / 02`에서는 Explorer 이름 하나만 입력한다.

* 한글, 영문과 숫자 사용 가능
* 단어 사이 공백 사용 가능
* 2~12자
* 앞뒤 공백 제거
* 이름으로 사용할 수 없는 특수문자는 제한
* 빈 값이나 글자 수 초과 시 입력 영역 가까이에 짧은 오류 안내 표시

입력 Label과 오류 문구는 접근성 API에서 확인할 수 있어야 한다.

입력 Label:

> Passport에 기록할 이름

Button:

> 다음 단계

이름 검증이 완료되면 `02 / 02`에서 Passport에 등록할 성별과 Explorer 이미지를 선택한다.

`01 / 02`에서 `02 / 02`로 전환할 때 기존 단계가 짧게 Fade·Slide Out되고 Form 높이가 다음 콘텐츠에 맞춰 변한 뒤 제목, 안내와 선택 Card가 순차적으로 Fade·Slide In된다. 반대 방향도 같은 흐름을 유지하며, 전환이 끝난 뒤 다음 단계의 첫 조작 항목으로 Focus를 이동한다. `prefers-reduced-motion`에서는 이 이동 연출을 생략하고 상태와 Focus만 즉시 변경한다.

* 여성 Explorer와 남성 Explorer 두 가지를 제공한다.
* 최초에는 어느 항목도 선택하지 않는다.
* 각 선택지는 실제 Radio와 공통 `ui-choice-card`를 결합하고 Card 전체를 선택 영역으로 사용한다. 이미지와 텍스트가 함께 필요한 선택지는 대상 종류와 무관한 `ui-choice-card--media`, `ui-choice-card__media`, `ui-choice-card__content` 구조를 공유한다.
* 선택 상태는 Cyan 테두리, Glow와 Check로 표시한다.
* 키보드 방향키, Focus Ring과 Screen Reader에서 동일한 선택 상태를 확인할 수 있어야 한다.
* 이름 수정 Button으로 `01 / 02`에 돌아가도 기존 성별 선택은 유지한다.
* 여성·남성 Explorer는 한국인 얼굴과 실제 인체 비율을 사용하고 눈높이, 머리 크기, 어깨와 상체 Crop을 동일하게 맞춘다.
* 두 Portrait는 `assets/images/common`의 공통 자산을 사용하며 Intro 선택 Card, Passport와 MAP Explorer Profile이 같은 성별 이미지를 공유한다.

최종 Button:

> Explorer로 등록

#### 4. Explorer Passport 발급

Explorer 등록을 선택하면 선택한 이미지 Card가 강조되고, 신원 정보의 시각적 흐름이 Passport의 이름과 Portrait 영역으로 이어진다.

이름을 알아보기 어려운 입자로 완전히 분해하지 않는다.

Passport는 노바랜드가 Explorer에게 건네는 첫 번째 상징 아이템이자 제한된 복구 권한과 이후 시설 복구 기록을 보관하는 접근 증표로 화면에 나타난다.

다음 정보가 순서대로 기록된다.

* Explorer 이름
* Explorer ID
* 선택한 성별과 Explorer Portrait
* 출신 위치 Earth
* 복구 접근 권한
* 시설 복구 진행 0 / 4
* 등록 상태

발급일과 권한 상태는 왼쪽 권한 증명 페이지에 기록한다. 오른쪽 신원 페이지의 등록 상태는 `PENDING`으로 시작하고, 이름과 식별 정보가 기록된 뒤 Explorer Registered Seal을 찍으면 `REGISTERED`로 변경한다.

Passport 발급 중에는 `Explorer Passport 발급 중...`, `외부 공명 및 복구 권한 확인 중...`, `{사용자 이름} Explorer 식별 정보 기록 중...` 상태를 한 줄씩 타이핑하며 이전 처리 상태를 누적 표시한다. 화면을 누르면 이전 줄은 유지하고 현재 입력 중인 줄만 즉시 완성한다. 등록 완료 시 누적 상태를 지우고 완료 대사를 새로 타이핑한다.

EVE는 이 장면에서 처음으로 사용자의 이름을 부른다.

> Explorer {사용자 이름}. 외부 복구 권한이 등록되었습니다.
> WORLD MAP 연결 경로를 열었습니다.

#### 5. MAP 전환

등록 Seal이 완료되면 Passport를 바로 닫거나 시간만으로 MAP으로 자동 전환하지 않는다.

Passport 아래에 `WORLD MAP CONNECTION` Route Dock을 표시한다. 일반적인 다음 Button이 아니라 항로 상태, 방향성과 연결 준비 상태를 보여주는 관제 인터페이스로 표현한다.

사용자가 Route Dock의 연결 경로를 선택하면 Passport가 닫히며 표지에 Explorer 이름이 작게 각인된다.

표지의 NOVA LAND Emblem이 짧게 빛난 뒤 Passport가 화면에서 정리되고 기존 MAP으로 전환된다.

Intro 종료 직전에 첫 번째 시설이나 다음 행동을 안내하는 EVE 대사는 사용하지 않는다.

### Intro 비주얼 원칙

* 실제 여권의 소장감과 노바랜드 관제 기술의 정제된 빛 표현을 결합한다.
* 마법책이나 낡은 판타지 소품처럼 표현하지 않는다.
* 과도한 Glitch, 통신 잡음과 공포 분위기를 사용하지 않는다.
* 긴 텍스트 설명보다 멈춘 공간, 조명, 사운드와 Passport 발급 연출로 상황을 전달한다.
* Signal부터 Passport까지 공유하는 우주 배경은 전경 UI보다 명도와 채도를 낮게 유지한다.
* PC와 Mobile 모두 같은 내용과 순서를 사용하되 화면 비율에 맞게 배치와 크기를 조정한다.
* `prefers-reduced-motion` 환경에서는 이동과 3D 회전을 줄이고 Fade와 상태 전환 중심으로 제공한다.

---

## 공통 시스템

### Navigation과 뒤로가기

Welcome과 MAP 기본 화면은 각 Flow의 Root로 사용하며 공용 뒤로가기 Button을 표시하지 않는다. 그 외 Intro 장면, 등록 단계, Passport, Overlay, Mobile Panel과 Control Room에서는 화면 왼쪽 위에 공용 `ui-back-button`을 표시한다. 버튼은 외곽선과 배경 없이 화살표 Icon만 노출하고, 44px 터치 영역과 Focus Ring은 유지한다.

공용 Button은 꼬리가 있는 왼쪽 화살표 Icon만 시각적으로 표시하고 실제 조작 영역은 최소 44×44px로 확보한다. `aria-label`은 현재 상태에 맞춰 이전 목적지를 설명하며 Mobile에서는 Safe Area를 반영한다.

화면 Button, 키보드와 Mobile Browser의 뒤로가기는 별도 로직으로 분리하지 않고 같은 History 상태를 사용한다. 공용 뒤로가기 Button의 표시와 목적지는 Navigation Controller에서 관리하며, 화면 표시 함수가 별도로 숨기지 않는다. Control Room에서 Settings를 닫으면 MAP 복귀 Button을 유지하고, Mission Preview 진입도 MAP 복귀 이력을 보존한다.

    Overlay 또는 Mobile Panel 닫기
    → Intro 세부 단계 복귀
    → Passport에서 Explorer 선택 복귀
    → Control Room에서 MAP 복귀
    → Welcome 또는 MAP Root의 Browser 기본 동작

Intro에서는 `Welcome → Signal → Register 01 / 02 → Register 02 / 02 → Passport` 순서로 History를 기록한다. 역방향 이동 시 실행 중인 장면 Timer와 Transition을 정리하고 이름과 성별 선택값을 유지한다. Passport에서 돌아오면 `02 / 02` 선택 상태를 복원하고, Browser Forward로 Passport에 재진입하면 완료된 발급 상태를 복원한다.

Overlay와 Mobile Panel은 화면 이동보다 먼저 닫는다. 열린 Mission도 화면 이동 시 닫고 Timer·전환 예약을 정리하며 진행 중인 Checkpoint를 저장한다. 재접속 복원 시 MAP 복귀 경로를 먼저 만들고, 명시적인 MAP 복귀는 외부 Browser History에 의존하지 않는다. Control Room에서 MAP으로 돌아오면 진입했던 시설 Card로 Focus를 복원한다. Intro 발급이 완료된 뒤에는 저장된 Explorer가 완료된 Intro History로 다시 진입하지 않도록 건너뛴다.


### Explorer Archive

Explorer Log와 Explorer Passport는 하나의 공통 Overlay 안에서 동등한 두 Tab으로 제공한다.

Overlay 제목은 Explorer 이름을 Accent로 강조하며, 한국어에서는 `{이름} 님의 여정 기록`으로 표시한다.

* Recent Log의 기록 보기: 탐험 기록 Tab으로 진입
* Explorer Profile 오른쪽 Passport Button: 탐험가 패스포트 Tab으로 진입
* Explorer Profile의 Portrait와 이름은 정보를 표시하며 Button 역할을 갖지 않음
* Passport의 이름과 성별 항목에 있는 Edit Button: 해당 정보만 수정

Explorer Log는 사건과 Mission 완료 내역을 시간순으로 보여준다. 기록 수와 관계없이 제목과 Log 시작 위치를 상단에 고정하고 새 기록을 아래로 누적하며, 사용 가능한 높이를 넘으면 Log 영역을 Scroll한다.

Explorer Passport는 사용자의 이름, 시설별 복구 상태, Stamp, 쿠폰과 최종 탑승권을 수집형 기록으로 보여준다.

둘의 역할은 합치지 않는다.

#### Explorer Passport 역할

Explorer Passport는 단순 프로필 카드가 아니라 노바랜드 안에서 Explorer를 나타내고 전체 여정을 기록하는 상징 아이템이다.

최초 Explorer 등록 시 발급되며, 사용자가 입력한 이름이 Passport에 직접 기록되는 연출을 제공한다.

시설을 복구할 때마다 해당 시설 Stamp와 완료 기록이 추가된다. NOVA 쿠폰은 복구 시 `pending` 상태와 획득일을 저장하고 Passport에 ‘쿠폰 준비 중’으로 표시한다. 기존 복구 기록도 동일한 상태로 보완한다. 실제 혜택·사용 조건·발급 방식이 확정되기 전에는 사용 버튼이나 지급 완료 표시를 제공하지 않는다.

네 시설 복구 후 COSMIC VOYAGE가 개방되면 최종 탑승권과 Explorer Certification이 추가된다.

#### Passport 표지

표지는 실제 여권의 소장감과 노바랜드의 미래적인 관제 기술을 결합한다.

기본 구성:

* NOVA LAND Emblem
* EXPLORER PASSPORT
* Explorer 이름 각인
* Pearl White 계열의 얇은 Line
* 등록 상태 또는 식별 정보

기본 색상은 짙은 Navy 또는 Charcoal 계열을 사용한다.

PC에서 닫힌 Passport 표지는 펼친 여권의 한 페이지와 같은 절반 너비를 사용한다. 오른쪽 Explorer 신원 페이지는 고정하고 표지 앞면과 왼쪽 권한 증명 페이지를 하나의 Leaf 앞·뒷면으로 구성하여, 닫힌 상태에서 화면 중앙에 놓인 Leaf가 가운데 책등을 축으로 왼쪽으로 펼쳐진다. 내부 페이지를 별도로 지연 노출하지 않고 Leaf의 회전에 따라 자연스럽게 드러낸다. Mobile에서는 한 페이지 크기의 기존 표지 너비를 유지하고, 권한 증명 페이지가 펼쳐진 뒤 신원 기록 시점에 Explorer 신원 페이지로 화면 중심을 이동한다.

시설 복구마다 표지 전체를 크게 변경하지 않는다.

* 시설 복구: 시설 컬러가 표지 가장자리에 미세하게 누적 (현재 NOVA 복구 상태는 Violet 가장자리로 반영)
* 네 시설 복구: Aurora Seal 활성화
* COSMIC VOYAGE 완료: 최종 Passport 상태 활성화

스탬프와 기록이 중심이며 표지 장식 변화는 보조로 사용한다.

Passport의 기관 Emblem과 Stamp는 반응형에서도 선명도를 유지하는 독립 SVG Asset으로 관리한다. 표지 Emblem은 돌출된 금속 양각과 금박, 첫 장 권한 Emblem은 정교한 보안 인쇄, Stamp는 끊긴 외곽선과 미세한 잉크 흔들림을 가진 물리적 도장으로 구분한다. 세 표식은 NOVA 나침반 별을 공유하며, Stamp는 공통 원형 인장 구조를 `stamp-{facility}-{state}.svg` 형식으로 확장하여 Explorer 등록, Coaster, Luna 등 시설별 완료 기록의 중앙 Symbol과 문구만 변경한다.

#### Passport 페이지 구성

##### 첫 번째 펼침: Explorer 정보

Passport의 왼쪽과 오른쪽 페이지는 `Label → Content`의 공통 내부 구조와 콘텐츠 시작 위치를 사용한다. Footer는 페이지 내용에 필요한 경우에만 선택적으로 사용하고 첫 번째 왼쪽 권한 페이지에는 두지 않는다. 각 페이지에서 달라지는 정보 배치만 Modifier로 분리하며, 상단 Label과 뒤따르는 Content 사이 여백은 화면과 페이지 종류에 관계없이 `2rem`으로 동일하게 유지한다.

왼쪽 페이지:

* NOVA LAND AUTHORITY 공식 문양
* 외부 공명 응답과 제한된 복구 권한 안내
* 발급일
* 접근 권한 상태
* 권한 안내와 발급 정보는 첫 발급 화면의 기존 중앙 정렬과 묶음감을 유지

오른쪽 페이지:

* 사용자가 선택한 여성 또는 남성 Explorer Avatar ID Portrait
* Explorer 이름
* Explorer ID
* 성별
* 출신 위치 Earth
* 시설 복구 진행 수
* 현재 상태
* 이름 변경 진입
* 성별과 Portrait 변경 진입
* ID Portrait는 세로로 긴 기존 비율을 유지하고 얼굴 식별이 선명한 크기로 표시

실제 사용자 사진을 요청하거나 업로드하지 않는다. 성별은 여성과 남성 중 Passport Portrait를 선택하기 위한 최소 항목으로만 저장하며, 나이와 추가 개인정보는 수집하지 않는다.

ID Portrait는 사용자가 제공하는 개인정보가 아니라 Nova Land가 발급하는 여성·남성 Explorer Avatar 중 하나를 사용한다. 사용자별로 달라지는 신원 정보는 이름, Explorer ID, 성별과 선택한 Portrait로 제한한다.

이름과 성별 변경은 Explorer Passport의 해당 항목에 배치한 Edit Button에서 진행하고 최초 발급 연출은 반복하지 않는다. 성별을 변경하면 연결된 Passport와 MAP Portrait를 함께 변경하며 Explorer ID, 발급일과 진행 기록은 유지한다.

##### 두 번째 펼침: NOVA / LUNA

왼쪽 페이지:

* NOVA COASTER
* Movement
* Stamp 영역
* 완료일
* 쿠폰 상태

오른쪽 페이지:

* LUNA LIGHT GARDEN
* Life
* Stamp 영역
* 완료일
* 쿠폰 상태

##### 세 번째 펼침: SPARK / WONDER

왼쪽 페이지:

* SPARK ENERGY TOWER
* Energy
* Stamp 영역
* 완료일
* 쿠폰 상태

오른쪽 페이지:

* WONDER PARADE HALL
* Joy
* Stamp 영역
* 완료일
* 쿠폰 상태

##### 마지막 펼침: COSMIC VOYAGE

개방 전:

* 이름 대신 ???
* 봉인된 Harmony 문양
* 네 시설 복구 조건
* 비활성화된 최종 영역

개방 후:

* COSMIC VOYAGE 이름 공개
* Harmony Seal
* 최종 탑승권
* Explorer Certification
* EVE의 마지막 기록

최종 탑승권은 현실 이벤트 보상이고 Explorer Certification은 세계관 안에서의 임무 완료 기록이다. 두 항목의 역할을 합치지 않는다.

#### 시설 Stamp

각 Stamp는 시설의 역할과 문양을 반영한다.

* NOVA COASTER: Rail과 원형 궤도
* LUNA LIGHT GARDEN: Lotus 또는 빛나는 꽃
* SPARK ENERGY TOWER: Energy Core와 방사형 Line
* WONDER PARADE HALL: Parade Emblem 또는 Star
* COSMIC VOYAGE: 네 시설 컬러가 Pearl White 중심으로 연결된 Aurora Seal

복구 전에는 완성 Stamp를 흐리게 미리 노출하지 않고 얇은 압인 또는 빈 Stamp 영역만 보여준다.

시설 복구 시 다음 순서로 연출한다.

```
해당 Passport 페이지 자동 표시
→ Stamp 위치 정렬
→ Stamp가 눌림
→ 시설 컬러 또는 잉크가 퍼짐
→ 완료일 기록
→ 쿠폰 준비 중 상태 저장·표시
```

시설 복구 결과, Stamp와 쿠폰 지급을 여러 Popup으로 반복하지 않고 Passport 안에서 하나의 보상 흐름으로 연결한다. 실제 NOVA 복구 완료는 결과를 5초 표시한 뒤 Passport 기록으로 자동 이동하며, 기록 확인 Button을 누르면 즉시 이동한다. 최초 획득 때만 NOVA 도장 눌림·잉크 농도 변화 후 완료일을 표시하고, 일반 재열람·Browser History 복귀에서는 획득 연출을 반복하지 않는다. 모션 감소 설정에서는 도장 이동을 생략하고 최종 기록을 즉시 표시한다.

#### Passport 페이지 이동

PC에서는 실제 책처럼 좌우 두 페이지를 함께 보여준다.

첫 펼침은 왼쪽 권한 증명·오른쪽 Explorer Identity이며, NOVA 기록 펼침은 왼쪽 시설 기록·오른쪽 빈 종이로 구성한다. 시설 기록의 오른쪽에 Explorer Identity를 반복하지 않고, 이전 펼침으로 돌아갈 때 신원 내용을 복원한다.

Mobile에서는 가독성을 위해 한 페이지씩 보여주며 같은 페이지 순서와 데이터를 사용한다.

일반 Archive 열람과 복구 완료 직후의 자동 열람은 동일한 저장 Stamp를 기준으로 시설 기록을 표시한다. 시설 기록을 열어도 최초 권한·신원 페이지는 보존하며, 이전·다음 이동으로 다시 열 수 있어야 한다.

최초 발급 Intro의 Mobile에서는 표지 이후 권한 증명 페이지를 먼저 보여주고, 신원 기록이 시작될 때 Explorer 신원 페이지로 자동 이동한다. 일반적인 Archive 열람에서만 사용자가 페이지 이동을 직접 제어한다.

페이지 이동은 종이 하단 귀퉁이 인터랙션을 우선한다.

귀퉁이는 책 바깥으로 돌출된 삼각형 장식이 아니라 종이 안쪽으로 접힌 형태로 표현한다. 접힌 종이 뒷면과 접힘선의 그림자를 구분하고, 그 아래의 다음 장이 드러나도록 한다. 접혀 올라온 면과 아래에 드러난 면은 같은 접힘선을 경계로 비슷한 면적이 되도록 맞춘다.

접힌 귀퉁이는 세로가 가로보다 조금 긴 비율로 표현한다. 대각선 접힘선은 완만한 곡선으로 연결하고 들린 끝부분도 부드럽게 말린 곡선으로 표현한다. 아래 장은 고정하고 접힌 면만 접힘선을 축으로 들렸다 내려오도록 움직이며, 정지 상태에서도 펄럭임을 알아볼 수 있는 폭을 유지한다. 반복적인 크기 확대·축소는 사용하지 않는다. 페이지 회전 중에는 귀퉁이를 즉시 숨기고, 회전이 끝난 뒤 새 페이지의 귀퉁이가 부드럽게 접혀 나타난다. 화살표 없이 종이가 계속 가볍게 펄럭이는 움직임으로 클릭 가능성을 안내한다. Hover·Focus 중에도 펄럭임을 유지하고, 진입·해제 시 귀퉁이 크기가 부드럽게 전환되며 페이지 방향 안내를 표시한다. 넘길 페이지가 있는 Passport를 현재 페이지 로드 후 처음 열람할 때만 공통 토스트로 모서리 안내를 제공한다. 공통 토스트는 PC·Mobile 모두 표시 완료 시 화면 하단에서 1rem 떨어진 위치에 놓인다. 안내는 공통 토스트의 2.2초 표시 시간을 따르며, 종이 위의 별도 안내 말풍선은 사용하지 않는다. 전환은 최초 등록 표지와 같은 1.15초 회전과 가속 곡선을 사용하며, 종이 크기를 축소하지 않고 앞·뒷면의 바깥 모서리 라운드를 유지한다. 동작 줄이기 설정에서는 귀퉁이 펄럭임을 끈다.

* 오른쪽 아래 접힌 귀퉁이: 다음 페이지
* 왼쪽 아래 접힌 귀퉁이: 이전 페이지
* 이동할 페이지가 있을 때만 해당 귀퉁이 표시
* PC Hover 시 귀퉁이가 조금 더 들리며 Click 가능 상태 안내
* Click 또는 Tap 시 자동 페이지 넘김
* 귀퉁이는 접근 가능한 이름을 가진 Button으로 구현하며 Enter·Space로도 이동 가능
* 종이를 직접 끌어당기는 Drag 방식은 사용하지 않음
* Mobile의 실제 터치 영역은 보이는 귀퉁이보다 넓게 확보
* 하단 Page Number는 화면에 표시하지 않고, 현재 페이지 정보는 스크린리더 안내로만 제공
* 마지막 페이지에는 다음 페이지 귀퉁이를 표시하지 않음

새로운 페이지나 기록이 처음 활성화되면 해당 귀퉁이를 한 번만 미세하게 움직여 다음 행동을 안내할 수 있다.

페이지 넘김은 CSS 3D Transform을 사용할 수 있으나, 콘텐츠 가독성과 Mobile 성능을 우선한다.

`prefers-reduced-motion`에서는 3D 회전을 줄이고 짧은 Fade 또는 Slide 전환으로 대체한다.

#### Passport 효과음

* 페이지 넘김: 짧은 종이 넘김음
* Stamp: 단단하고 짧은 도장음
* Passport 닫힘: 가벼운 책 닫힘음

효과음은 Settings의 효과음 설정을 따르며, 소리가 없어도 상태 변화를 이해할 수 있어야 한다.

#### Passport 자동 표시

* 최초 등록: Explorer 정보 페이지 발급
* NOVA 완료: NOVA Stamp 페이지 자동 표시
* LUNA 완료: 같은 펼침의 LUNA 영역 강조
* SPARK 완료: SPARK / WONDER 펼침으로 자동 이동
* WONDER 완료: 같은 펼침의 WONDER 영역 강조
* 네 시설 완료: COSMIC VOYAGE 페이지 자동 표시
* COSMIC VOYAGE 완료: 최종 탑승권과 Explorer Certification 공개

사용자가 일반적으로 Passport를 열 때의 MAP 진입 위치와 구체적인 Trigger UI는 현재 구현된 MAP 구조를 기준으로 별도 확정한다. 최초 발급 Intro에서는 Passport 기록 완료 후 `WORLD MAP CONNECTION` Route Dock을 통해서만 MAP으로 진입한다.


### Settings

Intro의 Welcome에는 Settings Button을 표시하지 않는다. Signal부터 오른쪽 위에 외곽선과 배경이 없는 가로 Sliders 형태의 Settings Icon Button을 표시한다. Settings와 Back Icon은 같은 `1.65rem` 크기로 통일한다. Intro에서 연 Settings는 한국어와 영어 선택만 제공하며, MAP에서 연 Settings는 현재 구현된 전체 설정 항목을 제공한다.

Intro에서 선택한 언어는 Passport와 MAP 진입 이후에도 유지하고, 새로고침과 재접속에서도 복원한다.

공통 설정 기획 항목:

- 한국어 / 영어
- BGM 음량
- 효과음
- Day / Sunset / Night
- 전체 화면 On / Off
- 처음부터 다시 시작
- 설정 초기화하기

현재 구현은 언어·전체 화면·처음부터 다시 시작이며 사운드는 준비 중으로 표시한다. BGM·효과음 조절, 시간대 선택과 환경 설정만 초기화하는 기능은 후속 구현 대상이다. 미구현 항목을 이번 UI 정리에서 삭제한 것으로 해석하지 않는다.

브라우저 Fullscreen API는 사용자의 직접 입력에서만 실행하고,
브라우저가 전체 화면을 해제하면 설정 상태도 동기화한다.

처음부터 다시 시작은 Explorer 정보, Intro 완료 상태, Passport, 쿠폰과 전체 진행 기록을 초기화하며 환경 설정은 유지한다.

초기화가 완료되면 Intro의 Welcome부터 다시 시작한다. Welcome → 구조 신호 → Explorer 이름·성별 등록 → Passport 발급 순서를 처음부터 진행하며 언어 설정은 유지한다.

설정 초기화하기는 언어, 시간과 사운드 설정만 기본값으로 되돌린다.

두 초기화 기능은 서로 영향을 주지 않으며 모두 확인 절차를 거친다.

확인이 필요한 공통 UI는 Native Dialog 기반의 Common Dialog를 사용한다. 모든 Dialog는 `Header → Content → Actions` 구조를 공유하고 Content 안에 Message 또는 Form Field를 배치한다. Alert는 확인 Button 하나, Confirm은 취소와 확인 Button을 제공하며, Explorer 이름·성별 수정처럼 Form이 필요한 Popup도 같은 Native Dialog 기반을 사용한다. 처음부터 다시 시작은 Browser Confirm 대신 Danger Tone의 Common Confirm을 사용하고 취소에 기본 Focus를 둔다.


### Time

Day, Sunset과 Night는 배경, 조명, 반사와 분위기를 바꾸는 브랜드 경험용 시스템이다. Mission 난이도나 결과에는 영향을 주지 않는다.


### Save Data

새로고침이나 재접속은 초기화가 아니라 기존 Explorer로 이어서 진행하는 것으로 취급한다.

Explorer 신원과 Intro 완료 상태는 `novaLandExplorer`, 시설 이후의 진행 기록은 Version을 가진 `novaLandProgress`로 분리해 저장한다. 진행 기록은 Explorer ID에 연결하며 다른 Explorer의 데이터이거나 지원하지 않는 Version이면 현재 Explorer의 초기 상태로 다시 생성한다.

`novaLandProgress`는 시설별 잠금·진행·완료와 완료 시각, Mission 단계·Checkpoint·시도 횟수, 번역 Key 기반 Log Event, 획득한 시설 Stamp와 쿠폰 준비 상태·획득 시각을 관리한다. 화면에 표시된 번역 문장이나 이미지 자체는 저장하지 않고 렌더링 시 현재 언어와 시설 Data를 사용한다.

개발 확인용 `?map-state=restored`는 저장 데이터를 변경하지 않는 Preview로만 동작한다. 처음부터 다시 시작은 Explorer와 진행 기록을 함께 삭제하고 환경 설정은 유지한다.

현재 저장하는 상태와 이후 기능에서 연결할 상태는 다음과 같다.

- Explorer 이름, 성별과 Passport 이미지
- 시설 잠금·진행·완료 상태
- Mission 진행 상태
- 퍼즐 진행 상태
- 남은 시간
- Explorer Log
- Explorer Passport
- Recent Log
- 언어, 시간과 사운드 설정
- Intro 완료 상태
- Explorer Passport 발급·Stamp·쿠폰 상태
- COSMIC VOYAGE 탑승권과 Explorer Certification 상태

Mission 진행 중 새로고침하면 진행 중이던 Mission 화면으로 복귀하고 일시정지 상태를 표시한다.

사용자가 계속 진행을 선택하면 저장된 상태와 남은 시간부터 그대로 Mission을 이어서 진행한다.

Mission Guide와 Pause는 현재 화면을 유지하며 Countdown은 처음부터 다시 시작한다.

Complete 이후에는 완료 상태와 기록을 유지한다.

Explorer 정보와 Intro 완료 상태가 존재하면 일반적인 새로고침과 재접속에서는 Intro를 반복하지 않는다.

처음부터 다시 시작으로 Explorer 정보가 초기화된 경우에만 Intro와 Explorer Passport 최초 발급을 다시 진행한다.

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
    → 선택한 지도 시설 Card 활성화
    → Guide Glow와 행동 유도
    → 지도 시설 Card 선택
    → Control Room 진입

- Mission List와 지도 Card는 같은 시설 상태를 공유한다.
- MAP 최초 진입 시 지도 시설 Card는 모두 비활성 상태다.
- Mission List에서 선택한 시설만 EVE 안내 종료 후 지도 Card가 활성화된다.
- 다른 Mission을 선택하면 기존 지도 Card는 다시 비활성화된다.
- Mission List 선택만으로 Control Room에 진입하지 않는다.
- Mission List 선택 → 지도 시설 Card → Control Room 진입 후 MAP으로 돌아와도 해당 Mission 선택과 지도 Card 활성 표시·조작 가능 상태를 유지한다. 다른 Mission을 선택하거나 복구 완료로 진행 단계가 변경될 때만 갱신한다.
- 관제실 진입 시 해당 시설의 MAP 미션 목록 선택과 시설 카드 진입 가능 상태를 함께 복원한다. 저장된 게임 재접속·Mission Preview·일시정지에서 관제실을 거쳐 MAP으로 복귀하는 경우에도 목록을 다시 누르지 않고 해당 시설로 진입할 수 있어야 한다. 잠긴 시설은 활성화하지 않는다.
- 관제실 진입 Button 문구는 저장된 진행 여부와 무관하게 MISSION START로 유지한다. 계속하기는 Pause의 재개 동작에 사용하며, 저장된 진행 복원 기능과 관제실 Button 이름을 혼동하지 않는다.
- 선택 상태는 Border와 Background로 구분한다.
- Guide Glow는 아직 조명이 꺼진 현재 진행 시설을 안내할 때만 시설 전체를 감싸는 형태로 나타난다.
- 복구 완료로 조명이 켜진 시설과 개방된 COSMIC VOYAGE에는 배경 Guide Glow를 사용하지 않는다.
- EVE 안내와 같은 내용을 Toast로 중복 표시하지 않는다.
- EVE Signal Wave는 음성이 끝난 순간의 움직임에서 자연스럽게 정지한다.
- PC EVE는 오른쪽 하단 위치를 고정하고 발화 중에만 크기와 Glow를 확장해 강조한다.
- EVE 안내가 끝나면 마지막 문장을 잠시 유지한 뒤 대기 크기로 돌아간다.
- 전체 복구 이후에도 시설 선택과 안내 반응은 유지한다.


### MAP 상태 표현

MAP 상단의 시간·날씨는 실제 환경 정보로 오인할 수 있는 고정 수치를 표시하지 않고 준비 상태를 명시한다. 지도 시설 카드와 Mission 목록 모두 시설 역할을 유지한다. Mission 목록의 잠긴 시설도 역할을 표시하고, 그 아래에 ‘선행 시설명 복구 후 열립니다.’ 형식으로 잠금 조건을 별도 안내한다. MAP 프로필 옆 Passport 진입 버튼은 알아보기 쉬운 연필 아이콘을 사용한다.

- 활성·복구 시설 Marker: 순서 번호
- 잠긴 시설 Marker: 잠금 Icon
- 복구 완료: 시설 고유 컬러와 복구 완료
- 전체 복구: 4 / 4, COSMIC VOYAGE 개방, EVE 완료 안내와 Recent Log 갱신
- 최초 진입에서는 전체 복구 배경을 먼저 보여준 뒤 전체 시설이 꺼진 Dim 배경으로 전환한다.
- 최초 EVE 안내 도중 Mission을 바로 선택해도 Dim 배경 전환은 취소되지 않는다.
- 시설을 복구할 때마다 해당 시설의 조명이 켜진 누적 배경으로 전환한다.
- 네 시설 복구 직후에는 COSMIC VOYAGE만 꺼진 배경을 보여준다.
- COSMIC VOYAGE 출현과 EVE 안내가 끝나면 전체 조명이 켜진 배경으로 전환한다.

개발 중 전체 복구 상태는 URL의 ?map-state=restored로 확인한다.


### Recent Log

최근 시설 복구, Mission 완료와 시설 개방을 짧게 보여준다. 전체 기록은 Explorer Archive에서 확인한다.


### 모바일 MAP 후순위 판단 지점

모바일 MAP은 기존 세로 배경 위에 시설별 복구 상태를 반영한 밝기 마스크를 사용한다. 미복구 영역은 어둡게 유지하고 완료한 시설 주변부터 밝아지며 네 시설 완료 시 전체 밝기를 복원한다. 이 방식은 조명 픽셀을 개별 제어하는 전용 상태 이미지와는 구분한다. 모바일 전용 세로 배경과 1차 반응형 구조는 구현되어 있지만 전체 HUD 디자인은 확정되지 않았다. 현재 구현을 완료본으로 간주하지 않는다. 시설명 말줄임과 게임 Board 가로 스크롤·조작부 세로 스크롤의 동시 사용은 전체 모바일 디자인 단계에서 개선한다. 시간·날씨의 준비 중 표시는 실제 기능 연결 전까지 유지한다.

확인된 문제:

1. 접힌 Mission Panel에 Divider와 빈 공간이 남는다.
2. Recent Log가 지도에 비해 크고 시선을 과도하게 차지한다.
3. PC Glass Panel을 축소한 박스형 UI가 모바일 게임 화면과 어울리지 않는다.
4. 시설 비주얼보다 Card가 먼저 보여 지도 속 시설을 직접 선택한다는 느낌이 약하다.
5. 작은 화면에서 Logo, 시간과 Settings가 각각 큰 박스로 나뉘어 상단이 답답하다.

PC 시설 제작은 LUNA LIGHT GARDEN → SPARK ENERGY TOWER → WONDER PARADE HALL 순서로 진행하고 시설별 기록·보상과 COSMIC VOYAGE까지 연결한다. 각 시설을 구현할 때 Mobile의 터치 조작, 버튼 접근성, 화면 넘침, 기본 가독성과 진행·복귀 기능도 함께 확인한다. Mobile 전용 이미지 제작과 세밀한 비주얼·HUD 디자인은 전체 시설과 흐름이 나온 뒤 통합해 진행한다. 본격적인 Mobile 시각 설계 단계에서는 390px 세로 화면 기준의 와이어프레임을 먼저 확정한다.

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

NOVA COASTER는 열차와 우주 도시, Rail Network가 한 장면으로 연결된 전용 Production Background를 사용한다. 시설 공간에 고정된 Gate 표지와 장식용 관제 Console은 배경에 포함하고, EVE·Mission Objective·시설 상태와 실제 조작은 공통 컴포넌트로 배치한다. MISSION START는 공통 Button 구조와 시설별 투명 Frame 이미지를 결합한다. 다른 시설도 같은 정보 구조를 유지하되 시설별 전용 배경, Button Frame과 Theme Modifier만 교체한다.

NOVA COASTER Production Background는 2560×1080의 Ultrawide 구도를 사용한다. 왼쪽은 기계 벽으로 막지 않고 어두운 Smoked Glass 전망창 너머로 도시가 은은하게 보이게 하며, 중앙의 LAUNCH GATE·열차·하단 Rail Console은 넓은 화면에서도 잘리지 않게 유지한다.

한국어 Control Room에서는 `NOVA COASTER`, `EVE`, `MISSION START`와 시설 고유명사를 제외한 상태·목표·설명 Label을 한국어로 표시한다. Mission Objective의 반복 번호는 사용하지 않고 탐색·레일 연결·안전 점검 Icon으로 역할을 구분하며, Train Status도 레일·안전·출발 상태별 Icon을 함께 제공한다.

MAP과 Control Room의 정보 Panel은 `.ui-panel`, `.ui-panel--content`, `.ui-panel__header`, `.ui-panel__heading`, `.ui-panel__eyebrow`, `.ui-panel__title`, `.ui-panel__description`을 공통으로 사용한다. `.ui-panel`은 외형, `.ui-panel--content`는 공통 Content Padding을 담당하고 화면별 차이는 부모 범위의 배치·Theme와 필요한 CSS Variable로만 처리한다. Header Divider는 공통값을 사용하며 EVE처럼 기존 디자인에서 Divider가 없는 Panel만 부모 범위에서 제거한다. `미션 목표`와 `열차 상태`처럼 같은 위계의 Panel명은 모두 `.ui-panel__title`을 사용하고, 미션명은 Panel 내부 Content Heading으로 분리한다. Mission Objective Icon은 원형 선택 장식을 유지하고 Train Status Icon은 외곽 장식 없이 Icon만 표시한다.

공통 구성:

- 시설명과 설명
- EVE 안내
- 시설 상태
- Mission Objective
- MISSION START
- MAP과 Settings 진입

Mission Objective는 긴 Checklist가 아니라 현재 해야 할 일을 설명하는 Brief다. Timer는 Play에서만 표시한다. 남은 시간 15초에 공통 Toast를 한 번 표시하고 Timer 색으로 임박 상태를 함께 구분한다. Guide는 공간 선택·배치, 반복 사용·제거, 회전·연결 확인 순서로 조작을 설명한다.

복구 완료 시설의 Control Room은 완료 상태를 읽기 전용으로 보여준다. 시설·열차 상태와 EVE 안내를 복구 완료 문구로 전환하고, MISSION START 위치에는 같은 크기의 비인터랙티브 `열차 정상 운행 중` 상태 Panel을 표시한다. 완료된 Mission을 Guide나 진행 상태로 되돌리지 않는다.


### 시설 상태 패널

- 읽기 전용 UI다.
- Mission 시작 전에는 저장 상태 또는 시설별 초기 상태를 표시한다.
- Mission 진행 중에는 결과를 즉시 반영한다.
- Pause는 시설 상태를 바꾸지 않는다.
- 중단 또는 재진입 시 저장된 상태를 복원한다.
- 수집 개수나 연결률처럼 연속적인 값에만 Progress Bar를 사용한다.
- 대기, 복구 중, 완료 같은 단계 상태는 문구나 Badge로 표시한다.

NOVA COASTER의 시설 상태 패널은 `복구 현황`을 제목으로 사용하고 `레일 연결`, `복구 단계`, `안전 점검`만 표시한다. 레일 연결은 저장된 단계 완료 상태에 따라 `0 / 9 → 2 / 9 → 5 / 9 → 9 / 9`, 복구 단계는 `0 / 3 → 1 / 3 → 2 / 3 → 3 / 3`으로 갱신한다. Segment는 총 조각 수와 같은 9개를 패널 너비에 맞춰 배치하고 완료된 연결 수만 점등한다. Timer와 현재 공간 번호는 Mission Layer 안에서만 표시하며 Control Room에서 반복하지 않는다.

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

Mission Guide, Countdown, Play, Pause, Fail과 Complete는 Control Room 위의 공통 Mission Layer로 제공하며 별도 페이지로 만들지 않는다. `dialog`와 공통 Mission Flow는 유지하되 화면 단계에 따라 표현 범위를 구분한다. Mission Guide는 Control Room이 뒤에 남는 큰 Overlay Panel로, Countdown과 Play는 화면 전체를 사용하는 Full-screen Layer로 제공한다. Pause, 최종 점검, Fail과 Complete는 Full-screen Play 위의 집중형 Panel로 표시한다. 같은 Play 보드를 어둡게 유지하고 배경의 게임 조작은 키보드와 보조기술에서도 비활성화한다. Guide와 Pause·최종 점검·Fail·Complete는 MAP과 같은 공통 Panel·Button·닫기 Icon을 사용하며 낮은 화면에서는 Panel 내부를 스크롤한다. Guide와 결과 Popup에 이미지 기반 Mechanical Frame을 적용하지 않는다. 기존 관제실 MISSION START의 투명 Frame과 시설별 게임 HUD·Board의 Frame은 유지하며, 다른 시설에는 코스터 Frame을 공통 적용하지 않는다.


### Mission Guide

목표를 반복하는 설명 화면이 아니라 30초 이내에 조작을 이해시키는 튜토리얼이다.

Mission Guide의 최종 Visual Development는 Play UI와 실제 조작 방식이 확정된 뒤 진행한다. Guide의 Rail 조각, 선택 상태, 회전과 연결 예시는 실제 Play 화면과 동일한 Asset과 상태 표현을 사용한다. NOVA Guide는 빈 공간 선택 → 조각 배치 → 90° 회전을 직접 연습할 수 있는 작은 예시를 제공한다. 연습은 실제 Mission 진행·시간·저장에 영향을 주지 않으며 완료하지 않아도 미션을 시작할 수 있다. 공통 창 제목은 미션 가이드로 유지하고 시설명을 함께 표시한다. 본문 소제목은 시설별 미션명(NOVA는 레일 복구 미션)을 16px로 표시하며, 왼쪽 연습 영역의 공통 제목은 미션 미리 해보기(TRY THE MISSION)로 사용하며 시설별 복구 방식을 제목에 넣지 않는다. 왼쪽 연습 조작에는 순번을 표시하지 않는다. 오른쪽 설명 목록의 01·02·03은 유지하며 공통 ui-panel·ui-info-list 항목을 조합한 박스로 표시한다. 번호는 16px 숫자 Font와 공통 강조색을 사용하고 Badge 테두리·배경·Padding 없이 제목 첫 줄에 정렬한다. 설명 박스는 내부 Padding 16px·박스 간격 8px를 유지하며 제목 14px·설명 13px·두 문구 간격 4px·설명 줄높이 1.6으로 표시한다. 테두리는 공통 선색의 대비를 낮추고 내용 길이에 따른 높이 차이는 허용한다. 약한 라운드(var(--radius-sm), 8px)는 부모 목록에 ui-info-list--angular를 한 번만 지정해 모든 직계 항목에 적용하며 항목별 Modifier를 반복하지 않는다. 전용 절단 모서리나 장식 테두리를 새로 만들지 않는다. 연습 안내는 현재 언어의 가장 긴 연결 안내가 차지하는 공간을 항상 확보하여 회전 상태별 줄 수 변화가 레일·안내·버튼 위치를 바꾸지 않도록 한다. 게임으로 돌아가기 Button은 설명 영역 가운데 정렬한다. Guide 팝업 높이는 콘텐츠에 따라 자동으로 결정하며 고정 높이로 빈 공간을 채우지 않는다. 화면 높이에서 외곽 여유를 뺀 max-height만 두고 초과할 때 본문을 스크롤한다. Countdown·Play의 전체 화면 높이와 구분한다. Guide 팝업 외곽 Padding은 PC 24px·작은 화면 16px로 위아래를 동일하게 유지한다. 본문은 제목 구분선 아래에만 같은 간격을 두어 외곽 하단 Padding과 중복하지 않는다. 내용이 실제 화면 높이를 넘는 작은 화면에서는 본문 스크롤을 유지한다. 빈 공간은 공간 선택 문구와 선택 전 점선 Motion으로 안내한다. 배치 후 같은 Button은 조각 제거로 바뀌며 재배치할 수 있다. 회전은 조각이 없을 때만 비활성화하고 연결 후에도 90°씩 반복할 수 있다. 잠금 Icon 대신 비활성 스타일과 안내 문구로 선행 조건을 설명한다. 모션 감소 설정에서는 점선 Motion을 끈다. 가로로 배치한 시설명과 창 제목에는 세로 제목용 아래 Margin을 적용하지 않는다.

- 시설과 문제 상황
- Mission 목표
- 최대 3단계 진행 순서
- 조작 예시
- 짧은 Tip
- EVE 안내
- 시작 Button

관제실에서 처음 연 Mission Guide는 공통 닫기 `X` Button과 복구 시작 Button을 제공한다. 최초 Focus는 닫기 Button에 두어 긴 Guide의 하단으로 자동 스크롤되지 않도록 하며, 닫으면 관제실로 돌아간다. Play에서 Mission Guide를 다시 연 경우에는 상단 닫기와 하단 게임으로 돌아가기 Button이 현재 STEP·배치·남은 시간을 유지한 채 Play로 복귀한다. 닫기 Icon과 Button은 공통 UI를 사용한다. 연습의 회전·배치 조작 후 Focus를 다른 Button으로 강제로 옮기지 않으며, 다시 연습을 실행하면 공간 선택으로 Focus를 돌린다.


### Countdown

시설 시스템이 활성화되는 짧은 Full-screen 연출이다. 진입한 Control Room의 전용 배경을 화면 전체에 은은하게 유지하고, 배경 위 UI는 어둡게 정리해 중앙 Countdown과 활성화 Motion에 시선이 모이게 한다. 별도의 작은 Popup이나 공통 무배경 화면으로 분리하지 않는다.

시설마다 공통 Countdown 구조와 Timing은 유지하되 배경, Theme Color와 활성화 Motion을 다르게 적용한다. Nova는 Rail Network 점등, Luna는 Light 확산, Spark는 Energy 충전, Wonder는 Stage 준비를 중심으로 표현한다. 숫자 `3 → 2 → 1` 이후 각 시설의 시스템 활성화가 완료되면 같은 Full-screen Layer에서 Play HUD로 자연스럽게 전환한다.


### Play

공통 UI는 Mission, Status, Timer, EVE와 Pause로 제한한다. 시설을 운영하고 복구하는 감각을 우선한다.


### Pause / Fail / Complete

- Pause: 현재 Checkpoint를 유지한 채 Resume, Restart, Control Room과 MAP 복귀 제공
- Fail: 과도한 실패 연출 없이 재시도와 MAP 제공
- Complete: 시설 복구 결과, Explorer Log 기록과 Passport 갱신 후 MAP 복귀
Mission 진행 중 새로고침하거나 재접속한 경우에도 Pause 상태로 복원한다.

---

## 시설별 Mission

### NOVA COASTER

- 역할: Movement
- 문제: 끊어진 Rail로 열차 운행 중단
- 장르: Rail Fault Repair Puzzle
- 핵심 조작: 난이도가 다른 세 개의 Top View Rail Board를 순서대로 복구한다. 단계가 바뀌면 출발역과 종착역을 포함한 Rail Board 전체가 새 경로로 교체되며, 빈 연결 공간에 후보 Rail 조각을 선택·90° 회전·조합해 실제 경로를 완성한다.
- 규칙: 현재 단계의 정상 Rail은 고정하고 빈 연결 공간만 조작한다. 빈 공간 양쪽 연결점과 Rail 조각의 연결점이 같은 Top View 기준에서 정확히 이어져야 복구된다.
- 완료: 세 단계의 Rail Board 복구 후 전체 연결 검사, 코스터 시운전과 안전 시스템 확인을 통과
- 난이도: 복구 단계마다 필요한 조각을 2개 → 3개 → 4개로 늘리고, 2단계부터 회전과 오답 후보를 추가한다.
- 복구 결과: Rail 점등, 열차 운행과 이동 재개

NOVA COASTER Mission은 하나의 Rail Network 안에서 세 고장 구간을 차례로 수리하는 방식이 아니다. STEP 1, STEP 2와 STEP 3은 서로 다른 Rail Board이며 이전 단계가 완료되면 기존 Rail을 닫고 다음 단계의 새 Rail을 표시한다. 전체 연결 상태는 필요한 Rail 조각 아홉 개를 기준으로 `0 / 9 → 2 / 9 → 5 / 9 → 9 / 9` 순서로 갱신한다.

#### Play 화면 표현 규칙

NOVA COASTER Play의 Rail Puzzle은 실제 Roller Coaster를 3D 원근으로 조작하는 화면이 아니라, 연결 방향을 즉시 비교할 수 있는 Top View Rail Network로 표현한다. Rail은 평면 선으로 그리지 않고 금속 베드, 침목, 이중 레일, 체결부와 신호광이 보이는 고밀도 SVG Asset을 사용해 실제 기찻길의 재질과 깊이를 전달한다.

현재 단계의 Rail Board 하나만 화면에 보여준다. Board의 출발점은 고정 표기 `START`와 현지화된 역명, 도착점은 고정 표기 `GOAL`과 현지화된 역명을 두 줄로 함께 표시한다. 한국어 보조 표기는 `출발역`과 `종착역`, 영문 보조 표기는 `START STATION`과 `TERMINAL STATION`을 사용한다. 고정 Rail과 현재 단계에서 채워야 할 2개·3개·4개의 빈 연결 공간을 함께 표시하며, 단계가 올라가면 Board 크기, Rail 경로, 빈 공간의 수와 위치가 모두 바뀌어 새로운 퍼즐임을 명확히 전달한다.

조작 가능한 Rail 조각은 Puzzle Board 아래의 Candidate Area에 배치한다. 후보 조각과 Board의 빈 공간은 동일한 Top View 기준과 동일한 Rail 규격을 사용하여, 사용자가 조각을 선택하거나 90° 회전했을 때 실제로 연결될 수 있는지를 화면만 보고 판단할 수 있어야 한다.

후보 조각을 선택하면 현재 활성 빈 공간 안에 즉시 Preview로 배치하고 해당 공간의 활성 상태를 유지한다. 이어서 다른 미배치 Candidate를 선택하면 다음 빈 공간을 자동으로 활성화해 배치한다. 이미 배치한 Candidate나 Board 공간을 누르면 해당 공간을 교체 대상으로 활성화하며, 이후 다른 Candidate를 선택해 Preview를 교체할 수 있다. 별도의 독립 Slot만으로 정답을 표현하지 않는다.

Rail 조각에 Perspective, Isometric 또는 강한 3D 원근을 적용하지 않는다. 입체감은 Top View 연결 규격을 유지한 상태에서 금속 재질, 음영과 광원으로 표현하며 Board와 후보 조각의 시점·두께·연결점 규격은 동일하게 유지한다.

Board의 시작점과 도착점 Label은 위쪽에 고정 영문 `START`, `GOAL`을 크게 표시하고 아래쪽에 현재 언어의 역명을 작게 표시한다. 한국어는 `출발역`, `종착역`, 영문은 `START STATION`, `TERMINAL STATION`을 사용하며 긴 영문 보조 표기는 최대 두 줄까지 허용한다. Label은 각 Image 위에 배치하고 두 시설에 동일한 글자 크기를 적용한다. 출발역과 종착역 Image는 같은 외곽 크기와 비율로 표시하며 상단 전광판의 보이는 너비와 높이도 동일한 기준으로 맞춘다. 출발역은 Rail과 동일한 90° Top View의 세로형 Mechanical Dock Base Image와 별도 Train Image를 겹쳐 하나의 시설처럼 표현한다. Train을 정거장 Image에 합치지 않아 이후 완성된 Rail을 따라 종착역까지 이동시키는 Animation에 그대로 사용할 수 있어야 한다. 종착역도 같은 Top View 시점과 Metal·Cyan·Violet 재질의 세로형 Production Image를 사용하고 두 시설의 선로 중심과 Board Rail의 중심이 자연스럽게 이어져야 한다.

출발역, 종착역과 분기 제어기의 Label·Production Image는 같은 반응형 Scale 기준을 사용한다. 화면 높이와 너비가 줄면 글자, Padding과 Image가 같은 비율로 축소되고, 한글 `분기 제어기`는 한 줄을 유지하며 영문만 최대 두 줄까지 허용한다.

Rail 위에 별도의 이동 방향 화살표를 반복하지 않는다. 연결 경로는 모든 Rail Type의 중앙을 따라 이어지는 Cyan 점선 신호로 통일하며 직선, 코너와 T자 분기에서 밝기와 간격이 시각적으로 동일해야 한다.

직선, 코너와 T자 분기 Rail은 금속 베드·침목·이중 레일·체결판·볼트·Cyan 점선의 색과 선폭, Dash 간격을 같은 규격으로 사용한다. 금속 Highlight와 황동 체결 포인트로 실제 기차 Rail의 깊이를 보강하되 Tile 경계에 별도의 마감 Bar를 중복 배치하지 않아 조각이 이어질 때 하나의 연속된 Rail처럼 보여야 한다.

Play Header의 전체 연결 상태는 완료 수와 전체 수를 숫자로 표시하고 같은 수의 Segment를 함께 제공한다. 전체 Segment가 9개 또는 12개처럼 달라져도 Segment 묶음 자체를 Header 중앙에 정렬하며, 고정된 최대 칸의 왼쪽부터 채우는 방식으로 표현하지 않는다.

56rem 이하의 임시 반응형 Play에서는 Rail 빈 공간을 44px 이상으로 유지하고, 원래 퍼즐 배치를 보존한 가로 스크롤 Board를 사용한다. Header의 시설명·조작 버튼·연결 상태는 행을 나누어 겹침을 방지한다. Board와 Candidate Area가 화면 높이를 넘으면 Play 영역을 세로로 스크롤한다. 모바일 전용 HUD의 최종 디자인은 별도 확정한다.

Guide와 Pause의 내용이 화면 높이를 넘으면 해당 Panel 내부에서 스크롤하며 시작·복귀 버튼까지 접근할 수 있어야 한다. Pause의 DOM과 시각적 버튼 순서는 계속하기 → 다시 시작 → 관제실 → MAP으로 통일한다. Rail 배치·회전·빈 공간 선택으로 화면을 다시 그려도 조작한 버튼의 키보드 Focus를 유지하고, 시간 초과 시 Fail 화면의 재시도 버튼으로 Focus를 이동한다.

기본 화면 구조는 다음과 같다.

    상단 또는 중앙: 현재 STEP의 2D Rail Board
    → 출발역과 종착역 사이의 고정 Rail 경로 표시
    → 현재 단계에서 채울 빈 연결 공간 표시
    → 하단: 현재 단계에서 사용할 Rail 후보 조각
    → 빈 공간 선택과 조각 배치
    → STEP 2부터 선택한 조각의 90° 회전
    → 연결 검증
    → 성공 시 Rail 점등 및 다음 STEP의 새 Rail Board 표시

STEP 1은 가장 단순한 새 Rail Board로 시작한다. 빈 공간 2개와 필요한 후보 2개를 제공하고 회전 기능은 사용하지 않는다. 두 공간은 서로 맞닿게 배치하지 않고 출발부와 상단 본선의 서로 다른 단절 구간으로 분리하여, 사용자가 Board 전체 경로를 살펴보며 기본 선택과 공간 이동을 익히게 한다.

STEP 1의 직선 Rail B는 회전 기능을 제공하지 않으므로 Candidate와 정답 방향 모두 가로 방향으로 고정하고 Board의 상단 본선과 같은 방향으로 보여준다.

STEP 2는 STEP 1과 다른 Rail Board를 표시한다. 빈 공간 3개와 중복 없는 Rail Type 3개를 제공한다. 직선 레일 하나를 1번과 3번 공간에 반복 배치하고, 각 공간의 조각을 서로 다른 방향으로 회전할 수 있어야 한다.

STEP 3은 가장 크고 복합적인 새 Rail Board를 표시한다. 빈 공간 4개와 중복 없는 Rail Type 3개를 제공하며 같은 코너 레일을 두 공간에 반복 배치한다. 경로는 단순한 가로 일렬이 아니라 위아래 이동과 연속된 꺾임이 포함되며, 본선 옆 분기 제어기까지 세 방향을 연결하는 T자 분기 레일을 반드시 사용한다. 분기 제어기는 Rail과 동일한 Top View Production Image로 표현하고 외부 Rail 접속점은 왼쪽 한 곳만 제공한다. 1번 T자 분기의 오른쪽 가지가 제어기 안으로 직접 들어가며, 아래 3번 공간이나 위·오른쪽 Rail과 연결되는 것처럼 보이는 표현은 사용하지 않는다. 분기 제어기 Label은 한글에서 한 줄을 우선하고 영문은 글자 크기를 줄이지 않은 채 최대 두 줄까지 허용한다.

배경의 Nova Land 시설과 Roller Coaster 비주얼은 분위기 표현으로 사용할 수 있지만 Puzzle Board의 Rail보다 시각적으로 우선하지 않는다. Play의 핵심 정보는 항상 평면 Rail Puzzle 자체가 담당한다.

복구 단계는 별도 Button 없이 현재 Board의 검증이 완료되면 자동으로 상승한다. Play Header에는 `NOVA COASTER`와 현지화된 레일 복구 Mission 명칭, 전체 연결 상태, 가이드, 시계 Icon과 남은 시간 값, 일시정지만 표시한다. 전체 연결 상태는 Header 중앙의 사다리꼴 Plate에 유지하고 `남은 시간` Text는 표시하지 않는다. 가이드 Button은 정보 아이콘과 테두리를 가진 각진 Game Button 형태로 강조한다. 가이드 Button은 기존 최소 높이 2.45rem과 Padding .4rem 1rem을 유지한다. 일시정지 Button은 공통 Icon Button의 44px 조작 영역·어두운 배경·은은한 테두리·Hover를 유지하며 라운드는 var(--radius-sm)로 적용한다. 일시정지 팝업의 Icon·소제목은 시설 Theme와 무관한 공통 Primary 색상을 사용한다. 팝업 내부 Button에는 이 Game 전용 형태를 적용하지 않는다. Header는 하나의 굵은 외곽 상자로 묶지 않고 왼쪽 Mission Identity, 중앙 연결 상태 Housing과 오른쪽 조작부가 각각 분리된 얇은 Mechanical Frame으로 표현한다. 현재 단계는 Board Panel 상단 테두리에 결합된 좁고 어두운 Notch형 Plate에서 `복구 01 / 03`, `복구 02 / 03`, `복구 03 / 03`으로 표시하고 난이도 Badge와 현재 단계 조각 수는 반복하지 않는다.

Play의 Board Panel과 Candidate Workspace는 가는 이중선, 작은 모서리 Bracket, 내부 Highlight와 낮은 Neon Glow를 공통으로 적용한다. 두꺼운 Cyan 외곽선과 큰 금속 모서리 장식은 사용하지 않는다. Rail Board 배경은 큰 격자, 낮은 밀도의 Dot Matrix와 약한 Scanline을 겹치되 Rail보다 앞서지 않게 명도를 억제한다. Candidate Workspace는 게임 Board의 집중도를 유지하도록 현재의 낮은 높이와 정보 밀도를 유지하며 시안의 높은 하단 Panel 비율을 그대로 따르지 않는다.

Play Visual의 직접 비교 기준은 `game-coaster1.png`다. 확정된 실제 UI와 단계별 Rail Board 구조는 유지하되 Header 분할 비율, Panel 선 굵기, 복구 Notch, 좁은 Top View 출발역과 직사각형 종착역, Rail의 금속 베드·침목·이중 레일 밀도는 해당 시안에 최대한 가깝게 맞춘다. 출발역 Image와 Train은 향후 실제 운행 Animation을 위해 분리하고, 역 이름은 Image에 포함하지 않고 현지화 가능한 HTML Label로 배치한다.

1. 복구 단계 1: 빈 공간 2개, 후보 2개, 회전 없음
2. 복구 단계 2: 빈 공간 3개, Rail Type 3개, 동일 Type 반복 배치와 90° 회전 사용
3. 복구 단계 3: 빈 공간 4개, Rail Type 3개, 동일 Type 반복 배치와 T자 분기 사용

#### 조작 및 상태 변화

Play 진입 직후 STEP 1의 새 Rail Board와 두 빈 연결 공간을 표시하고 Candidate는 모두 미배치 상태로 시작한다. 현재 단계의 빈 공간이 모두 채워지기 전까지 `연결 확인` Button은 비활성화한다.

Candidate Area는 개별 실물 조각 목록이 아니라 현재 STEP에서 사용할 수 있는 Rail Type Palette다. Candidate 묶음은 EVE 영역과 조작 Button의 실제 너비에 밀리지 않도록 Workspace의 전체 가로축 정중앙에 배치한다. Candidate Card는 정사각형으로 만들고 `Rail 모양 → Rail 이름`을 세로로 배치하며, 직선·코너·T자 Rail의 실제 Artwork 경계를 기준으로 위아래 여백이 같게 중앙 정렬한다. Board 공간 번호 `01~04`와 Candidate 식별자 `A~C`는 축소된 게임 화면에서도 즉시 구분할 수 있는 독립 Badge 크기와 대비를 유지한다. Candidate를 선택하면 해당 Rail Type을 현재 활성 공간에 Preview로 즉시 배치한다. Candidate Card에는 `선택 중`, `선택 가능` 또는 `N번 공간에 배치됨` 같은 상태 문구와 배치 강조를 표시하지 않고 Rail 모양과 종류만 유지한다. 배치 여부와 활성 공간은 Board에서만 확인한다. Board 공간을 직접 선택하면 EVE Live Status가 선택한 두 자리 공간 번호를 말하고 사용할 Rail 조각 선택을 안내한다. 배치 직후에는 현재 Board 공간을 유지하여 Candidate 옆의 회전 Button을 사용할 수 있게 하며, 다른 Rail Type을 선택하면 다음 빈 공간에 자동 배치한다. Preview는 연결을 확정하기 전까지 청록색 외곽선과 Scan 표현으로 고정 Rail과 구분한다.

같은 Candidate는 한 단계 안의 여러 Board 공간에 반복 배치할 수 있다. 예를 들어 STEP 2의 직선 레일 A 하나를 1번과 3번 공간에 각각 배치한다. 같은 Rail Type을 다시 사용하려면 대상 Board 공간을 먼저 선택한 뒤 Candidate를 누른다. 현재 활성 공간에 이미 들어 있는 Candidate를 한 번 더 누르면 해당 공간에서 조각을 제거하고 빈칸으로 되돌린다. 다른 Candidate를 누르면 현재 공간의 Preview를 해당 Rail Type으로 교체한다.

정답은 Rail Type과 각 Board 공간의 실제 연결 방향으로 판정한다. 180° 회전해도 형태가 같은 직선 레일은 동일 방향으로 취급한다. 같은 Candidate를 여러 공간에 사용해도 각 Preview의 회전값은 슬롯별로 독립적으로 저장하고 판정한다.

STEP 1에서는 Rotate Button을 표시하지 않는다. 두 Candidate를 두 빈 공간에 모두 배치하면 `연결 확인`을 활성화하고 회전 없이 순서만 검증한다.

STEP 2와 STEP 3에서는 각 Candidate Card 안의 조각 옆에 개별 회전 Button을 표시한다. 현재 활성 공간에 배치된 Rail Type의 회전 Button만 활성화하고, 누르면 해당 공간의 Preview를 `0° → 90° → 180° → 270° → 0°` 순서로 회전한다. Candidate Preview는 현재 활성 공간의 방향만 반영하며 다른 공간에 반복 배치된 같은 Rail Type의 회전값에는 영향을 주지 않는다.

Candidate Area 오른쪽에는 `조각 초기화` 보조 Button과 `연결 확인` 주 Button을 세로로 배치한다. `조각 초기화`는 현재 STEP의 배치와 회전만 초기화하고 이전 완료 단계, 남은 시간과 전체 진행 상태는 유지한다. 배치된 조각이 없거나 현재 단계가 확정된 동안에는 비활성화한다.

`연결 확인` 전에는 정답 여부를 미리 표시하지 않는다. 연결이 맞지 않으면 종류 또는 방향이 틀린 공간만 오류 상태로 표시하고 첫 오류 공간을 자동으로 활성화한다. 상태 안내에는 확인할 공간 번호를 함께 제공하고 오류 Live Status는 일반 청록 안내와 구분되는 Red Text로 유지한다. 선택한 조각, 배치 순서와 회전 상태는 보존하여 바로 수정할 수 있게 하며 앞서 완료한 단계는 변경하거나 초기화하지 않는다.

연결이 맞으면 조작을 잠그고 Preview를 정상 Rail과 같은 확정 상태로 전환한다. 전체 연결 상태를 STEP 1 완료 후 `2 / 9`, STEP 2 완료 후 `5 / 9`, STEP 3 완료 후 `9 / 9`로 갱신한다. Rail 점등과 시스템 스캔을 거친 뒤 기존 Board를 새 Board로 교체하고 다음 단계의 빈 공간과 Candidate를 초기 상태로 표시한다.

Play의 Board Header에는 현재 STEP의 목표를 설명하는 Description을 제목 아래에 표시한다. 하단 EVE는 얼굴 중심의 원형 Crop을 사용하고 Header Description을 반복하지 않으며, 현재 단계에서 필요한 조작 Tip을 별도 문장으로 안내하는 Compact UI로 유지한다. 단계별 조작 Tip은 타이핑된 뒤 사라지지 않고 유지하며, 조각 선택·회전·초기화·검증에 따라 바뀌는 Live Status는 EVE의 두 번째 문장으로 배치해 변경된 문장만 다시 타이핑한다. Candidate, 배치 공간, Rotate와 연결 확인은 실제 동작에 맞는 `button`을 사용하고 활성 공간, 배치·비활성 상태, Keyboard Focus와 Live Status가 화면 상태와 함께 갱신되어야 한다.

각 단계는 `현재 Rail 복구 → Rail 점등 → 시스템 스캔 → 다음 단계의 새 Rail Board 표시` 순서로 이어진다. 세 단계 완료 후 `전체 연결 검사 → 코스터 시운전 → 안전 시스템 확인 → 시설 복구 완료`를 진행한다. 잘못된 선택은 현재 Board에서만 오류로 안내하고 앞서 완료한 단계는 초기화하지 않는다.

Control Room, Guide, Countdown, Play, Pause, Fail과 Complete는 공통 Mission Flow가 관리하고 단계별 Board 데이터, Candidate 선택·회전·검증 규칙만 NOVA COASTER 전용 Module이 담당한다. 진행 중 현재 복구 단계, 완료된 단계, 현재 Board의 조각 배치와 남은 시간은 Checkpoint로 저장하며 새로고침하면 Control Room의 Pause 상태로 복원한다. 완료 후 NOVA Stamp 기록을 먼저 확인하고 MAP으로 돌아가 LUNA 개방과 Log 갱신을 확인한다.


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

다섯 번째 시설이 아니라 Movement, Life, Energy와 Joy가 Harmony로 연결되는 중심 순환 시스템이다.

공명의 흐름이 약해졌을 때 남아 있는 중심 에너지를 보호하기 위해 스스로 봉인되며, 네 시설이 모두 복구되어 균형이 회복되면 다시 개방된다.

- 개방 조건: 네 시설 복구 완료
- 중심 경험: 경쟁이나 퍼즐보다 두 세계의 연결과 중심 순환 회복
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
- Commit은 사용자의 명시적인 요청이 있을 때만 진행한다. 변경 파일·diff와 검증 결과를 확인하고 기존 제목·본문 형식을 따른다. Push는 별도 요청이 필요하다.


### 화면 검수용 진입

Mission Preview는 게임을 완료하지 않고 동일한 실제 화면을 확인하는 용도이며, 기존 Explorer와 진행 데이터를 덮어쓰지 않는다. 복구 완료 Preview에서는 NOVA COASTER 완료·Stamp와 LUNA 해금 상태를 임시로 구성하고 완성된 마지막 Rail Board를 배경으로 표시한다. 결과 창을 검수할 수 있도록 자동 이동하지 않으며, 기록 보기 Button으로 Passport 획득 연출까지 연결한다.

| 주소 쿼리 | 진입 화면 | 조건 |
| --- | --- | --- |
| `?mission-preview=guide` | NOVA COASTER Guide | localhost 또는 127.* |
| `?mission-preview=countdown` | NOVA COASTER Countdown 이후 게임 진행 | localhost 또는 127.* |
| `?mission-preview=completed` | NOVA COASTER 시설 복구 완료 창 → Passport 기록 | localhost 또는 127.* |
| `?map-state=restored` | 전체 시설 복구 상태의 MAP | localhost 또는 127.*; Explorer 등록 필요 |
| `?intro=1` | 저장된 Explorer가 있어도 Intro 진입 | 테스트 전용 저장 격리가 없는 실제 Intro 흐름 |

각 쿼리는 단독으로 사용한다. Mission Preview와 MAP 복구 Preview는 진행 데이터를 저장하지 않으며, `intro=1`은 저장 데이터 초기화 기능이 아니다.
