# Nova Land

## 프로젝트 개요

### 프로젝트명

Nova Land


### 프로젝트 타입

Playful Brand Experience Portfolio


### 프로젝트 소개

Nova Land는 브랜드 경험을 중심으로 제작하는 인터랙티브 포트폴리오 프로젝트입니다.

사용자는 Explorer(탐험가)가 되어 노바랜드를 탐험하고, 각 시설을 점검하고 복구하며 노바랜드가 다시 움직일 수 있도록 돕습니다.

Nova Land는 일반적인 게임이나 홈페이지가 아닙니다.

브랜드를 하나의 살아있는 세계(World)로 표현하고, 사용자가 직접 그 세계를 체험하도록 설계된 인터랙티브 경험 프로젝트입니다.

---

## 프로젝트 목표

Nova Land는 다음 목표를 기준으로 제작합니다.

- 브랜드 경험 중심 인터랙션
- 게임보다 경험을 우선하는 설계
- 실제 런칭 가능한 이벤트 페이지 수준의 완성도
- 직관적인 UX와 높은 몰입감
- PC와 Mobile을 함께 고려한 경험 설계
- 실제 구현 가능한 디자인과 인터랙션

---

## 프로젝트 철학

Nova Land는 아래 철학을 모든 기획과 디자인의 기준으로 삼습니다.

### 브랜드 경험 우선

Nova Land는 게임을 만드는 프로젝트가 아닙니다.

게임의 재미보다

브랜드가 하나의 세계처럼 느껴지는 경험을 만드는 것이 가장 중요한 목표입니다.

사용자는 플레이를 통해

브랜드를 이해하고

노바랜드를 기억하게 됩니다.


### 노바랜드가 주인공이다

Nova Land의 주인공은 Explorer가 아닙니다.

진짜 주인공은

Nova Land입니다.

Explorer는

노바랜드를 잠시 방문하여

시설을 복구하고

세상이 다시 움직일 수 있도록 돕는 존재입니다.

따라서

모든 연출은

Explorer보다

노바랜드의 변화에 집중합니다.


### 설명보다 체험

Nova Land는

텍스트보다 경험을 우선합니다.

가능한 많은 정보를

- 공간
- 조명
- 사운드
- 애니메이션
- 인터랙션
- UI 변화

를 통해 전달합니다.

사용자가

읽는 것이 아니라

직접 느끼는 경험을 만드는 것이 목표입니다.


### 모든 행동에는 변화가 있어야 한다

Explorer의 행동은

반드시 노바랜드의 변화를 만들어야 합니다.

시설을 복구하면

- 조명이 켜지고
- 시설이 움직이고
- 환경이 변화하며
- 노바랜드가 다시 살아납니다.

사용자는

점수를 얻는 것이 아니라

세상을 변화시키는 경험을 하게 됩니다.


### 단순한 놀이공원이 아니다

Nova Land는

놀이공원을 배경으로 하지만

실제로는

노바인들이 살아가는 하나의 세계입니다.

각 시설은

놀이기구가 아니라

노바랜드의 일상을 구성하는 중요한 공간입니다.

---

## Design Philosophy

Nova Land의 디자인은 다음 원칙을 따릅니다.

### 실제 구현 가능한 디자인

모든 화면은

실제 HTML/CSS/SVG/Canvas 등으로 구현 가능한 수준을 기준으로 제작합니다.

AI에서만 가능한 표현은 사용하지 않습니다.


### 레이어 및 구현 원칙

월드맵 배경과 UI는 분리하여 관리합니다.

- 월드맵 배경은 독립 이미지 자산으로 관리합니다.
- 패널, 카드, 텍스트, 테두리, Glow는 HTML/CSS로 구현합니다.
- 아바타, 시설 썸네일, 배경처럼 이미지가 필요한 요소만 별도 이미지 자산으로 관리합니다.
- 아이콘은 SVG Sprite를 우선 사용합니다.
- Mission List, EVE, Recent Log는 각각 독립 컴포넌트로 관리합니다.
- 완성된 PNG 시안은 디자인 참고용으로 사용하며 구현 원본으로 사용하지 않습니다.
- 추가 정적 이미지 시안은 제작하지 않습니다.
- 현재 MAP과 Control Room 시안은 비주얼 방향을 확인하는 참고 자료로만 사용합니다.
- 시안의 문구, 간격, 정렬과 상태 표현이 본 문서와 다르면 `project.md`를 기준으로 HTML/CSS 구현 단계에서 수정합니다.
- 완성된 PNG 위에 패널, 인물, 텍스트를 다시 합성하여 시안을 수정하지 않습니다.

추후 Figma 작업이 필요해지면 배경, UI 패널, 이미지 자산을 분리하고 패널은 개별 Frame 또는 Component로 관리합니다.


### 일관된 UI 시스템

시설마다 분위기는 다르지만

공통 UI 시스템을 유지합니다.

사용자는

어떤 시설에서도

동일한 사용 경험을 얻을 수 있어야 합니다.


### 정보보다 분위기

Nova Land는

정보를 많이 보여주는 UI보다

공간의 분위기를 만드는 UI를 우선합니다.

UI는

브랜드 경험을 방해하지 않아야 합니다.


### 인터랙션 중심

화면 전환보다

시설이 활성화되는 과정

조명이 켜지는 과정

환경이 변화하는 과정을 중요하게 생각합니다.

---

## 구현 자산 명세

### 관리 원칙

- 실제 화면에서 사용하는 이미지, SVG와 폰트는 프로젝트의 `assets` 내부에서 관리합니다.
- 외부 시안 폴더와 완성된 화면 PNG는 비주얼 참고용이며 HTML/CSS에서 직접 참조하지 않습니다.
- 패널, 카드, 버튼, 텍스트, 테두리, Glow, Progress Bar와 상태 Badge는 HTML/CSS로 구현합니다.
- 설정, 알림, 잠금, 시간과 시설 기능 아이콘은 SVG Sprite로 관리합니다.
- 구현에 필요한 자산이 없는 경우 임의의 이전 버전 이미지로 대체하지 않고 누락 상태로 관리합니다.


### 현재 자산 상태

- 기존 `assets/images/map/map.png`는 이전 버전이므로 삭제했습니다.
- MAP 배경 `assets/images/map/bg-map.webp` 제작을 완료했습니다.
- 기존 시설 썸네일은 Mission List에서 제거하고 시설별 SVG 아이콘으로 교체했습니다.
- 공통 EVE, Explorer 프로필, Nova Land Logo Lockup과 시설 아이콘을 `assets/images/common`에 제작했습니다.
- MAP 필수 이미지와 SVG 자산은 모두 확보했습니다.
- Control Room 배경 자산은 각 시설 구현 단계에서 제작합니다.
- Nova Coaster와 Luna Light Garden의 확정시안은 화면 구성과 컬러를 확인하는 참고 자료로만 사용합니다.
- Spark Energy Tower와 Wonder Parade Hall의 이전 시안은 시설별 분위기와 Modifier를 확인하는 히스토리 자료로만 사용합니다.


### MAP 필수 자산

| 우선순위 | 자산 | 수량 | 요구사항 |
| --- | --- | ---: | --- |
| 1 | MAP 배경 | 1 | UI, 텍스트, 패널과 카드가 없는 1920 × 1080 PC용 월드맵 배경 |
| 1 | 공통 EVE 홀로그램 | 1 | 동일 인물, 투명 배경, MAP에서는 Blue 컬러 사용 |
| 1 | Explorer 프로필 | 1 | 상단 Navigation 프로필용 이미지 |
| 2 | Nova Land Logo Lockup | 1 | Compass Symbol과 NOVA LAND Wordmark가 결합된 독립 SVG |
| 2 | 시설 아이콘 | 4 | Nova Coaster, Luna, Spark와 Wonder를 표현하는 SVG Sprite Symbol |

