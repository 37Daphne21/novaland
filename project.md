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

---

## 세계관

### 세계

- 노바랜드는 지구에서는 테마파크로 알려져 있지만, 실제로는 Nova People이 살아가는 하나의 세계다.
- 지구와 노바랜드는 공명을 통해 서로 연결되어 있다.

### 중심 순환

- 노바랜드는 지구에 즐거움과 설렘, 위로를 전한다.
- 지구인의 긍정적인 경험은 공명이 되어 노바랜드의 중심 에너지로 순환한다.
- 공명의 흐름이 약해지면 네 핵심 시설과 중심 순환도 멈춘다.

### Explorer

- Explorer는 지구에서 EVE의 구조 신호에 응답한 방문자다.
- 노바랜드 밖에서 온 존재이기 때문에 최초의 복구 권한을 부여받는다.
- Explorer는 영웅이 아니라 노바랜드의 회복을 돕는 조력자다.

### EVE

- Nova People이 만든 중앙 관제 AI다.
- 공명의 이상을 감지하고 지구로 구조 신호를 보낸다.
- Explorer를 지원하지만 직접 문제를 해결하지는 않는다.

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

---

## 세계관과 인물

### Nova Land

놀이기구만 모인 공원이 아니라 Nova People이 살아가는 하나의 세계다.

노바랜드는 지구에 즐거움과 설렘을 전하고, 그 경험에서 태어난 공명이 다시 중심 에너지로 순환하며 세계를 유지한다.

각 시설은 이동, 생명, 에너지와 즐거움을 담당하는 핵심 시설이며, 네 시설의 균형이 무너지면 중심 순환도 멈춘다.


### Explorer

지구에서 EVE의 구조 신호에 응답한 방문자다.

노바랜드 밖에서 온 존재이기 때문에 멈춘 순환을 다시 시작할 수 있는 Explorer 권한을 부여받는다.

이름을 등록할 수 있으며 시설 복구 기록과 Passport Stamp만 남긴다.

Level이나 전투 능력치는 사용하지 않는다.


### EVE

Nova People이 만든 노바랜드 중앙 관제 AI다.

공명의 이상을 감지하고 지구로 구조 신호를 보낸다.

Explorer에게 시설 상태와 다음 행동을 짧고 정확하게 안내하며, 직접 문제를 해결하기보다 복구를 지원하는 역할을 맡는다.

주인공처럼 앞에 나서지 않으며 엔딩에서만 평소보다 조금 따뜻한 감정을 표현한다.

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
* Settings의 처음부터 다시 시작을 실행한 경우 Explorer 정보와 진행 기록을 삭제하고 Intro부터 다시 시작한다.
* 이름 변경에서는 Intro와 최초 여권 발급 연출을 반복하지 않는다.

### Intro 진행 흐름

    노바랜드의 정지된 풍경
    → EVE 연결
    → 구조 상황 안내
    → 신호에 응답하기
    → Explorer 이름 등록
    → Explorer Passport 발급
    → 이름 각인과 등록 Seal
    → 여권 닫힘
    → MAP 전환

자동으로 진행되는 연출은 사용자의 이름 입력 대기 시간을 제외하고 약 15~20초 안에 끝낸다.

장면마다 다음 Button을 반복해서 제공하지 않는다. 사용자의 핵심 입력은 신호에 응답하기와 Explorer 등록으로 제한하고, 등록 이후 여권 발급과 MAP 전환은 자동으로 이어진다.

첫 시설 이름, 시설 선택 방법과 첫 Mission 안내는 Intro에서 제공하지 않는다. 해당 안내는 기존 MAP의 EVE와 Mission 선택 흐름에서 담당한다.

### Intro 장면

#### 1. 멈춘 노바랜드

조명이 꺼지고 움직임이 멈춘 노바랜드의 전경을 짧게 보여준다.

첫 화면에서는 구조 신호, EVE, 대사, 입력 UI와 Passport를 표시하지 않는다.

사용자가 화면을 선택하면 노바랜드 배경이 약 0.8초 동안 천천히 Fade Out된다.

Fade Out이 끝나면 어두운 구조 신호 연결 화면으로 전환한다.

#### 2. 구조 신호 연결

