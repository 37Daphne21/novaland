# Nova Land - 프로젝트 md 최신화

## 프로젝트 개요

### 프로젝트명

Nova Land

### 프로젝트 타입

Playful Portfolio Project

### 프로젝트 컨셉

- 신규 테마파크 오픈 기념 인터랙티브 이벤트 페이지
- 개장 전 시설 점검 탐험가 체험
- 게임보다 브랜드 경험 우선
- 스크롤 없는 원페이지
- 마케팅 이벤트 페이지 형태
- 실제 놀이공원을 탐험하는 경험 제공
- PC / Mobile 동시 대응

---

## 세계관

### 사용자 역할

개장 전 노바랜드 시설을 점검하는 탐험가

### 스토리

노바랜드 개장을 앞두고 주요 시설에 이상이 발생한다.

탐험가는 각 시설을 점검하고 문제를 해결하여 노바랜드의 개장을 완성해야 한다.

### 관제 시스템

EVE

- 시설 미션 안내
- 상태 보고
- 엔딩 메시지 제공

---

## 메인 플로우

```text
인트로

↓

탐험가 등록

↓

노바랜드 맵

↓

시설 탐험

↓

스탬프 획득

↓

4개 시설 완료

↓

Cosmic Voyage 오픈

↓

노바랜드 개장

↓

최종 보상
```

---

## 탐험가 등록

### 기능

- 닉네임 입력
- 랜덤 닉네임 생성
- 닉네임 재설정 가능

### 설정 메뉴

- 처음부터 다시 시작
- 탐험가 이름 변경
- BGM 음량 조절
- 시간 변경

---

## 시간 시스템

### 모드

- Day
- Sunset
- Night

시설 및 메인 맵 조명이 시간에 따라 변경된다.

---

## 공통 시스템

### 좌측 메뉴

- MAP
- NOVA CONTROL
- LOG BOOK
- SETTING

### 우측 카드

- EVE 메시지
- Mission Objective

### 하단 CTA

MISSION START

---

## 시설 컬러

| 시설 | 메인 컬러 |
|------|----------|
| Nova Coaster | Blue + Cyan |
| Luna Light Garden | Green + Mint |
| Spark Energy Tower | Yellow + Orange |
| Wonder Parade Hall | Pink + Coral |
| Cosmic Voyage | White + Gold |

---

# Nova Coaster

## 컨셉

우주 열차 관제 미션

## 플레이 방식

팝업형 퍼즐

## 플로우

```text
관제실

↓

플레이 방법

↓

카운트다운

↓

레일 연결

↓

MISSION COMPLETE

↓

관제실 복귀
```

## 특징

- 유일한 팝업 플레이
- 레일 퍼즐
- 카운트다운
- 일시정지 기능

---

# Luna Light Garden

## 컨셉

야간 정원 복구 미션

## 플레이 방식

전체 화면 탐험

## 플레이

- 빛의 조각 발견
- 반딧불 유도
- 유리돔 복구
- 정원 점등

## 특징

- 시간 제한 없음
- 실패 없음
- 탐험 + 힐링

---

# Spark Energy Tower

## 컨셉

에너지 코어 복구 미션

## 플레이 방식

전체 화면

## 플레이

### Round 1

코어 정렬

25%

### Round 2

코어 정렬

50%

### Round 3

코어 정렬

75%

### Round 4

최종 정렬

100%

### 완료

에너지 발사

## 특징

- 4단계 난이도
- 점진적 에너지 충전
- 가장 높은 난이도

---

# Wonder Parade Hall

## 컨셉

퍼레이드 준비 미션

## 플레이 방식

전체 화면

## Round 1

캐릭터 위치 기억

```text
1 2
3 4
```

↓

암전

↓

위치 변경

↓

원래 위치 복구

## Round 2

캐릭터 동작 기억

### 캐릭터 1

2개 입력

### 캐릭터 2

4개 입력

### 캐릭터 3

6개 입력

### 캐릭터 4

8개 입력

### 예시

```text
↑ →

→ ↑ ← ↓
```

## 특징

- 기억
- 순발력
- 퍼레이드 연출

---

# 스탬프북

## 시설 완료 보상

### Nova

푸드 쿠폰

### Luna

가든 무료 입장권

### Spark

우선 탑승권

### Wonder

퍼레이드 좌석권

---

## 최종 보상

4개 스탬프 완료 시

Cosmic Voyage 오픈

---

# Cosmic Voyage

## 역할

노바랜드 시그니처 어트랙션

## 컨셉

플라잉 시어터

우주와 시간을 여행하는 최종 어트랙션

## 플레이

```text
4개 시설 완료

↓

게이트 활성화

↓

탑승

↓

과거

↓

현재

↓

미래

↓

노바랜드 개장
```

## 조작

- 마우스 시점 이동
- 모바일 자이로

## 특징

- 게임 없음
- 체험형 콘텐츠
- 엔딩 시퀀스

---

# 엔딩

## 플로우

```text
Cosmic Voyage 종료

↓

노바랜드 귀환

↓

시설 점등

↓

퍼레이드

↓

불꽃놀이

↓

NOVA LAND GRAND OPEN
```

## EVE 메시지

탐험가님 덕분에 노바랜드가 개장했습니다.

## 최종 화면

```text
THANK YOU EXPLORER

NOVA LAND

MISSION COMPLETE
```

---

# 제작 우선순위

## Phase 1

- Intro
- 탐험가 등록
- 메인 맵
- 설정
- EVE

## Phase 2

- Nova Coaster

## Phase 3

- Luna Light Garden

## Phase 4

- Spark Energy Tower

## Phase 5

- Wonder Parade Hall

## Phase 6

- Cosmic Voyage

## Phase 7

- 엔딩
- 보상
- 스탬프북

---

# 현재 진행 상태

## 기획

95%

## 디자인

85%

## 개발

0%

## 다음 단계

- 전체 시안 제작
- IA 설계
- 개발 로드맵
- 실제 제작 시작