MAP 배경이 준비되기 전에도 HTML 구조와 공통 UI 컴포넌트는 구현할 수 있지만, 시설 카드 위치와 최종 비율 검수는 배경 적용 후 진행합니다.


### Control Room 필수 자산

| 우선순위 | 자산 | 수량 | 요구사항 |
| --- | --- | ---: | --- |
| 1 | Nova Coaster 배경 | 1 | UI와 텍스트가 없고 열차와 공간 비주얼이 포함된 16:9 이미지 |
| 1 | Luna Light Garden 배경 | 1 | UI와 텍스트가 없고 정원과 중앙 Lotus가 포함된 16:9 이미지 |
| 2 | Spark Energy Tower 배경 | 1 | UI와 텍스트가 없는 16:9 이미지 |
| 2 | Wonder Parade Hall 배경 | 1 | UI와 텍스트가 없는 16:9 이미지 |
| 3 | Cosmic Voyage 배경 | 1 | 전체 시설 완료 이후 화면용 16:9 이미지 |

시설 UI, Glow와 Control Room의 EVE는 같은 시설 Identity Color를 공유합니다.

- MAP 공통 시스템과 EVE: Blue `#38c8ff`
- Nova Coaster: Electric Violet `#8c72ff`
- Luna Light Garden: Mint `#51e7cc`
- Spark Energy Tower: Orange `#ffb84a`
- Wonder Parade Hall: Pink `#ff6eb6`
- Cosmic Voyage 봉인 상태: Gray
- Cosmic Voyage 개방 상태: Pearl White를 중심으로 네 시설 컬러가 연결되는 Aurora Gradient

Cosmic Voyage는 단일 대표색을 사용하지 않습니다.

Movement, Life, Energy와 Joy가 하나로 연결되는 Harmony를

Pearl White 중심광과 Aurora Gradient로 표현합니다.


### 폴더 계획

```text
assets/
  fonts/
  images/
    common/
      eve.webp
      explorer.webp
      icon-sprite.svg
      logo-lockup.svg
      logo-symbol.svg
    map/
      bg-map.webp
    control-room/
      bg-coaster.webp
      bg-luna.webp
      bg-spark.webp
      bg-wonder.webp
      bg-cosmic.webp
```

실제 자산이 준비될 때 해당 폴더와 파일을 추가하며 빈 폴더는 미리 생성하지 않습니다.


### 기존 코드 처리

- `index.html`의 문서 기본 구조, CSS·JavaScript 연결과 `#app`은 유지합니다.
- `index.html`의 기존 MAP 본문은 새 기획을 기준으로 다시 작성합니다.
- `reset.css`는 유지합니다.
- `common.css`는 새 디자인 토큰과 공통 컴포넌트를 기준으로 재정리합니다.
- `style.css`의 기존 MAP 스타일은 새로 작성합니다.
- `main.js`는 시설 데이터, 상태와 화면 전환 구조를 기준으로 다시 작성합니다.
- 기존 파일은 삭제하지 않고 같은 파일 경로에서 필요한 범위만 교체합니다.

---

## Voice & Tone

Nova Land의 모든 문장은 아래 원칙을 따릅니다.

### 친절하지만 과하지 않는다.

Explorer를 존중하지만

과도하게 감정을 표현하지 않습니다.


### 희망적이지만 과장하지 않는다.

과도한 축하

과도한 감동

과도한 영웅 연출은 사용하지 않습니다.


### 안내를 우선한다.

명령형보다

안내형 문장을 사용합니다.

예)

- 시설을 점검해 주세요.
- 준비가 완료되었습니다.
- 복구를 시작합니다.


### 회복을 이야기한다.

Nova Land의 핵심 키워드는

승리(Victory)가 아니라

회복(Restoration)입니다.

모든 문장은

노바랜드가 다시 움직이는 방향으로 작성합니다.


### UI 표기 언어

Nova Land UI의 기본 표시 언어는 한국어입니다.

아래 항목은 고유명사 또는 고정 UI 라벨이므로 영어를 유지합니다.

- NOVA LAND
- Explorer
- 시설명
- EVE
- MAP
- WORLD MAP
- MISSION START

시설명에는 아래 명칭이 포함됩니다.

- NOVA COASTER
- LUNA LIGHT GARDEN
- SPARK ENERGY TOWER
- WONDER PARADE HALL
- COSMIC VOYAGE

아래 항목은 기본적으로 한국어를 사용합니다.

- 메뉴 및 패널 제목
- 기능명
- 시설 상태와 시스템 상태
- Mission Objective
- 안내 문장과 본문
- MISSION START를 제외한 버튼 라벨

MISSION START 버튼의 주 라벨은 영어를 유지하고, 버튼 아래의 보조 문장은 현재 선택한 언어로 표시합니다.


### EVE의 말투

EVE는

노바랜드 중앙 관제 AI입니다.

말투는

- 차분함
- 정확함
- 신뢰감

을 기본으로 합니다.

엔딩에서만

조금 더 따뜻한 감정을 표현합니다.

---

## 세계관

### Nova Land

Nova Land는

노바인들이 살아가는 하나의 세계입니다.

시설들은

노바랜드의 일상을 유지하는 역할을 수행합니다.

Explorer의 도움으로

시설이 하나씩 복구되면서

노바랜드는 다시 움직이기 시작합니다.


### Nova People

노바랜드의 주민입니다.

플레이의 중심이 아니라

노바랜드의 일상을 구성하는 존재입니다.

시설이 복구될수록

노바인들의 하루도 다시 이어집니다.


### Explorer

Explorer는

노바랜드를 방문한 탐험가입니다.

역할

- 시설 점검
- 시설 복구
- 노바랜드 회복 지원

Explorer는

영웅이 아닙니다.

노바랜드가 다시 움직일 수 있도록 돕는 조력자입니다.

### EVE

EVE는

노바랜드 중앙 관제 AI입니다.

역할

- 시설 안내
- 상태 전달
- 미션 지원
- Explorer 보조

EVE는

주인공이 아닙니다.

Explorer를 지원하며

노바랜드의 회복을 함께 돕습니다.

---

## 핵심 가치

Nova Land가 끝까지 유지해야 하는 핵심 가치는 다음과 같습니다.

- 브랜드 경험
- 몰입
- 탐험
- 회복
- 변화
- 연결
- 희망

게임보다

노바랜드라는 세계를 기억하게 만드는 것이

이 프로젝트의 가장 중요한 목표입니다.

---

## 용어집

프로젝트 전반에서 사용하는 용어는 아래 기준을 따릅니다.

| 구분 | 용어 |
|------|------|
| 사용자 | Explorer (탐험가) |
| 주민 | Nova People (노바인) |
| 시설 | Facility |
| 관제실 | Control Room |
| 미션 | Mission |
| 미션 안내 | Mission Guide |
| 시설 복구 완료 | Facility Restored |
| 탐험 기록 | Explorer Log |
| 탐험가 패스포트 | Explorer Passport |
| 중앙 관제 AI | EVE |

---

## 사용자 플로우

Nova Land의 전체 경험은 아래 순서를 기준으로 설계합니다.

