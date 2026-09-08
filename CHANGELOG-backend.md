## 2026-09-06

### ✨ Added

#### Django / Backend

* Django REST Framework 기반 API 환경 구축
* Django 테스트 API `/api/hello/` 추가 및 정상 동작 확인
* Django 백엔드를 `8001` 포트에서 실행할 수 있도록 구성
* MySQL Server 9.7.1 설치
* 프로젝트용 MySQL 데이터베이스 `dot_pattern_db` 생성
* Python 가상환경에 `mysqlclient` 설치
* Django에서 MySQL 데이터베이스를 사용할 수 있도록 연결 설정
* Django Migration을 통해 MySQL 연결 정상 동작 확인

#### Database

* `dot_pattern_db` 데이터베이스 생성
* `utf8mb4` 문자셋 및 `utf8mb4_unicode_ci` Collation 적용
* Django 기본 Migration 테이블 생성

### 🔧 Changed

* Django 기본 SQLite 데이터베이스 설정을 MySQL 설정으로 변경
* Windows PATH에 MySQL Server 9.7의 `bin` 경로 추가

### 🧪 Test

* MySQL CLI 실행 확인
* MySQL root 계정 접속 확인
* `dot_pattern_db` 데이터베이스 생성 및 선택 확인
* `python manage.py migrate` 정상 실행 확인
* Django ↔ MySQL 연결 확인

### 📌 Next

* `patterns` Django 앱 생성
* Pattern 모델 구현
* User ↔ Pattern 관계 구현
* PatternData JSON 저장 구현
* JWT 인증 구현
* Pattern CRUD API 구현
* React와 Django API 연동




# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

## 2026-09-07

### ✨ Added

#### Authentication

* Django REST Framework 기반 회원가입 기능 추가
* JWT 기반 로그인 기능 추가
* Access Token / Refresh Token 인증 구조 추가
* 로그인 사용자 정보 조회 기능 추가
* React 인증 상태 관리 기능 추가
* 로그인 / 로그아웃 UI 연동

#### Pattern Server Management

* Django Pattern 모델 추가
* Pattern CRUD API 추가
* 사용자별 Pattern 데이터 관리 기능 추가
* Pattern JSON 데이터를 MySQL에 저장하는 구조 추가
* React에서 서버 Pattern 목록 조회 기능 추가
* 서버 Pattern 저장 / 불러오기 / 삭제 기능 추가

#### Backend

* Django REST Framework 설정
* MySQL 데이터베이스 연결
* Pattern JSON 데이터 저장 구조 추가
* Django ↔ React CORS 설정

---

### 🔧 Changed

#### Frontend

* Production Build 과정에서 발생한 TypeScript 오류 수정
* Canvas 좌표 변환 시 zoom 값 처리 개선
* Pattern / Palette / Image Import / My Patterns / Status 패널 레이아웃 조정
* Edit / View 모드에 따른 하이라이트 이동 동작 개선

#### Editor

* Edit 모드에서는 현재 행 하이라이트의 이전 / 다음 이동 버튼을 비활성화
* View 모드에서는 기존 하이라이트 이동 기능 유지

---

### 🧪 Tested

* React Production Build 성공
* 회원가입 API 테스트
* JWT 로그인 API 테스트
* JWT Token Refresh 테스트
* 인증 사용자 정보 조회 테스트
* Pattern 생성 / 조회 / 수정 / 삭제 테스트
* Pattern JSON 데이터 수정 테스트
* React 로그인 / 회원가입 / 로그아웃 테스트

---

### 📝 Notes

* Anonymous 사용자는 기존 Editor 기능을 계속 사용할 수 있도록 유지
* 서버 Pattern 저장 및 관리 기능은 로그인 사용자만 사용할 수 있도록 구성
* 기존 FastAPI 이미지 → PatternData 기능은 유지
* Django와 FastAPI를 당분간 별도의 Backend로 운영

---

### 🔜 Next

* Editor ↔ Django Pattern 저장 흐름 최종 점검
* 기존 Pattern 수정 저장 로직 개선
* My Patterns UI 개선
* 환경변수 기반 DB / Secret 설정
* 전체 사용자 시나리오 테스트



# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

## 2026-09-08

### 🐛 Fixed

#### Pattern 저장 및 수정

- 동일한 Pattern을 반복 저장할 때 새로운 Pattern이 중복 생성되는 문제 수정
- 저장된 Pattern이 없는 경우 `POST` 요청으로 새로운 Pattern 생성
- 이미 저장된 Pattern이 있는 경우 `PATCH` 요청으로 기존 Pattern 수정
- Pattern 수정 시 기존 서버 Pattern ID를 유지하도록 수정
- 서버에서 Pattern을 불러온 후 다시 저장할 때 기존 Pattern을 수정하도록 개선

#### Pattern 교체 시 색상 상태 오류

- 새로운 Pattern으로 교체할 때 기존 `selectedColor`가 새로운 Palette에 존재하지 않아 발생하던 Runtime Error 수정
- New Pattern 생성 시 선택된 색상 상태 동기화
- JSON Pattern Import 시 선택된 색상 상태 동기화
- Image Import 시 선택된 색상 상태 동기화
- 서버 Pattern Load 시 선택된 색상 상태 동기화
- `replacePattern()`을 추가하여 Pattern 교체 시 선택된 색상을 안전하게 처리

#### StatusBar 오류 방지

- 존재하지 않는 Palette 색상을 참조하면서 발생하던
  `Cannot read properties of undefined (reading 'hex')`
  오류 수정
- 선택된 색상이 존재하지 않을 경우 첫 번째 Palette 색상 또는 기본 색상을 사용하도록 방어 로직 추가

### 🎨 Improved

#### Image Import UI

- 긴 이미지 파일명으로 인해 Image Import 패널의 너비가 늘어나던 문제 개선
- 파일명이 패널의 고정된 영역 안에서 표시되도록 수정
- 긴 파일명은 자동으로 줄바꿈되도록 개선
- 파일명은 최대 2줄까지 표시
- 2줄을 초과하는 파일명은 영역 밖으로 넘치지 않도록 처리

### 🔧 Pattern Server Integration

- React와 Django Pattern API 연동 상태 점검
- Pattern 생성 → 조회 → 수정 → 삭제 전체 흐름 확인
- 서버 Pattern 저장 후 목록에 정상적으로 표시되는지 확인
- 저장된 Pattern을 다시 불러올 수 있는지 확인
- Pattern 수정 후 동일한 Pattern ID가 유지되는지 확인
- Pattern 삭제 기능 정상 동작 확인

### 🧪 Test

- 회원가입 정상 동작 확인
- 로그인 정상 동작 확인
- 로그아웃 정상 동작 확인
- 로그인 상태에서 Pattern 저장 확인
- 저장된 Pattern 불러오기 확인
- Pattern 수정 후 재저장 확인
- Pattern 삭제 확인
- 로그아웃 후 New Pattern 생성 확인
- Image Import 기능 확인
- JSON Pattern Import 기능 확인
- Pattern 교체 후 Canvas 및 StatusBar 정상 표시 확인
- 긴 이미지 파일명 UI 표시 확인

### 📝 Notes

- 현재 `is_public` 값은 Pattern에 저장되지만 다른 사용자가 공개 Pattern을 조회할 수 있는 API는 아직 구현하지 않음
- 추후 공개 Pattern 목록 및 Gallery 기능 구현 예정
- 공개 Pattern API 구현 시 `is_public=True`인 Pattern만 별도로 조회하도록 구성할 예정