어두운 공간 중앙에 정체를 알 수 없는 작은 빛 형태의 구조 신호가 나타난다.

아직 EVE의 모습과 이름은 공개하지 않는다.

구조 신호는 대사가 출력되는 동안 밝기와 크기가 미세하게 변하며 맥동한다. 대사가 끝나면 약한 대기 상태로 돌아간다.

안내 문구:

> 지구로 보낸 구조 신호가 연결되었습니다.

이어서 현재 상황을 짧게 안내한다.

> 노바랜드의 중심 순환이 멈추고 있습니다.

Button:

> 신호에 응답하기

공명, COSMIC VOYAGE, 네 시설의 상세 역할과 전체 세계관은 Intro에서 길게 설명하지 않는다.

#### 3. EVE 등장과 Explorer 이름 등록

사용자가 신호에 응답하면 Button을 비활성화하고 구조 신호의 빛이 입자로 분해되기 시작한다.

입자는 약 1초 동안 하나의 형태로 모이며 EVE가 처음 홀로그램으로 나타난다.

EVE 안내:

> Explorer 연결이 확인되었습니다.

이어서 이름 등록을 안내한다.

> Explorer의 이름을 기록합니다.

입력 항목은 Explorer 이름 하나만 제공한다.

* 한글, 영문과 숫자 사용 가능
* 단어 사이 공백 사용 가능
* 2~12자
* 앞뒤 공백 제거
* 이름으로 사용할 수 없는 특수문자는 제한
* 빈 값이나 글자 수 초과 시 입력 영역 가까이에 짧은 오류 안내 표시

입력 Label과 오류 문구는 접근성 API에서 확인할 수 있어야 한다.

Button:

> Explorer 등록

#### 4. Explorer Passport 발급

Explorer 등록을 선택하면 입력한 이름이 강조되고, 이름의 시각적 흐름이 Passport의 이름 영역으로 이어진다.

이름을 알아보기 어려운 입자로 완전히 분해하지 않는다.

Passport는 노바랜드가 Explorer에게 건네는 첫 번째 상징 아이템처럼 화면에 나타난다.

다음 정보가 순서대로 기록된다.

* Explorer 이름
* Explorer ID
* 발급일
* 등록 상태
* 시설 복구 진행 0 / 4

이름이 기록된 뒤 Explorer Registered Seal을 찍는다.

EVE는 이 장면에서 처음으로 사용자의 이름을 부른다.

> Explorer {사용자 이름}.
> 등록이 완료되었습니다.

#### 5. MAP 전환

발급된 Passport가 닫히며 표지에 Explorer 이름이 작게 각인된다.

표지의 NOVA LAND Emblem이 짧게 빛난 뒤 Passport가 화면에서 정리되고 기존 MAP으로 전환된다.

Intro 종료 직전에 첫 번째 시설이나 다음 행동을 안내하는 EVE 대사는 사용하지 않는다.

### Intro 비주얼 원칙

* 실제 여권의 소장감과 노바랜드 관제 기술의 정제된 빛 표현을 결합한다.
* 마법책이나 낡은 판타지 소품처럼 표현하지 않는다.
* 과도한 Glitch, 통신 잡음과 공포 분위기를 사용하지 않는다.
* 긴 텍스트 설명보다 멈춘 공간, 조명, 사운드와 Passport 발급 연출로 상황을 전달한다.
* PC와 Mobile 모두 같은 내용과 순서를 사용하되 화면 비율에 맞게 배치와 크기를 조정한다.
* `prefers-reduced-motion` 환경에서는 이동과 3D 회전을 줄이고 Fade와 상태 전환 중심으로 제공한다.

---

## 공통 시스템

### Explorer Archive

Explorer Log와 Explorer Passport는 하나의 공통 Overlay 안에서 동등한 두 Tab으로 제공한다.

* Recent Log의 기록 보기: 탐험 기록 Tab으로 진입
* Explorer Profile: 탐험가 패스포트 Tab으로 진입
* 이름 변경 Button: 이름 변경만 수행

Explorer Log는 사건과 Mission 완료 내역을 시간순으로 보여준다.

Explorer Passport는 사용자의 이름, 시설별 복구 상태, Stamp, 쿠폰과 최종 탑승권을 수집형 기록으로 보여준다.