```text
Intro

↓

Explorer Registration

↓

MAP

↓

Control Room

↓

Mission Start

↓

Mission Guide

↓

Countdown

↓

Play

↓

Pause / Fail / Complete

↓

Explorer Log

↓

Explorer Passport

↓

MAP

↓

(4개 시설 완료)

↓

Cosmic Voyage

↓

Explorer Certification

↓

Ending
```

사용자는 언제나 MAP을 중심으로 이동하며,

각 시설은 동일한 공통 플로우를 사용합니다.

### 플로우 설계 원칙

Nova Land의 모든 경험은

MAP을 중심으로 순환합니다.

시설은 각각 독립적인 경험을 제공하지만

Explorer는 항상 MAP으로 돌아와

노바랜드의 변화를 확인하게 됩니다.

각 화면은

다음 화면을 위한 준비 과정이며

불필요한 페이지 이동은 최소화합니다.

---

## Explorer System

Explorer는 Nova Land를 방문한 탐험가입니다.

레벨업하거나 강해지는 캐릭터가 아니라

노바랜드를 회복시키는 조력자입니다.

### Explorer Registration

노바랜드에 입장하기 전

Explorer 정보를 등록합니다.

#### 기능

- 탐험가 이름 입력
- 랜덤 이름 생성
- 이름 변경

Explorer 이름은

Explorer Passport와 Explorer Log에 함께 기록됩니다.


### Explorer Status

Explorer는

게임 캐릭터처럼 성장하지 않습니다.

따라서 아래 요소는 사용하지 않습니다.

- HP
- EXP
- Level
- Attack
- Defense
- Skill

Explorer는

시설 복구 기록만 남깁니다.


### Explorer Archive

Explorer Log와 Explorer Passport는

하나의 Explorer Archive 공통 Overlay 안에서

동등한 두 개의 Tab으로 제공합니다.

- 탐험 기록
- 탐험가 패스포트

탐험 기록은

시설별 사건과 Mission 완료 내역을 시간순으로 확인하는 화면입니다.

탐험가 패스포트는

시설 복구 상태와 완료 도장을 한눈에 확인하는 수집형 기록 화면입니다.

두 화면은 역할을 합치지 않고

공통 Overlay와 닫기 동작만 공유합니다.

#### 진입 방식

- Recent Log의 `기록 보기`를 누르면 탐험 기록 Tab으로 진입합니다.
- Top Navigation의 Explorer Profile을 누르면 탐험가 패스포트 Tab으로 진입합니다.
- Explorer Profile의 이름 변경 Button은 이름 변경 기능만 수행합니다.

Mission을 완료하면

새 Explorer Log를 확인한 뒤

Explorer Passport의 복구 도장 갱신을 확인하고

MAP으로 돌아갑니다.

---

## Setting System

노바랜드 전체에서 사용하는 공통 설정입니다.

### 기능

- 탐험가 이름 변경
- 처음부터 다시 시작
- BGM 음량
- 효과음
- 시간 변경
- 언어 변경


### 언어 설정

- 지원 언어는 한국어와 영어입니다.
- 기본 언어는 한국어입니다.
- 언어를 변경하면 메뉴, 패널 제목, 상태, 버튼 보조 문장과 안내 문장에 즉시 적용합니다.
- 브랜드명, Explorer, 시설명, EVE, MAP, MISSION START는 언어 설정과 관계없이 영어 표기를 유지합니다.

---

## Time System

Nova Land는

시간에 따라 분위기가 변화합니다.

### 시간

- Day
- Sunset
- Night

시간은

노바랜드 전체에 공통 적용됩니다.

변화 예시

- 하늘
- 조명
- 반사
- 분위기
- 일부 이펙트

게임 플레이에는 영향을 주지 않습니다.

브랜드 경험을 위한 시스템입니다.

---

## MAP

MAP은

단순한 메뉴가 아닙니다.

노바랜드의 현재 상태를 보여주는 공간입니다.

Explorer는

모든 탐험의 시작과 끝을 MAP에서 경험합니다.

### MAP 역할

MAP은 Nova Land의 Home이다.

Explorer는 언제나 MAP으로 돌아온다.

MAP에서는

- 시설 선택
- 시설 상태 확인
- 잠금 시설 확인
- Cosmic Voyage 개방 확인

을 수행한다.

MAP에서는 Mission을 시작하지 않는다.

Mission은 Control Room에서 시작한다.


### MAP Layout

상단
- Nova Land Logo
- Explorer
- Time
- Weather
- Notification
- Setting

좌측
- Mission List
- 화면 하단에 정렬
- 패널 높이는 콘텐츠 크기만큼만 유지

중앙
- World Map

우측
- EVE
- Recent Log
- EVE는 Recent Log 바로 위에 배치
- EVE와 Recent Log를 하나의 세로 그룹으로 구성
- Recent Log 하단을 Mission List 하단과 동일한 기준선에 정렬
- 각 패널 높이는 콘텐츠 크기만큼만 유지
- 남는 공간을 채우지 않음


### Mission List

Mission List는 기본으로 열린 상태이다.

접기(Collapse)와 닫기(Close)는 지원하지 않는다.

항상 펼쳐진 상태이므로 펼침 또는 접기 아이콘을 사용하지 않는다.

Explorer는

현재 진행 가능한 시설과

시설 상태를 확인할 수 있다.

Mission List는

Mission을 시작하는 기능이 아니라

현재 진행 가능한 시설을 선택하고 확인하는 역할을 한다.

시설을 선택하면

선택 상태가 변경되고

EVE가 해당 시설을 안내한다.

EVE의 안내가 끝나면

World Map의 해당 시설 Card에 Guide Glow와 Arrow를 표시하여

Explorer가 다음 행동을 자연스럽게 이어가도록 한다.

선택 상태는 정적인 Border와 Background로 구분하고

Guide Glow는 다음 행동을 안내할 때만 표시한다.

EVE 안내와 같은 내용을 Toast로 중복 표시하지 않는다.

Mission은

World Map에서 시설을 선택하여

Control Room으로 진입한 뒤 시작한다.

Mission List 하단에는

Cosmic Voyage의 잠금 또는 개방 상태를 표시한다.

그 아래에는

현재 개방된 시설 단계를 `현재 단계 / 4`와 단계형 Progress Bar로 표시한다.

퍼센트 숫자는 표시하지 않는다.

잠긴 Mission Card의 아이콘과 상태는 시설 컬러를 사용하지 않고 동일한 회색으로 표시한다.


### MAP Interaction

Mission List에서 시설 선택

↓

정적인 선택 상태 표시

↓

EVE 시설 안내

↓

EVE 안내 종료

↓

World Map 시설 Card Guide Glow와 Arrow 표시

↓

World Map 시설 Card 선택

↓

Control Room 진입

↓

Mission Guide

↓

Countdown

↓

Play


### MAP 상태

초기 상태

- Nova 활성화
- Luna 잠금
- Spark 잠금
- Wonder 잠금
- Cosmic 봉인

World Map 시설 Card의 원형 Marker는 활성화되거나 복구된 시설에만 순서 번호를 표시한다.

잠긴 시설은 순서 번호 대신 잠금 아이콘을 표시한다.

Cosmic Voyage가 봉인된 동안에는 시설명을 `???`로 표시한다.

시설을 복구하면

MAP도 함께 변화합니다.


### Recent Log

Recent Log는

Explorer의 최근 활동을 간단하게 보여주는 영역입니다.

최근 시설 복구,

Mission 완료,

