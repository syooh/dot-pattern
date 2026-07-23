# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

## v0.1.0 (2026-06-30)

### 🎉 프로젝트 시작

- Git 프로젝트 초기화
- GitHub Repository 생성
- 첫 Commit 완료

### ✨ Added

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

### 📌 Next

- 색상 추가
- 지우개
- Undo
- 확대 / 축소

---

## v0.5.0 (2026-07-03)

### ✨ Added

- 사용자 색상 추가 기능
- 선택한 색상 강조 표시
- 색상 삭제 UI 준비

### 🔨 Changed

- usePattern 구조 리팩토링
- PatternCanvas와 PatternEngine 연결 방식 개선
- PatternEditor 구조 개선
- ColorPalette 구조 개선

### ⚡ Improved

- 드래그 시 동일한 칸 반복 색칠 방지
- 컴포넌트 역할 분리

### 📌 Next

- Palette 색상 삭제
- Undo History
- Redo
- Toolbar 개선

---

## v0.6.0 (2026-07-06)

### ✨ Added

- Palette 색상 삭제
- Undo History State 추가
- Future State 추가
- saveHistory() 함수 추가

### 🔨 Changed

- PatternEngine에 removeColor() 구현
- usePattern 구조 개선
- createPattern() 실행 시 History 초기화

### ♻ Refactored

모든 편집 기능을 아래 구조로 통일

```text
Canvas
   ↓
saveHistory()
   ↓
PatternEngine
   ↓
setPattern()
```

### 📌 Next

- Undo
- Redo
- Toolbar
- Ctrl + Z

---

## v0.7.0 (2026-07-06)

### ✨ Added

- ToolType 타입 추가
- selectedTool 상태 추가
- canUndo 상태 추가
- canRedo 상태 추가
- Brush Tool 추가
- Eraser Tool 추가
- Tool 시스템 연결

### 🔨 Changed

- Undo / Redo 버튼 비활성화 기능 추가
- Tool 선택 구조 적용
- PatternEngine와 Tool 시스템 연결

### ♻ Refactored

- usePattern 구조 표준화
- Import 순서 통일
- State → Computed → Function → Return 구조 적용
- 주석 스타일 통일
- Return 구조 통일

### 📌 Next

- Fill Tool 구현
- Tool 단축키 추가
- Tool UI 개선
- 브러시 크기 기능

---

## v0.8.0 (2026-07-09)

### ✨ Added

- react-colorful Color Picker 추가
- AddColorPanel 컴포넌트 추가
- Color Preview 추가
- HEX 입력 기능
- RGB 입력 기능
- ColorUtils 추가
- 중복 색상 검사
- 자동 Color 선택 기능

### 🔨 Changed

- Palette UI 개선
- Color 추가 방식 변경
- Color Panel 구조 변경

### 🐛 Fixed

- Color Panel 자동 닫힘 문제 수정
- onClose Props 오류 수정

### 📌 Next

- 레이아웃 리팩토링
- Workspace 구성
- Panel 분리

---

## v0.9.0 (2026-07-14)

### ✨ Added

- EditorLayout 컴포넌트 추가
- PalettePanel 컴포넌트 추가
- Workspace 컴포넌트 추가
- CanvasViewport 컴포넌트 추가

### 🔨 Changed

- Palette를 상단에서 좌측 Panel로 이동
- CanvasContainer UI 개선
- 프로젝트 레이아웃 구조 변경
- PatternEditor 구조 단순화
- 전체 화면 기반 레이아웃 적용

### ♻ Refactored

- Editor 역할 분리
- Palette 역할 분리
- Workspace 구조 개선
- Canvas 구조 개선

### 🐛 Fixed

- 컴포넌트 책임 분리
- 레이아웃 구조 개선

### 📌 Next

- Hover Layer
- Camera 구조
- Canvas Renderer 개선

---

## v1.0.0 (2026-07-15)

### 🎉 Major Update

Canvas 렌더링 구조를 Layer 기반으로 개편했습니다.

### ✨ Added

- Hover Layer 추가
- CanvasRenderer Layer 구조 적용

### 🔨 Changed

- Workspace 구조 리팩토링
- CanvasContainer 구조 개선
- RenderState 구조 개선

### 🐛 Fixed

- 첫 클릭이 동작하지 않는 문제 수정
- Hover 좌표 계산 오류 수정
- 클릭 및 드래그 동작 수정

### 📌 Next

- StatusBar
- Camera
- Zoom

---

## v1.1.0 (2026-07-16)

### ✨ Added

- ToolbarButton 컴포넌트 추가
- Toolbar 공통 버튼 구조 생성

### 🔨 Changed

- StatusBar 레이아웃 개선
- StatusBar 디자인 개선
- Toolbar 리팩토링 시작
- Toolbar 그룹 구조 설계

### ♻ Refactored

- Toolbar 버튼 재사용 구조 적용
- Status Panel 구조 개선

### 📌 Next

- ToolbarGroup
- ToolbarDivider
- Zoom
- Camera System

---

## v1.2.0 (2026-07-17)

### ✨ Added

- Grid Toggle 기능
- Hover Cursor 정보 표시
- StatusBar 정보 확장

### 🔨 Changed

- Hover 상태 전달 구조 변경

### 📌 Next

- Camera System
- Zoom

---

## v1.3.0 (2026-07-18)

### ✨ Added

- JSON Open 기능
- CameraState 추가
- useCamera Hook 추가
- getCellSize() 함수 추가

### 🔨 Changed

- Camera 관리 구조 변경
- Zoom 기반 구조 적용
- Header Zoom 대응
- Hover Zoom 대응

### ♻ Refactored

- CELL_SIZE 직접 사용 제거
- Layer Cell Size 계산 방식 통일

### 📌 Next

- Selection Tool
- Delete 기능
- Keyboard Shortcut

---

## v1.4.0 (2026-07-22)

### ✨ Added

- Selection Delete 기능
- fillSelection() 함수 추가
- useKeyboardShortcuts Hook 추가
- ESC / Delete 단축키 지원

### 🔨 Changed

- Zoom 좌표 계산 로직 개선
- pixelToCell()에 Zoom 계산 적용
- Canvas Render Dependency에 selection 추가
- Canvas Event를 Paint / Selection Hook으로 분리
- Selection 렌더링 구조 개선
- TypeScript Null 안전성 강화

### 🐛 Fixed

- 확대 시 Paint 위치가 어긋나는 문제 수정
- Hover와 Paint 좌표 불일치 수정
- Selection 변경 후 Canvas가 갱신되지 않는 문제 수정
- Delete 기능 구현 중 발생한 PatternData | null 타입 오류 해결

### 📌 Next

- Copy / Paste
- Multi Selection
- Export 기능 개선
- 단축키 확장



# CHANGELOG

---

## v0.8.0 (2026-07-23)

### ✨ Added

#### Clipboard

* ClipboardData 타입 추가
* Copy(Ctrl + C) 기능 구현
* Cut(Ctrl + X) 기능 구현
* Delete 기능 구현
* Paste Mode 추가
* Paste Preview Overlay 추가
* Preview 이동 기능 구현
* `pasteClipboard()` 추가
* `paste()` Hook 추가

### 🔧 Changed

* Canvas 클릭 이벤트를 Clipboard Workflow와 연결
* Paste Mode를 Selection Tool보다 우선 처리하도록 이벤트 흐름 개선

### 🐛 Fixed

* Selection Tool 사용 시 Paste가 호출되지 않던 문제 수정