둘의 역할은 합치지 않는다.

#### Explorer Passport 역할

Explorer Passport는 단순 프로필 카드가 아니라 노바랜드 안에서 Explorer를 나타내고 전체 여정을 기록하는 상징 아이템이다.

최초 Explorer 등록 시 발급되며, 사용자가 입력한 이름이 Passport에 직접 기록되는 연출을 제공한다.

시설을 복구할 때마다 해당 시설 Stamp와 완료 기록이 추가되고 현실 이벤트 보상인 쿠폰도 함께 활성화된다.

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

시설 복구마다 표지 전체를 크게 변경하지 않는다.

* 시설 복구: 시설 컬러가 표지 가장자리에 미세하게 누적
* 네 시설 복구: Aurora Seal 활성화
* COSMIC VOYAGE 완료: 최종 Passport 상태 활성화

스탬프와 기록이 중심이며 표지 장식 변화는 보조로 사용한다.

#### Passport 페이지 구성

##### 첫 번째 펼침: Explorer 정보

왼쪽 페이지:

* NOVA LAND 공식 문양
* Explorer에게 보내는 짧은 안내
* 발급일
* 등록 상태

오른쪽 페이지:

* Explorer 이름
* Explorer ID
* Explorer Emblem
* 시설 복구 진행 수
* 현재 상태
* 이름 변경 진입

사진, 성별, 나이와 추가 개인정보는 사용하지 않는다.

