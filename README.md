# Nova Land

> 지구와 공명하는 세계를 다시 연결하는 Explorer의 여정

Nova Land는 지구에서는 테마파크로 알려져 있지만, 실제로는 Nova People이 살아가는 하나의 세계를 표현한 인터랙티브 브랜드 경험 포트폴리오입니다.

사용자는 EVE의 구조 신호에 응답해 Explorer가 되고 네 개의 시설을 차례로 복구합니다. 시설이 하나씩 깨어날 때마다 조명과 환경, 지도의 상태가 변화하고 노바랜드와 지구를 잇는 중심 순환이 다시 이어집니다.

---

## 프로젝트 소개

Nova Land는 단순한 홈페이지나 점수 중심의 게임이 아닙니다.

브랜드가 가진 분위기와 이야기를 공간, 인터랙션과 변화로 경험하도록 설계한 웹 프로젝트입니다. 사용자는 설명을 읽는 관람자가 아니라 세계의 회복에 참여하는 탐험가가 됩니다.

핵심 경험은 다음과 같습니다.

- 하나의 World Map에서 이어지는 탐험
- Explorer 이름 등록과 Passport 발급
- 시설 선택과 EVE의 안내
- 시설마다 다른 복구 Mission
- 행동에 반응해 변화하는 세계
- 탐험 기록과 Passport Stamp
- 네 시설이 연결되는 마지막 COSMIC VOYAGE

---

## 이야기

노바랜드는 지구에 즐거움과 설렘, 위로를 전하고 그 경험에서 태어난 공명을 중심 에너지로 순환시키는 세계입니다. 공명의 흐름이 약해지면서 중심 순환과 주요 시설의 운영이 멈췄습니다.

지구에서 EVE의 구조 신호에 응답한 사용자는 Explorer로 등록되고 Passport를 발급받습니다. Explorer는 EVE의 안내를 받아 이동, 생명, 에너지와 즐거움을 담당하는 네 시설을 복구하고, 모든 에너지가 다시 연결되면 중심 관문인 COSMIC VOYAGE가 개방됩니다.

Explorer는 영웅이 아니라 노바랜드가 다시 움직일 수 있도록 돕는 방문자입니다. 이 프로젝트의 진짜 주인공은 변화하는 Nova Land입니다.

---

## 시설

### NOVA COASTER

Movement Facility

끊어진 Rail을 연결해 열차가 다시 안전하게 운행하도록 복구하는 퍼즐입니다.


### LUNA LIGHT GARDEN

Life Facility

Prism을 회전해 빛의 경로를 연결하고 어두워진 정원과 중앙 Lotus를 되살리는 퍼즐입니다.


### SPARK ENERGY TOWER

Energy Facility

잠시 공개되는 Core의 모양, 색과 위치를 기억해 올바른 Slot에 배치하는 기억 퍼즐입니다.


### WONDER PARADE HALL

Joy Facility

Parade Character의 위치와 행진 순서를 복원해 멈춘 공연을 다시 시작하는 배치 퍼즐입니다.


### COSMIC VOYAGE

Harmony Experience

Movement, Life, Energy와 Joy가 하나로 연결되어 완성되는 Nova Land의 마지막 경험입니다.

---

## 주요 경험

### Intro & Explorer Passport

EVE의 구조 신호에 응답해 이름을 등록하고, 노바랜드의 Explorer임을 기록하는 Passport를 발급받습니다.


### World Map

시설의 잠금과 복구 상태, 노바랜드의 변화를 한눈에 확인하는 모든 탐험의 시작점입니다.


### Control Room

시설의 상태와 Mission 목표를 확인하고 복구를 시작하는 관제 공간입니다.


### EVE

시설 상태와 다음 행동을 차분하고 정확하게 안내하는 노바랜드의 중앙 관제 AI입니다.


### Explorer Archive

완료한 Mission과 시설 복구 기록, Stamp와 보상을 Explorer Log와 Passport에 남깁니다.


### Environment & Settings

현재 시간·날씨 표시와 전체 화면 설정을 제공하며, 언어·시간과 사운드 설정은 공통 시스템 구현 단계에서 연결합니다.

---

## 디자인 방향

- 배경과 인터페이스가 자연스럽게 어우러지는 Glass UI
- 시설 역할을 구분하는 Electric Violet, Mint, Orange와 Pink
- 네 시설의 에너지를 연결하는 Aurora Gradient
- 정보보다 세계와 시설이 먼저 보이는 화면
- PC와 Mobile 환경에 맞춘 각각의 사용 경험
- 화려함보다 다음 행동이 명확한 인터랙션

---

## 기술

- Semantic HTML
- CSS
- JavaScript ES Modules
- SVG Sprite
- Fullscreen API

별도의 프레임워크 없이 공통 UI와 상태 기반 인터랙션을 구성하고 있습니다.

---

## 제작 현황

현재 최초 방문 Intro, Explorer 이름 등록, Passport 최초 발급과 WORLD MAP 연결 인터페이스부터 PC World Map의 Mission 우선 선택 흐름, EVE 안내와 시설별 단계적 조명 변화까지 연결했습니다. 화면 전환, 키보드 Focus와 PC·Mobile 화면 검수도 완료했습니다.

다음 단계에서 Explorer Archive와 Passport의 Stamp·쿠폰 페이지, Save Data를 연결합니다. 이후 PC NOVA COASTER로 공통 Mission Flow를 완성한 뒤 Mobile World Map을 전용 HUD로 재설계할 예정입니다.

---

## 프로젝트 목표

- 게임보다 브랜드 경험을 우선하는 인터랙션
- 사용자의 행동과 세계의 변화를 연결하는 UX
- PC와 Mobile에서 각 환경에 맞게 이어지는 경험
- 실제 구현과 유지보수가 가능한 UI 구조
- 포트폴리오와 이벤트 페이지 수준을 함께 만족하는 완성도

---

## 문서

- [Project Guide](./project.md)
- [Roadmap](./roadmap.md)

---

## Created By

ING

Web Publisher