시설 개방 등이 표시됩니다.

Recent Log의 `기록 보기`를 선택하면

Explorer Archive Overlay의 탐험 기록 Tab으로 진입합니다.


### Unlock Rule

시설은

순차적으로 개방됩니다.

```text
Nova

↓

Luna

↓

Spark

↓

Wonder

↓

Cosmic Voyage
```

Cosmic Voyage는

4개의 시설이 모두 복구된 후 개방됩니다.


### MAP 변화

시설이 복구될수록

노바랜드는 점점 활기를 되찾습니다.

예시

- 조명 활성화
- 시설 가동
- 환경 변화
- 오브젝트 변화

Explorer는

MAP만 보아도

노바랜드가 회복되고 있음을 느낄 수 있어야 합니다.


### Progress Rule

Nova Land는 퍼센트 숫자 중심의 시설 진행도를 사용하지 않습니다.

Mission List 하단에는 현재 개방된 시설 단계를 `현재 단계 / 4`와 단계형 Progress Bar로 표시합니다.

Progress Bar는 다음 시설이 개방될 때 한 단계씩 증가하며 퍼센트 숫자를 표시하지 않습니다.

시설의 실제 복구 상태는 Mission List의 상태 문구, MAP 변화와 Cosmic Voyage의 잠금 또는 개방 상태로 전달합니다.


### Cosmic Voyage

Cosmic Voyage는

다섯 번째 시설이 아닙니다.

노바랜드 전체가 하나로 연결되는 마지막 경험입니다.

Movement

+

Life

+

Energy

+

Joy

↓

Harmony

↓

Cosmic Voyage

Explorer는

모든 시설을 복구한 뒤

노바랜드가 완전한 하나의 세계로 연결되는 경험을 하게 됩니다.

---

## Control Room

Control Room은

모든 시설의 시작점이며

Explorer가 시설을 점검하고 복구하는 공간입니다.

시설마다 분위기는 다르지만

공통 UI 시스템과 사용 경험을 유지합니다.

### 역할

Control Room은

단순한 메뉴가 아닙니다.

시설의 현재 상태를 확인하고

Mission을 시작하는 관제 공간입니다.

Explorer는

Control Room을 통해

시설의 상태를 파악하고

Mission을 시작합니다.


### 설계 철학

Control Room은

게임의 메인 메뉴가 아닙니다.

Explorer가 실제 시설을 운영하는

관제실처럼 느껴지는 것을 목표로 합니다.

모든 UI는

시설을 제어하는 인터페이스라는 철학을 유지합니다.


### 공통 레이아웃

모든 시설은 동일한 레이아웃을 사용합니다.

#### 좌측 상단

시설 정보

- 시설명
- 시설 설명


#### 우측 상단

EVE

시설 상태와 안내를 제공합니다.


#### 중앙

Mission Area

시설을 대표하는 메인 공간입니다.

시설마다 다른 비주얼을 사용합니다.


#### 우측 하단

Mission Objective

현재 수행할 Mission을 안내합니다.

체크리스트가 아니라

Mission Brief 역할을 수행합니다.


#### 하단 중앙

Mission Start

Mission Guide를 시작합니다.


#### 하단 Console

시설 제어 콘솔

시설마다 다른 디자인을 사용합니다.


### 공통 규칙

Control Room은

시설마다 분위기는 다르지만

아래 규칙을 유지합니다.

- 동일한 레이아웃
- 동일한 UI 구조
- 동일한 사용자 경험
- 동일한 Overlay System


### 시설 상태 패널

시설 상태 패널은 Explorer가 Mission 시작 전과 진행 중에 현재 시설 상태를 확인하는 읽기 전용 UI입니다.

- 모든 시설에서 동일한 위치, 패널 구조와 정보 계층을 사용합니다.
- 시설 특성에 따라 상태 항목 수, 아이콘, 수치와 상태 문구는 달라질 수 있습니다.
- 수치의 전체 개수와 퍼센트 계산 기준은 각 시설의 난이도와 스테이지 구성에 따릅니다.
- Mission 시작 전에는 저장된 시설 상태를 표시하고, 저장된 상태가 없으면 시설별 초기 상태를 표시합니다.
- Mission 진행 중에는 플레이 결과를 상태 패널에 즉시 반영합니다.
- Mission을 일시정지하면 시설 상태는 변경하지 않고 Mission UI에만 `일시정지`를 표시합니다.
- Mission을 중단하거나 Control Room에 다시 진입하면 저장된 진행 상태를 복원합니다.
- Mission을 완료하면 시설별 완료 조건에 따라 정상 또는 복구 완료 상태를 표시합니다.
- 패널 제목, 항목명과 상태 문구는 현재 선택한 언어로 표시합니다.
- 수집 개수, 연결률처럼 연속적인 진행도를 표현하는 항목에만 Progress Bar를 사용합니다.
- `비활성`, `대기`, `복구 중`, `완료`처럼 단계가 정해진 상태 항목은 상태 문구 또는 Badge로만 표시하고 Progress Bar를 사용하지 않습니다.

시설별 상태 항목, 계산 기준과 상태 전환 조건은 각 시설의 `Control Room Status`에서 정의합니다.

---

## EVE

EVE는

Nova Land 중앙 관제 AI입니다.

Explorer를 지원하는 안내 시스템입니다.

### 역할

- Explorer 안내
- Mission 대화
- 상황 브리핑
- 질문 응답

MAP에서는

짧은 안내 메시지만 제공합니다.

Notice나 긴 대화는 사용하지 않습니다.

MAP의 EVE는 대화 전용 패널입니다.

시설 정보 Row, Status Dashboard, 수치 중심 정보 패널은 사용하지 않습니다.

시설 상태가 필요한 경우 짧은 대화 메시지 안에서 전달합니다.


### 표현 방식

EVE는

과도한 감정을 표현하지 않습니다.

기본적으로

- 차분함
- 정확함
- 신뢰감

을 유지합니다.

Explorer를 응원하지만

영웅처럼 칭찬하지 않습니다.


### 상태 표현

EVE는

시설의 현재 상태를 짧은 대화 메시지로 알려줍니다.

예시

- 대기
- 준비 완료
- 점검 중
- Mission 진행 중
- 시설 복구 완료

MAP에서 EVE 메시지는 타이핑되는 것처럼 순서대로 표시합니다.

EVE가 말하는 동안 Header의 Signal Wave가 움직이고, 메시지 출력이 끝나면 함께 멈춥니다.

---

## Mission System

Mission은

시설을 복구하기 위한 공통 시스템입니다.

시설마다 플레이는 다르지만

Mission Flow는 동일합니다.

### Mission Flow

```text
Mission Start

↓

Mission Guide

↓

Countdown

↓

Play

↓

Complete
```


### Mission Start

Control Room에서

Mission을 시작합니다.

Mission Start를 누르면

Mission Guide가 Overlay로 나타납니다.

---

## Mission Guide

Mission Guide는

Mission을 설명하는 튜토리얼입니다.

Mission Objective를 반복하는 화면이 아닙니다.

Explorer가

플레이 방법을 빠르게 이해하도록 돕습니다.

### 목적

Mission Guide는

플레이를 길게 설명하기 위한 화면이 아닙니다.

Explorer가

30초 이내에

플레이를 이해할 수 있도록 돕는 것을 목표로 합니다.


### 구성

- 시설 소개
- Mission 목표
- 플레이 이미지
- 진행 순서 (최대 3 Step)
- Tip
- EVE 안내
- Mission Start


