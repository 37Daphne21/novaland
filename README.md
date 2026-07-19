# Nova Land

> 멈춰버린 노바랜드를 다시 움직이는 마지막 Explorer가 되어주세요.

Nova Land는 테마파크를 하나의 살아 있는 브랜드 세계로 표현하는 인터랙티브 포트폴리오 프로젝트입니다.

사용자는 Explorer가 되어 서로 다른 역할을 가진 네 개의 시설을 복구하고, 모든 시설의 에너지가 연결되는 마지막 경험 **COSMIC VOYAGE**에 도달합니다.

---

## Project Overview

- 프로젝트명: Nova Land
- 타입: Playful Brand Experience Portfolio
- 형태: Interactive Event Website
- 플랫폼: PC / Mobile
- 장르: Theme Park Experience
- 핵심 경험: 탐험, 복구, 변화와 연결

---

## Story

노바랜드의 움직임이 멈추고 주요 시설의 운영이 중단되었습니다.

Explorer는 EVE의 안내를 받아 시설을 점검하고 Mission을 완료합니다. 시설이 하나씩 복구될수록 조명과 환경, MAP의 상태가 변화하며 노바랜드가 다시 살아납니다.

네 개의 시설이 모두 복구되면 **COSMIC VOYAGE**가 개방되고 Explorer의 마지막 여정이 시작됩니다.

---

## Core Experience

- MAP을 중심으로 시설 선택과 진행 상태 확인
- 시설별 Control Room에서 상태와 Mission 목표 확인
- Mission Guide, Countdown, Play, Pause, Fail과 Complete로 이어지는 공통 Flow
- 시설별로 다른 인터랙티브 Mission
- 시설 복구 결과가 MAP과 Recent Log에 즉시 반영
- Explorer Log와 Explorer Passport에 여정 기록
- Day, Sunset과 Night에 따른 분위기 변화
- 한국어와 영어 UI 전환

---

## Facilities

### NOVA COASTER

Movement Facility

끊어진 레일을 연결하고 시스템을 점검한 뒤 열차의 안전 운행을 복구합니다.

- 필수 레일 연결
- 시스템 점검
- 열차 운행 테스트


### LUNA LIGHT GARDEN

Life Facility

빛 조각과 Prism을 이용해 빛의 경로를 연결하고 정원의 중앙 Lotus를 개화시킵니다.

- Light Fragment 수집
- Prism 활성화와 회전
- 빛의 경로 연결
- 정원 활성화


### SPARK ENERGY TOWER

Energy Facility

Core의 모양, 색상과 위치를 기억해 올바른 Slot에 배치하고 타워의 에너지를 충전합니다.

- Core 정보 기억
- Core Drag와 Slot 배치
- Charge 100% 달성


### WONDER PARADE HALL

Joy Facility

Parade Character의 위치와 행진 순서를 복원해 무대를 활성화하고 Parade를 다시 시작합니다.

- Character 확인
- 위치와 행진 순서 기억
- Character 배치
- Parade 시작


### COSMIC VOYAGE

Harmony Experience

Movement, Life, Energy와 Joy가 하나로 연결되어 완성되는 Nova Land의 마지막 경험입니다.

- 네 개 시설 완료 후 개방
- 시설 에너지 연결
- Explorer Certification
- Ending 연결

---

## Main Systems

### Explorer

- Explorer 이름 등록과 변경
- 프로필 표시
- 진행 상태 저장
- Explorer Log
- Explorer Passport


### EVE

- 시설 안내
- Mission 브리핑
- 상태 전달
- Explorer 보조
- 시설별 동일 인물과 다른 Hologram 컬러 사용


### Setting

- 한국어와 영어 전환
- BGM과 효과음 조절
- Day, Sunset과 Night 변경
- 처음부터 다시 시작


### Save Data

- Explorer 정보
- 시설 잠금과 완료 상태
- Mission 진행 상태
- 언어, 시간과 사운드 설정
- Recent Log

---

## User Flow

```text
Intro

→

Explorer Registration

→

MAP

→

Control Room

→

Mission Guide

→

Countdown

→

Play

→

Pause / Fail / Complete

→

Explorer Log / Explorer Passport

→

MAP

→

COSMIC VOYAGE

→

Explorer Certification

→

Ending
```

---

## Implementation Direction

- 배경과 UI를 분리하여 관리
- 배경, EVE와 프로필만 독립 이미지 자산으로 사용
- Panel, Card, Button, Text, Border와 Glow는 HTML/CSS로 구현
- 아이콘은 SVG Sprite로 관리
- 시설별 UI는 공통 컴포넌트와 Modifier로 확장
- PC 구조를 기준으로 Mobile과 Tablet 반응형 구현
- 완성된 화면 PNG는 비주얼 참고용으로만 사용

---

## Tech Stack

- HTML
- CSS
- JavaScript ES Module
- LocalStorage
- Web Audio API

필요한 Motion에 한해 GSAP 도입을 검토합니다.

---

## Development Status

- 기획: 완료
- 정적 시안 제작: 종료
- 구현 자산 목록 정리: 완료
- MAP 필수 자산 제작: 완료
- 프로젝트 기반과 공통 UI: 완료
- MAP PC 화면과 시설 선택 인터랙션: 완료
- 현재 단계: 공통 시스템
- 개발: 진행 중

```text
MAP PC 구현

→

공통 시스템

→

Control Room과 시설별 Mission

→

COSMIC VOYAGE와 Ending

→

반응형과 최종 QA
```

---

## Goals

- 게임보다 브랜드 경험을 우선하는 인터랙션
- 시설 복구와 세계의 변화를 연결하는 UX
- PC와 Mobile에서 이어지는 일관된 경험
- 실제 구현과 유지보수가 가능한 UI 구조
- 포트폴리오와 이벤트 페이지 수준을 함께 만족하는 완성도

---

## Documents

- [Master Project Document](./project.md)
- [Production Roadmap](./roadmap.md)

---

## Created By

ING

Web Publisher
