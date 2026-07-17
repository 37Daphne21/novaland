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

### 노바 시민

노바랜드는 실제 도시의 일부이다.

- Nova Coaster : 교통 시설
- Luna Light Garden : 공공 정원
- Spark Energy Tower : 에너지 시설
- Wonder Parade Hall : 문화 시설
- Cosmic Voyage : 미래 관측 시설

### 탐험가

사용자는 개장 전 시설 점검 탐험가이다.

노바랜드 개장을 위해 각 시설의 문제를 해결한다.

### EVE

시설 관리 AI

- 시설 안내
- 상태 보고
- 미션 설명
- 엔딩 메시지

---

## 메인 플로우

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

MAP 복귀

↓

Stamp / Unlock

↓

Cosmic Voyage

↓

Reward / Ending
```

---

## 탐험가 등록

### 기능

- 닉네임 입력
- 랜덤 닉네임 생성
- 닉네임 재설정 가능

---

## 설정

### 기능

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

## MAP

### 완료

- 메인 맵 PC
- 메인 맵 Mobile
- 진행 상태
- 잠금 시설
- Cosmic Voyage 봉인 상태
- BEFORE / AFTER 구조

---

## Control Room

### 완료

#### PC

- Nova Coaster
- Luna Light Garden
- Spark Energy Tower
- Wonder Parade Hall

#### Mobile

- Nova Coaster
- Luna Light Garden
- Spark Energy Tower
- Wonder Parade Hall

---

## Control Room 공통 UI

### 좌측 상단

- MAP

### 우측 상단

- EVE

### 우측 하단

- STATUS

### 좌측 하단

- Mission Objective

### 하단 중앙

- Mission Start

---

## Control Room 공통 규칙

- STATUS는 실제 게임 상태만 표시
- Mission Objective는 브리핑 역할
- Timer 삭제
- Progress 삭제
- Log Book 삭제
- Setting 삭제
- 불필요한 메뉴 삭제

---

## 시설 컬러

| 시설 | 메인 컬러 |
|------|----------|
| Nova Coaster | Blue + Violet |
| Luna Light Garden | Green + Mint |
| Spark Energy Tower | Gold + Orange |
| Wonder Parade Hall | Pink + Rose |
| Cosmic Voyage | White + Gold |

---

# Nova Coaster

## 컨셉

우주 채굴 열차

## 미션

- 레일 연결
- 시운전
- 안전 점검

## 플레이

- 레일 퍼즐
- 카운트다운
- 실패 가능

※ 플레이 화면 구성 및 전환 방식 미확정

---

# Luna Light Garden

## 컨셉

야간 정원 복구

## 미션

- 빛의 조각 수집
- 빛의 경로 복구
- 정원 복원

## 플레이

- 탐험
- 힐링
- 실패 없음

※ 플레이 화면 구성 및 전환 방식 미확정

---

# Spark Energy Tower

## 컨셉

에너지 코어 복구

## 미션

- 코어 정렬
- 회로 활성화
- 에너지 빔 발사

## 플레이

- 단계별 진행
- 가장 높은 난이도

※ 플레이 화면 구성 및 전환 방식 미확정

---

# Wonder Parade Hall

## 컨셉

퍼레이드 준비

## 미션

- 위치 기억
- 캐릭터 배치
- 퍼레이드 시작

## 플레이

- 기억 게임
- 감성적 분위기

※ 플레이 화면 구성 및 전환 방식 미확정

---

# STATUS 철학

STATUS는 장식용 수치가 아니다.

실제 게임 상태를 표현한다.

예시

- 빛의 조각
- 에너지 상태
- 복구 진행
- 캐릭터 상태

가짜 퍼센트 사용 금지.

---

# Mission Guide

## 역할

Mission Objective를 반복하는 화면가 아니다.

실제 플레이 방법을 안내하는 게임 튜토리얼이다.

### 구성

- 게임 목표
- 조작 방법
- 이미지 기반 설명
- 성공 조건

※ 시설별 Guide는 아직 미제작

---

# Countdown

## 역할

Mission Guide 이후 플레이 시작을 알리는 공통 시스템

※ 공통 연출 미확정

---

# Pause / Fail / Complete

※ 공통 시스템 설계 예정

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

4개 시설 완료 시

Cosmic Voyage 오픈

---

# Cosmic Voyage

## 역할

노바랜드 시그니처 어트랙션

## 컨셉

미래를 여는 여행

### 키워드

- 미래
- 과거
- 현재
- 우주
- 가능성

※ 플레이 및 외형은 미완료

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

---

# 제작 순서

## Phase 1

- Mission Guide

## Phase 2

- Countdown

## Phase 3

- Play

## Phase 4

- Pause / Fail / Complete

## Phase 5

- Stamp Book

## Phase 6

- Cosmic Voyage

## Phase 7

- Reward / Ending

---

# 현재 진행 상태

## 기획

95%

### 완료

- 컨셉
- 세계관
- IA
- 유저 플로우
- 시설 설정
- STATUS 철학

---

## 디자인

### 완료

- MAP PC
- MAP Mobile
- Control Room PC 4종
- Control Room Mobile 4종

### 미완료

- Mission Guide
- Countdown
- Play
- Pause
- Fail
- Complete
- Stamp Book
- Cosmic Voyage
- Reward / Ending

---

## 개발

0%

---

# 다음 작업

1. Mission Guide 공통 규칙 확정
2. Nova Coaster Mission Guide
3. Luna Light Garden Mission Guide
4. Spark Energy Tower Mission Guide
5. Wonder Parade Hall Mission Guide
6. Countdown 공통 시스템
7. Play 화면 전환 방식
8. Pause / Fail / Complete