### 공통 규칙

Guide는

설명보다 이해를 우선합니다.

텍스트는 짧게 작성합니다.

한 화면에서

모든 내용을 이해할 수 있도록 구성합니다.

Guide는

언제든 다시 열 수 있습니다.

---

## Countdown

Countdown은

Mission 시작 전

시설이 활성화되는 연출입니다.

새로운 화면이 아니라

Mission Overlay 안에서 이어집니다.

### 역할

Countdown은

Explorer의 몰입을 높이는 역할을 수행합니다.

시설마다

다른 연출을 사용합니다.

예시

Nova

- 레일 활성화

Luna

- 조명 점등

Spark

- 에너지 충전

Wonder

- 공연 준비

---

## Play

Play는

게임 HUD가 아닙니다.

시설을 운영하는

관제 시스템이라는 철학을 유지합니다.

### 플레이 철학

Play는

게임 점수를 얻기 위한 시간이 아닙니다.

Explorer가

시설을 정상적으로 복구하는 경험에 집중하도록 설계합니다.


### 공통 UI

- Mission
- STATUS
- Timer
- EVE
- Pause


### 사용하지 않는 요소

Play에서는

아래 요소를 사용하지 않습니다.

- HP
- EXP
- Coin
- Combo
- Rank
- Damage


### STATUS

STATUS는

실제 시설의 상태만 표시합니다.

예시

- Ready
- Running
- Charging
- Restoring
- Complete


### Timer

Timer는

Play에서만 사용합니다.

Control Room에서는

표시하지 않습니다.

---

## Pause

Pause는

Mission을 잠시 중단하는 시스템입니다.

### 기능

- Resume
- Restart
- MAP

---

## Fail

Fail은

Game Over가 아닙니다.

시설 복구가

중단된 상태를 의미합니다.

과도한 실패 연출은 사용하지 않습니다.

Explorer가

부담을 느끼지 않도록 설계합니다.

---

## Complete

Mission Complete보다

시설 복구 완료

표현을 우선합니다.

Flow

시설 복구 완료

↓

Explorer Log 기록

↓

Explorer Passport 갱신

↓

MAP

---

## Mission Overlay

Mission Overlay는

Control Room 위에 표시되는 공통 시스템입니다.

새로운 페이지를 만들지 않습니다.

### Overlay 구성

- Mission Guide
- Countdown
- Pause
- Fail
- Complete

모든 시설에서

동일한 Overlay 구조를 사용합니다.

---

## Motion Language

Nova Land는

페이지 이동보다

시설이 준비되고

활성화되는 경험을 중요하게 생각합니다.

### 공통 Motion

- Activation
- Fade
- Glow
- Light
- Glass UI
- Hologram


### 시설별 Motion

#### Nova

- Console
- Rail
- Launch


#### Luna

- Light
- Plant
- Butterfly


#### Spark

- Energy
- Electricity
- Core


#### Wonder

- Curtain
- Spotlight
- Parade

시설마다 다른 Motion을 사용하지만

전체적인 Motion 철학은 동일하게 유지합니다.

---

## 시설

Nova Land의 시설은 단순한 어트랙션이 아닙니다.

각 시설은

노바랜드의 일상을 유지하는 핵심 시스템입니다.

Explorer는

시설을 하나씩 복구하며

노바랜드가 다시 움직일 수 있도록 돕습니다.

---

## Nova Coaster

### 역할

Movement

노바랜드의 이동을 담당하는 시설입니다.


### 컨셉

노바랜드 전체를 연결하는 레일 시스템입니다.

사람과 물자를 이동시키며

노바랜드가 움직일 수 있도록 합니다.


### 시설 상태

레일 연결이 끊어져

정상적으로 운행할 수 없는 상태입니다.

Explorer는

레일을 복구하여

다시 이동할 수 있도록 만듭니다.


### Mission

- 레일 점검
- 레일 연결
- 운행 테스트


### Control Room Status

- 레일 연결: 현재 연결된 필수 레일 수와 전체 필수 레일 수를 `현재 수 / 전체 수`로 표시합니다.
- 시스템 점검: 연결이 완료되기 전에는 `점검 필요`, 완성된 경로의 운행 테스트 중에는 `점검 중`, 열차가 목적지에 안전하게 도착하면 `정상`으로 표시합니다.
- 운행 상태: 복구 전에는 `운행 중단`, 완성된 경로에서 열차가 이동하는 동안에는 `운행 테스트`, 시설 복구가 완료되면 `정상 운행`으로 표시합니다.

필수 레일의 전체 개수는 난이도와 스테이지 구성에 따라 달라집니다.


### 플레이 방향

정확한 타이밍과

빠른 판단으로

레일을 연결합니다.


### 게임 방식

#### 한 줄 설명

레일 조각을 빈칸으로 이동하고 방향을 회전하여 출발 지점과 목적지를 연결한 뒤 열차를 안전하게 운행시키는 퍼즐입니다.

#### 장르

Rail Connection Puzzle

#### 플레이 화면 구성

- 화면에는 출발 지점과 목적지 사이의 레일 보드가 표시됩니다.
- 레일 보드는 여러 개의 칸으로 구성됩니다.
- 일부 칸에는 레일 조각이 배치되어 있으며 일부 칸은 비어 있습니다.
- 레일 조각은 직선, 곡선, 분기 등 서로 다른 형태를 가집니다.
- Explorer는 레일 조각을 빈칸으로 이동하거나 방향을 회전하여 경로를 완성해야 합니다.
- 출발 지점과 목적지는 고정되어 있으며 이동하거나 회전할 수 없습니다.

#### 플레이 조작

##### PC

- 레일 조각을 드래그하여 빈칸으로 이동합니다.
- 배치된 레일 조각을 클릭하면 시계 방향으로 90° 회전합니다.

##### Mobile

- 레일 조각을 드래그하여 빈칸으로 이동합니다.
- 배치된 레일 조각을 탭하면 시계 방향으로 90° 회전합니다.

#### 플레이 순서

- 출발 지점과 목적지를 확인합니다.
- 레일 조각의 형태와 현재 배치를 확인합니다.
- 필요한 레일 조각을 빈칸으로 이동합니다.
- 레일 조각을 회전하여 연결 방향을 맞춥니다.
- 모든 레일을 이어 하나의 이동 경로를 완성합니다.
- 출발 지점과 목적지가 연결되면 열차가 자동으로 출발합니다.
- 열차가 목적지까지 안전하게 도착하면 시설 복구가 완료됩니다.

#### 핵심 조작

- 레일 조각 이동
- 빈칸 이동
- 레일 조각 회전
- 레일 연결

#### 배치 규칙

- 레일 조각은 빈칸으로만 이동할 수 있습니다.
- 레일 조각끼리 서로 위치를 교체할 수 없습니다.
- 출발 지점과 목적지는 이동하거나 회전할 수 없습니다.
- 레일 조각은 언제든 다시 이동하거나 회전할 수 있습니다.
- 모든 레일이 끊김 없이 연결되어야 하나의 경로로 인정됩니다.

#### 완료 조건

- 출발 지점과 목적지가 하나의 레일 경로로 연결되어야 합니다.
- 모든 레일이 올바른 방향으로 연결되어야 합니다.
- 열차가 목적지까지 안전하게 도착해야 합니다.

#### 난이도 상승

##### Easy

- 4 × 4 레일 보드
- 레일 조각 수가 적습니다.
- 직선과 곡선 레일만 등장합니다.
- 이동 횟수가 적어 경로를 쉽게 완성할 수 있습니다.

