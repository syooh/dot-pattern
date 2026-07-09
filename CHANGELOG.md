# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

## v0.1 (2026-06-30)

### 🎉 프로젝트 시작

- Git 프로젝트 초기화
- GitHub Repository 생성
- 첫 Commit 완료

### ✨ 추가 (Added)

#### Backend

- 이미지 색상 압축(K-Means)
- JSON Export 기능
- 색상표 저장
- 픽셀 데이터 저장
- 도안 이미지 생성

#### Frontend

- React 프로젝트 생성
- PatternCanvas 생성
- PatternEngine 생성
- 빈 도안 생성 기능
- 드래그 색칠 기능
- ColorPalette 컴포넌트 생성
- Toolbar 컴포넌트 생성
- NewPatternDialog 생성

### 📌 다음 목표

- 색상 추가
- 지우개
- Undo
- 확대 / 축소

---

## v0.5 (2026-07-03)

### ✨ 추가 (Added)

- 사용자 색상 추가 기능
- 선택한 색상 강조 표시
- 색상 삭제 UI 준비

### 🔨 변경 (Changed)

- usePattern 구조 리팩토링
- PatternCanvas와 PatternEngine 연결 방식 개선
- PatternEditor 구조 개선
- ColorPalette 구조 개선

### ⚡ 개선 (Improved)

- 드래그 시 동일한 칸 반복 색칠 방지
- 컴포넌트 역할 분리

---

## v0.6 (2026-07-06)

### ✨ 추가 (Added)

- Palette 색상 삭제
- Undo History State 추가
- Future State 추가
- saveHistory() 함수 추가

### 🔨 변경 (Changed)

- PatternEngine에 removeColor() 구현
- usePattern 구조 개선
- createPattern() 실행 시 History 초기화

### ♻ 리팩토링 (Refactored)

모든 편집 기능을 아래 구조로 통일

Canvas
↓
saveHistory()
↓
PatternEngine
↓
setPattern()

### 📌 다음 목표

- Undo
- Redo
- Toolbar
- Ctrl + Z



# Changelog

## v0.7 (2026-07-06)

### 추가

- ToolType 타입 추가
- selectedTool 상태 추가
- canUndo / canRedo 상태 추가
- Brush / Eraser Tool 시스템 연결

### 변경

- Undo / Redo 버튼 비활성화 기능 추가
- Tool 선택 구조 적용
- PatternEngine와 Tool 시스템 연결

### 리팩토링

- usePattern 구조 표준화
- import 순서 통일
- State → Computed → Function → Return 구조 적용
- 주석 스타일 통일
- Return 구조 통일

### 다음 버전(v0.8)

- Fill Tool 구현
- Tool 단축키 추가
- Tool UI 개선
- 브러시 크기 기능



# 📄 CHANGELOG

## v0.8.0 (2026-07-09)

### 추가

- react-colorful Color Picker
- AddColorPanel
- Color Preview
- HEX 입력
- RGB 입력
- ColorUtils
- 중복 색상 검사
- 자동 Color 선택

---

### 변경

- Palette UI 개선
- Color 추가 방식 변경
- Color Panel 구조 변경

---

### 수정

- Color Panel 자동 닫힘
- onClose Props 오류 수정