이름 변경은 Settings의 간단한 수정 UI로 진행하고 최초 발급 연출은 반복하지 않는다.

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
→ 쿠폰 상태 활성화
```

시설 복구 결과, Stamp와 쿠폰 지급을 여러 Popup으로 반복하지 않고 Passport 안에서 하나의 보상 흐름으로 연결한다.

#### Passport 페이지 이동

PC에서는 실제 책처럼 좌우 두 페이지를 함께 보여준다.

Mobile에서는 가독성을 위해 한 페이지씩 보여주며 같은 페이지 순서와 데이터를 사용한다.

페이지 이동은 종이 하단 귀퉁이 인터랙션을 우선한다.

* 오른쪽 아래 접힌 귀퉁이: 다음 페이지
* 왼쪽 아래 접힌 귀퉁이: 이전 페이지
* 이동할 페이지가 있을 때만 해당 귀퉁이 표시
* PC Hover 시 귀퉁이가 조금 더 들리며 Click 가능 상태 안내
* Click 또는 Tap 시 자동 페이지 넘김
* 종이를 직접 끌어당기는 Drag 방식은 사용하지 않음
* Mobile의 실제 터치 영역은 보이는 귀퉁이보다 넓게 확보
* 현재 위치를 알 수 있도록 Page Number 또는 작은 진행 표시 제공
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

사용자가 일반적으로 Passport를 열 때의 MAP 진입 위치와 구체적인 Trigger UI는 현재 구현된 MAP 구조를 기준으로 별도 확정한다. Intro 구현 단계에서 새로운 MAP Button이나 Panel을 임의로 추가하지 않는다.


### Settings

공통 설정 항목:

- 탐험가 이름 변경
- 한국어 / 영어
- BGM 음량
- 효과음
- Day / Sunset / Night
- 전체 화면 On / Off
- 처음부터 다시 시작
- 설정 초기화하기

브라우저 Fullscreen API는 사용자의 직접 입력에서만 실행하고,
브라우저가 전체 화면을 해제하면 설정 상태도 동기화한다.

처음부터 다시 시작은 Explorer 정보, Intro 완료 상태, Passport, 쿠폰과 전체 진행 기록을 초기화하며 환경 설정은 유지한다.

초기화가 완료되면 MAP이 아니라 Intro의 Explorer 등록부터 다시 시작한다.

설정 초기화하기는 언어, 시간과 사운드 설정만 기본값으로 되돌린다.

두 초기화 기능은 서로 영향을 주지 않으며 모두 확인 절차를 거친다.


### Time

Day, Sunset과 Night는 배경, 조명, 반사와 분위기를 바꾸는 브랜드 경험용 시스템이다. Mission 난이도나 결과에는 영향을 주지 않는다.


### Save Data

새로고침이나 재접속은 초기화가 아니라 기존 Explorer로 이어서 진행하는 것으로 취급한다.

다음 상태를 복원해야 한다.

- Explorer 이름
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
- 선택 상태는 Border와 Background로 구분한다.
- Guide Glow는 아직 조명이 꺼진 현재 진행 시설을 안내할 때만 시설 전체를 감싸는 형태로 나타난다.
- 복구 완료로 조명이 켜진 시설과 개방된 COSMIC VOYAGE에는 배경 Guide Glow를 사용하지 않는다.
- EVE 안내와 같은 내용을 Toast로 중복 표시하지 않는다.
- EVE Signal Wave는 음성이 끝난 순간의 움직임에서 자연스럽게 정지한다.
- PC EVE는 오른쪽 하단 위치를 고정하고 발화 중에만 크기와 Glow를 확장해 강조한다.
- EVE 안내가 끝나면 마지막 문장을 잠시 유지한 뒤 대기 크기로 돌아간다.
- 전체 복구 이후에도 시설 선택과 안내 반응은 유지한다.


### MAP 상태 표현

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

모바일 전용 세로 배경과 1차 반응형 구조는 구현되어 있지만 디자인은 확정되지 않았다. 현재 구현을 완료본으로 간주하지 않는다.

확인된 문제:

1. 접힌 Mission Panel에 Divider와 빈 공간이 남는다.
2. Recent Log가 지도에 비해 크고 시선을 과도하게 차지한다.
3. PC Glass Panel을 축소한 박스형 UI가 모바일 게임 화면과 어울리지 않는다.
4. 시설 비주얼보다 Card가 먼저 보여 지도 속 시설을 직접 선택한다는 느낌이 약하다.
5. 작은 화면에서 Logo, 시간과 Settings가 각각 큰 박스로 나뉘어 상단이 답답하다.

PC에서 공통 시스템과 NOVA COASTER의 전체 흐름을 먼저 완성한다. 이후 모바일 구현을 시작할 때는 코드를 미세 조정하기 전에 390px 세로 화면 기준의 모바일 와이어프레임을 먼저 확정한다.

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
Mission 진행 중 새로고침하거나 재접속한 경우에도 Pause 상태로 복원한다.

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
- Commit은 사용자가 직접 한다.

---

## 현재 상태와 다음 진입점

완료:

- 프로젝트 기반과 공통 UI Token
- PC MAP 기본·전체 복구 상태
- PC MAP 시설별 누적 조명 배경과 COSMIC VOYAGE 전환
- 시설 선택 → EVE 안내 → 지도 행동 유도
- Mission 선택 전 지도 Card 비활성화와 안내 종료 후 선택 시설 활성화
- 최초 Mission 즉시 선택 시에도 Dim 배경 전환 유지
- PC EVE 위치 고정형 발화 집중 상태와 대기 상태 전환
- 미복구 진행 시설 전용 Guide Glow
- 잠금·복구·COSMIC VOYAGE 개방 상태 동기화
- Settings의 언어·시간·전체 화면 등 현재 제공 기능
- MAP PC 1차 Refactoring
- 모바일 전용 MAP 배경과 반응형 1차 구현
- Nova Land 세계관과 지구·공명·중심 순환 설정
- Intro와 Explorer 이름 등록 Flow
- Explorer Passport 구조, Stamp, 쿠폰과 페이지 이동 규칙

진행 중:

- Intro와 Explorer Passport 구현 준비


다음 작업 시작점:

1. Intro와 Explorer 이름 등록 구현
2. Explorer Passport 최초 발급 연출 구현
3. Explorer Passport의 정보·Stamp·쿠폰·COSMIC 페이지 구현
4. Explorer Log와 Explorer Passport 공통 Overlay 구현
5. 설정과 Recent Log 저장·복원 연결
6. PC NOVA COASTER와 공통 Mission Flow 완성
7. 완성된 PC 흐름을 기준으로 390px 모바일 MAP Wireframe 확정

모바일은 PC NOVA COASTER까지 하나의 완전한 흐름을 검증한 뒤 전용 HUD로 재설계한다. 시설 데이터와 진행 상태는 PC와 공유하고 표현 구조만 분리한다.

세부 일정은 roadmap.md에서 관리한다.