##### Normal

- 5 × 5 레일 보드
- 레일 조각 수가 증가합니다.
- 일부 레일이 시작부터 잘못된 방향으로 배치됩니다.
- 이동과 회전을 함께 고려해야 합니다.

##### Hard

- 6 × 6 레일 보드
- 분기 레일(T자형)이 추가됩니다.
- 더미 레일이 함께 배치됩니다.
- 여러 후보 경로 중 올바른 경로를 찾아야 합니다.

##### Expert

- 7 × 7 레일 보드
- 교차 레일(X자형)이 추가됩니다.
- 더미 레일 비율이 증가합니다.
- 이동과 회전 횟수가 크게 증가합니다.
- 제한 시간 안에 최적의 경로를 완성해야 합니다.


### 복구 결과

- 레일 활성화
- 차량 운행
- 이동 재개

MAP에서도

움직이는 모습을 확인할 수 있습니다.


### Motion

- Console Activation
- Rail Lighting
- Launch Sequence


### 대표 컬러

- Electric Violet
- Purple

---

## Luna Light Garden

### 역할

Life

노바랜드의 생명과 빛을 담당하는 공간입니다.


### 컨셉

밤이 되면

정원이 빛으로 가득 차는

거대한 미래형 식물원입니다.


### 시설 상태

빛이 사라져

정원이 어둠 속에 멈춰 있습니다.

Explorer는

빛을 다시 모아

정원을 되살립니다.


### Mission

- 빛 조각 수집
- 조명 복구
- 정원 활성화


### Control Room Status

- 빛 조각: 현재 수집한 Light Fragment 수와 난이도별 필요 개수를 `현재 수 / 전체 수`로 표시합니다.
- 경로 연결: 빛이 도달한 필수 노드 수를 전체 필수 노드 수로 나눈 값을 퍼센트로 표시합니다. 필수 노드에는 꽃, 식물, 중앙 Lotus가 포함됩니다.
- 정원 활성화: Mission 시작 전에는 `비활성`, 하나 이상의 꽃이나 식물이 활성화된 뒤에는 `활성화 중`, 모든 대상이 활성화되고 중앙 Lotus가 개화하면 `완료`로 표시합니다.
- 복구 상태: Mission 시작 전에는 `대기`, Mission 진행 중에는 `복구 중`, 중앙 Lotus가 완전히 개화하면 `복구 완료`로 표시합니다.

빛 조각의 전체 개수와 경로 연결률은 난이도와 스테이지 구성에 따라 달라집니다.


### 플레이 방향

빛의 조각을 모아

프리즘을 회전시키고

빛의 흐름을 연결하여

정원을 하나씩 회복시키는 퍼즐 경험을 제공합니다.


### 게임 방식

#### 한 줄 설명

프리즘을 회전하여 빛의 방향을 바꾸고 반딧불과 빛을 꽃까지 연결해 중앙 Lotus를 개화시키는 퍼즐입니다.

#### 장르

Light Prism Puzzle

#### 플레이 화면 구성

- 화면에는 빛이 시작되는 발광 지점이 표시됩니다.
- 정원 곳곳에는 여러 개의 프리즘이 배치되어 있습니다.
- 프리즘은 빛을 서로 다른 방향으로 반사합니다.
- 빛이 도달해야 하는 꽃과 식물이 정원 곳곳에 배치됩니다.
- 반딧불은 연결된 빛의 경로를 따라 이동합니다.
- 모든 빛의 최종 목적지는 정원 중앙의 Lotus입니다.

#### 플레이 조작

##### PC

- 프리즘을 클릭하면 시계 방향으로 90° 회전합니다.

##### Mobile

- 프리즘을 탭하면 시계 방향으로 90° 회전합니다.

#### 플레이 순서

- 정원 곳곳에 흩어진 Light Fragment를 수집합니다.
- 수집한 Light Fragment로 프리즘을 활성화합니다.
- 프리즘을 회전하여 빛의 방향을 변경합니다.
- 빛이 다음 프리즘이나 꽃으로 이어지도록 경로를 연결합니다.
- 연결된 빛을 따라 반딧불이 이동합니다.
- 꽃과 식물이 차례대로 활성화됩니다.
- 모든 빛의 경로가 중앙 Lotus까지 연결되면 Lotus가 개화합니다.
- Lotus가 완전히 개화하면 정원 복구가 완료됩니다.

#### 핵심 조작

- Light Fragment 수집
- 프리즘 회전
- 빛의 경로 연결

#### 배치 규칙

- 프리즘은 이동할 수 없습니다.
- 프리즘은 90° 단위로 회전합니다.
- 빛은 연결된 프리즘 방향으로만 진행됩니다.
- 모든 빛의 경로가 끊기지 않아야 합니다.

#### 완료 조건

- 빛이 필요한 꽃과 식물이 모두 활성화되어야 합니다.
- 최종 빛의 경로가 중앙 Lotus까지 연결되어야 합니다.
- 중앙 Lotus가 완전히 개화해야 합니다.

#### 난이도 상승

##### Easy

- 프리즘 2개
- 직선 위주의 빛 경로
- 연결해야 할 꽃이 적습니다.

##### Normal

- 프리즘 3~4개
- 분기되는 빛 경로가 등장합니다.
- 여러 꽃을 순서대로 활성화해야 합니다.

##### Hard

- 프리즘 수가 증가합니다.
- 여러 프리즘을 연속으로 회전해야 합니다.
- 불필요한 빛 경로가 함께 배치됩니다.

##### Expert

- 다양한 색상의 빛이 등장합니다.
- 여러 빛 경로를 동시에 연결해야 합니다.
- 제한 시간 안에 모든 꽃과 Lotus를 개화시켜야 합니다.


### 복구 결과

- 나무 점등
- 식물 활성화
- 반딧불 출현
- 분수 가동


### Motion

- Light Bloom
- Leaf Animation
- Butterfly Hologram


### 대표 컬러

- Mint
- Soft Teal

---

## Spark Energy Tower

### 역할

Energy

노바랜드 전체에 에너지를 공급하는 시설입니다.


### 컨셉

거대한 에너지 코어를 중심으로

도시 전체의 동력을 공급하는 타워입니다.


### 시설 상태

에너지 공급이 중단되어

시설이 정지한 상태입니다.

Explorer는

코어를 다시 활성화합니다.


### Mission

- 에너지 연결
- 코어 충전
- 출력 안정화


### 플레이 방향

코어의 위치와 형태를 기억하고

올바른 슬롯에 배치하여

에너지 타워를 다시 가동시키는 기억 중심 퍼즐을 제공합니다.


### 게임 방식

#### 한 줄 설명

잠시 공개되는 코어의 모양과 색상, 위치를 기억한 뒤 코어를 올바른 슬롯에 배치하여 에너지 타워를 충전하는 기억 퍼즐입니다.

#### 장르

Core Memory Puzzle

#### 플레이 화면 구성

- 화면 중앙에는 여러 개의 빈 코어 슬롯이 배치된 에너지 타워가 표시됩니다.
- 플레이 시작 시 각 슬롯에 배치된 코어의 모양과 색상이 잠시 공개됩니다.
- 공개 시간이 끝나면 코어가 사라지고 빈 슬롯만 남습니다.
- 화면 한쪽에는 배치해야 할 코어 목록이 표시됩니다.
- 각 코어는 서로 다른 모양과 색상을 가지고 있습니다.
- 타워 옆에는 현재 충전 상태를 보여주는 Charge 표시가 나타납니다.

#### 플레이 조작

##### PC

- 코어를 드래그하여 원하는 슬롯에 배치합니다.

##### Mobile

- 코어를 드래그하여 원하는 슬롯에 배치합니다.

#### 플레이 순서

- 타워 슬롯에 공개되는 코어를 확인합니다.
- 코어의 모양, 색상, 위치를 기억합니다.
- 공개 시간이 끝나면 코어가 사라집니다.
- 코어 목록에서 원하는 코어를 선택합니다.
- 기억한 위치의 슬롯으로 드래그하여 배치합니다.
- 올바르게 배치된 슬롯은 즉시 활성화됩니다.
- 모든 코어를 올바른 위치에 배치하면 Charge가 100%까지 충전됩니다.
- 에너지 충전이 완료되면 시설 복구가 완료됩니다.

#### 핵심 조작

- 코어 기억
- 코어 드래그
- 슬롯 배치

#### 배치 규칙

- 코어는 빈 슬롯에만 배치할 수 있습니다.
- 잘못 배치한 코어는 다시 이동할 수 있습니다.
- 모든 코어는 처음 공개된 위치와 일치해야 합니다.
- 모든 슬롯이 활성화되어야 충전이 완료됩니다.

#### 완료 조건

- 모든 코어가 올바른 슬롯에 배치되어야 합니다.
- Charge가 100%에 도달해야 합니다.
- 에너지 타워가 정상적으로 가동되어야 합니다.

#### 난이도 상승

##### Easy

- 코어 4개
- 모양과 색상이 모두 다릅니다.
- 공개 시간이 충분합니다.

##### Normal

- 코어 개수가 증가합니다.
- 비슷한 모양의 코어가 등장합니다.
- 공개 시간이 감소합니다.

##### Hard

- 같은 색상 계열의 코어가 추가됩니다.
- 비슷한 모양과 색상이 함께 등장합니다.
- 슬롯 개수가 증가합니다.

##### Expert

- 코어 개수가 크게 증가합니다.
- 거의 동일한 모양과 색상이 함께 등장합니다.
- 공개 시간이 매우 짧아집니다.
- 제한 시간 안에 모든 코어를 배치해야 합니다.


### 복구 결과

- 코어 활성화
- 전력 공급
- 도시 조명 복구


### Motion

- Electric Pulse
- Core Charging
- Energy Beam


### 대표 컬러

- Orange
- Gold
- White

---

## Wonder Parade Hall

### 역할

Joy

노바랜드의 축제와 공연을 담당하는 공간입니다.


### 컨셉

노바랜드의 모든 축제가 시작되는

중앙 공연장입니다.


### 시설 상태

공연 준비가 멈춰

퍼레이드가 시작되지 못하고 있습니다.

Explorer는

무대를 다시 준비합니다.


### Mission

- 공연 준비
- 캐릭터 배치
- 퍼레이드 시작


### 플레이 방향

퍼레이드 캐릭터를

올바른 위치와 순서로 배치하여

무대를 완성하는 퍼즐 경험을 제공합니다.


### 게임 방식

#### 한 줄 설명

퍼레이드 캐릭터를 올바른 위치와 순서에 배치하여 무대를 완성하고 퍼레이드를 시작하는 퍼즐입니다.

#### 장르

Parade Arrangement Puzzle

#### 플레이 화면 구성

- 화면에는 퍼레이드가 진행될 무대와 행진 라인이 표시됩니다.
- 행진 라인에는 캐릭터가 배치될 여러 개의 위치가 표시됩니다.
- 화면 한쪽에는 배치해야 할 퍼레이드 캐릭터들이 대기합니다.
- 캐릭터마다 정해진 위치와 행진 순서가 존재합니다.
- 모든 캐릭터를 올바르게 배치하면 무대가 활성화됩니다.

#### 플레이 조작

##### PC

- 캐릭터를 드래그하여 원하는 위치에 배치합니다.

##### Mobile

- 캐릭터를 드래그하여 원하는 위치에 배치합니다.

#### 플레이 순서

- 이번 퍼레이드에 참가할 캐릭터를 확인합니다.
- 무대와 행진 라인의 배치 위치를 확인합니다.
- 캐릭터를 원하는 위치로 드래그합니다.
- 위치와 행진 순서를 맞추며 모든 캐릭터를 배치합니다.
- 잘못 배치한 캐릭터는 다시 이동하여 수정합니다.
- 모든 캐릭터가 올바르게 배치되면 무대가 활성화됩니다.
- 조명과 공연 연출이 시작됩니다.
- 퍼레이드가 정상적으로 출발하면 시설 복구가 완료됩니다.

#### 핵심 조작

- 캐릭터 확인
- 캐릭터 드래그
- 위치 배치
- 행진 순서 정렬

#### 배치 규칙

- 캐릭터는 빈 위치에만 배치할 수 있습니다.
- 잘못 배치한 캐릭터는 언제든 다시 이동할 수 있습니다.
- 모든 캐릭터는 지정된 위치와 순서를 만족해야 합니다.
- 모든 배치가 완료되어야 퍼레이드가 시작됩니다.

#### 완료 조건

- 모든 캐릭터가 지정된 위치에 배치되어야 합니다.
- 퍼레이드의 행진 순서가 올바르게 완성되어야 합니다.
- 공연이 정상적으로 시작되어야 합니다.

#### 난이도 상승

##### Easy

- 캐릭터 4명
- 배치 위치가 모두 표시됩니다.
- 캐릭터 특징이 뚜렷합니다.

##### Normal

- 캐릭터 수가 증가합니다.
- 비슷한 캐릭터가 등장합니다.
- 일부 배치 위치 힌트가 사라집니다.

##### Hard

- 캐릭터 수가 더욱 증가합니다.
- 위치와 행진 순서를 함께 고려해야 합니다.
- 비슷한 의상과 소품의 캐릭터가 등장합니다.
- 배치 가능한 위치가 증가합니다.

##### Expert

- 다양한 캐릭터 조합이 등장합니다.
- 위치와 순서를 모두 기억해야 합니다.
- 모든 배치 힌트가 제거됩니다.
- 제한 시간 안에 퍼레이드를 완성해야 합니다.


### 복구 결과

- 조명 점등
- 무대 활성화
- 퍼레이드 시작


### Motion

- Curtain Open
- Stage Lighting
- Confetti


### 대표 컬러

- Pink
- Rose
- Gold

---

## Cosmic Voyage

### 역할

Harmony

Cosmic Voyage는

새로운 시설이 아닙니다.

Movement

Life

Energy

Joy

네 시설이 하나로 연결되어

노바랜드 전체가 완전한 모습으로 회복되는 마지막 경험입니다.


### 개방 조건

Nova

↓

Luna

↓

Spark

↓

Wonder

↓

Complete

↓

Cosmic Voyage


### 컨셉

네 시설이 회복되면서

노바랜드 전체가

하나의 거대한 세계로 연결됩니다.

Explorer는

노바랜드가 완전히 회복되는 순간을 경험합니다.


### 플레이 방향

Cosmic Voyage는

경쟁이나 미션보다

체험과 연출을 중심으로 진행됩니다.


### 핵심 키워드

Movement

+

Life

+

Energy

+

Joy

↓

Harmony

↓

Cosmic


### 대표 컬러

Cosmic Voyage는 단일 대표색을 사용하지 않습니다.

- Pearl White 중심광
- Pale Silver Blue 보조광
- Nova, Luna, Spark와 Wonder 컬러가 연결되는 Aurora Gradient
- 봉인 상태의 Gray

Aurora Gradient는 네 시설의 에너지가

하나의 Harmony로 합쳐졌음을 보여주는 Ending 전용 컬러 표현입니다.


### Ending Connection

Cosmic Voyage가 종료되면

Explorer의 탐험도 마무리됩니다.

Explorer는

노바랜드를 떠나지만

노바랜드의 하루는

다시 시작됩니다.

---

## 문서 관리

### 목적

본 문서는

Nova Land의 Master Project 문서입니다.

README는 프로젝트 소개를,

Roadmap은 제작 일정을,

본 문서는 기획과 디자인, 개발의 기준 문서로 사용합니다.


### 관리 원칙

- 현재 확정본을 최우선으로 유지합니다.
- 확정되지 않은 내용은 포함하지 않습니다.
- 기능 추가 시 해당 섹션만 업데이트합니다.
- 삭제보다 최신화(Update)를 우선합니다.

---

## 현재 진행 상태

### 기획

✅ 완료

- 프로젝트 철학
- 세계관
- User Flow
- 시설 기획
- Mission System
- Motion Language

### 디자인

시안 제작 종료

- MAP
- Control Room PC 참고 시안: Nova Coaster
- Control Room PC 참고 시안: Luna Light Garden
- 추가 정적 이미지 시안은 제작하지 않습니다.
- Spark Energy Tower와 Wonder Parade Hall은 공통 Control Room 구조와 시설별 Modifier를 사용하여 코드로 구현합니다.
- Mobile은 PC 공통 구조를 기준으로 반응형 코드에서 구현합니다.
- Mission Guide, Countdown, Play, Pause, Fail, Complete, Explorer Archive와 Ending은 문서와 기존 비주얼 시스템을 기준으로 코드에서 설계합니다.


### 개발

진행 중

- 1단계: 구현에 사용할 배경, EVE, 시설 이미지와 아이콘 자산 목록 정리 → 완료
- 2단계: MAP 배경, EVE, Explorer 프로필, Logo와 시설별 SVG Icon 제작 → 완료
- 3단계: 프로젝트 기반, 디자인 토큰과 공통 UI 컴포넌트 구조 확정 → 완료
- 4단계: MAP PC 화면과 시설 선택 인터랙션 구현 → 완료
- 5단계: 시설 Identity Color 정리, Explorer Archive, 설정, 언어와 저장 공통 시스템 구현 → 다음 작업
- 6단계: Nova Coaster 자산, Control Room 공통 구조와 공통 Mission Flow 구현 → 예정
- 7단계: Luna Light Garden 자산과 Mission 구현 → 예정
- 8단계: Spark Energy Tower 자산과 Mission 구현 → 예정
- 9단계: Wonder Parade Hall 자산과 Mission 구현 → 예정
- 10단계: Cosmic Voyage, Explorer Certification과 Ending 구현 → 예정
- 11단계: Mobile·Tablet 반응형, 접근성, 성능, 사운드와 최종 QA → 예정

---

## 변경 이력

### v1.9

- Mission List 선택, EVE 안내와 World Map 시설 진입을 순차 행동 유도로 연결
- EVE 안내 종료 후 선택 시설에만 Guide Glow와 Arrow가 표시되도록 상태 분리
- Explorer Log와 Explorer Passport를 Explorer Archive 공통 Overlay의 동등한 Tab으로 확정
- Recent Log와 Explorer Profile의 Explorer Archive 진입 역할 확정
- Nova Coaster를 Electric Violet, Luna를 Mint로 분리하는 시설 Identity Color 방향 확정
- Cosmic Voyage를 Pearl White 중심광과 네 시설 컬러의 Aurora Gradient로 확정
- `project.md`, `roadmap.md`와 `README.md`의 현재 구현 상태와 용어를 동기화


### v1.8

- Top Navigation, Mission List, World Map 시설 Card, EVE와 Recent Log를 MAP PC 화면에 구현
- Mission List와 World Map Card의 선택 상태를 공통 시설 데이터로 동기화
- 잠금, 선택 가능, 완료와 봉인 상태 및 선택 시설 Glow 구현
- 잠금 시설 EVE 안내와 선택 가능 시설의 Control Room 진입 흐름 구현
- 기본 UI 문구와 시설 상태를 한글로 통일하고 시설 역할을 Movement, Life, Energy와 Joy 기준으로 수정
- Mission List의 시설 선택과 World Map의 Control Room 진입 역할을 분리
- Nova Land Logo Lockup과 시설별 SVG 아이콘을 적용하고 기존 MAP 시설 썸네일을 제거
- 잠긴 시설 Marker와 Cosmic Voyage 비공개명 표현을 적용
- EVE 타이핑과 Signal Wave 동기화 Motion 구현
- Mission List 하단에 4단계 Progress Bar 추가
- MAP 배경과 UI를 독립 레이어로 유지하고 4단계 완료


### v1.7

- 기존 HTML, CSS와 JavaScript를 최신 기획 기준으로 재작성
- 디자인 토큰과 공통 Panel, Button, Card, Badge, Toast, Overlay 구현
- 시설, 상태, 문구와 언어 데이터를 JavaScript Module로 분리
- 공통 SVG Sprite와 기본 Focus, Hover 상태 구축
- 3단계 완료 및 MAP PC 구현 단계 전환


### v1.6

- UI가 없는 1920 × 1080 MAP 배경 제작
- 공통 EVE와 Explorer 프로필 투명 WebP 제작
- Nova Land 심볼 SVG 제작
- MAP 시설 썸네일 4개 제작
- MAP 필수 자산 제작 완료 및 3단계 작업 전환


### v1.5

- 자산 제작이 누락되지 않도록 전체 개발 순서 재설계
- 공통 시스템, 시설별 자산과 Mission 구현 순서 분리
- 반응형, 접근성, 성능, 사운드와 최종 QA 단계 추가
- `roadmap.md`를 최신 Mission 기획과 동일한 기준으로 개편


### v1.4

- 구현 자산 관리 원칙 확정
- MAP과 Control Room의 필수 이미지 자산 정의
- 공통 EVE의 시설별 컬러 기준 확정
- 구현용 자산 폴더 계획 추가
- 기존 코드는 파일을 폐기하지 않고 기본 구조만 유지한 뒤 재작성하도록 확정


### v1.3

- 추가 정적 이미지 시안 제작 종료
- PNG 시안은 비주얼 참고용으로만 사용하고 세부 수정은 코드에서 처리하도록 확정
- 실제 확정 자료를 기준으로 디자인 진행 상태 수정
- 시설 상태 패널의 Progress Bar 사용 기준 확정
- 개발 진행 순서 추가


### v1.2

- UI 기본 언어를 한국어로 확정
- 한국어와 영어 전환 기능 추가
- 영어 고정 표기 항목 확정
- Control Room 시설 상태 패널 공통 규칙 추가
- Nova와 Luna의 시설별 Control Room Status 규칙 확정


### v1.1

- MAP 패널 하단 정렬 기준 확정
- Mission List 상시 펼침 상태 확정
- MAP Mission Progress 제거
- EVE 대화 전용 패널 확정
- 레이어 및 구현 원칙 추가
- MAP 승인 시안 경로 추가


### v1.0

- 프로젝트 철학 확정
- 세계관 확정
- User Flow 확정
- Mission System 확정
- Facility 기획 확정
