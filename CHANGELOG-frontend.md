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




# CHANGELOG

---

## v0.2.0 (2026-07-27)

### ✨ Added

#### Move Tool

- Move Tool 추가
- Toolbar에 Move Tool 버튼 추가
- ToolType에 move 추가
- Selection Drag 기능 구현
- Selection Preview 이동 구현
- 실제 Selection 이동 기능 구현
- Selection offset(offsetX, offsetY) 상태 추가
- Move 완료 이벤트(onMoveSelection) 추가

#### Clipboard

- Paste Preview Layer 추가
- Paste Preview 출력 개선
- Paste Preview와 Selection Layer 분리
- Paste Preview가 마우스를 따라다니도록 수정

#### Engine

- PatternEngine.moveSelection() 추가
- 선택 영역 복사
- 기존 위치 삭제
- 새 위치 붙여넣기
- 새로운 Pattern 반환

#### Hook

- usePattern.moveCurrentSelection() 추가
- History 저장 후 Move 실행

### 🔨 Changed

- CanvasEvents → PatternEditor → usePattern → PatternEngine 이벤트 전달 구조 개선
- Selection Layer가 offset 기반으로 렌더링되도록 수정
- Move Tool Preview 렌더링 개선



# CHANGELOG

---

## v0.2.0 (2026-07-28)

### ✨ Added

#### Editor

* Rotate Selection (90° Clockwise) 기능 추가
* Rotate Toolbar 버튼 추가
* Rotate Engine 구현
* Rotate와 Undo/Redo 연동
* Rotate 후 Selection 자동 갱신
* Selection Offset 초기화
* Rotate UX 개선

### 🔧 Improved

* Selection 처리 구조 개선
* PatternEngine 구조 확장
* Toolbar 기능 확장
* 회전 알고리즘 안정화

### ✅ Tested

* Rotate
* Undo / Redo
* Horizontal Selection
* Vertical Selection
* Rectangle Selection
* Selection 유지



## v0.4.0 (2026-07-28 ~ 2026-08-02)

### ✨ Added

#### Frontend

- Fill Tool 구현
- Selection 복사/붙여넣기
- Selection 삭제
- Selection 이동
- Selection 90도 회전
- Selection 좌우 반전
- Selection 상하 반전
- Toolbar 개선
- Palette 기능 개선
- Image Import UI 추가
- FastAPI 연동
- PNG Export 기능 추가(진행 중)
- Grid Export 기능 추가(진행 중)

#### Backend

- FastAPI API (/generate) 구현
- 이미지 업로드 기능
- K-Means 기반 도트 도안 생성
- PatternData JSON 생성
- 이미지 비율 자동 계산 개선
- Width / Height 예외 처리 추가
- JSON Export 구조 개선

### ♻ Changed

- PatternEditor 구조 개선
- Toolbar 이벤트 구조 개선
- PatternData 구조 정리
- Palette 관리 방식 개선
- Import UI 개선



# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

# v0.2.0 (2026-08-02 ~ 2026-08-05)

## 🎉 주요 업데이트

Dot Pattern Editor의 기본 기능 구현 완료

- 이미지 → 도안 변환
- 도안 편집
- Palette 관리
- JSON 저장 / 불러오기
- PNG 저장
- FastAPI 연동
- React UI 개선

---

# ✨ Added

## Pattern

- PatternData 구조 정의
- 빈 도안 생성 기능
- Pattern 생성 기능
- PatternPanel 컴포넌트 추가
- 좌측 패널에서 도안 생성 가능
- Pattern 초기화(clearPattern) 기능

---

## Image Import

- 이미지 업로드 기능
- Width 지정
- Height 지정
- Color Count 지정
- FastAPI 연동
- React ↔ Backend 통신
- PatternData 자동 생성
- ImportImagePanel 컴포넌트 추가

---

## Drawing Tool

- Brush Tool
- Eraser Tool
- Fill Tool
- Select Tool
- Move Tool

---

## Editing

- Undo
- Redo
- Selection 이동
- Selection 회전
- Selection 좌우 반전
- Selection 상하 반전

---

## Canvas

- Hover Cell 표시
- Grid 표시
- Grid ON/OFF
- Zoom In
- Zoom Out
- Camera 구조 적용
- Canvas Header 추가
- Row Header
- Column Header

---

## Palette

- Palette 출력
- 색상 선택
- 색상 추가
- 색상 삭제
- AddColorPanel 추가
- 자동 색상 선택

---

## Export

- JSON 저장
- JSON 불러오기
- PNG 저장
- PNG 다운로드
- Grid 포함 PNG 저장
- 5칸마다 굵은 Grid 저장

---

## Backend

- FastAPI 구축
- /generate API 구현
- UploadFile 처리
- 이미지 업로드
- Width 전달
- Height 전달
- Color Count 전달
- PatternData 반환
- Pillow 이미지 처리
- K-Means 색상 압축

---

## Layout

- EditorLayout 생성
- Workspace 생성
- CanvasViewport 생성
- CanvasContainer 생성
- LeftPanel 생성
- Toolbar 생성
- StatusBar 생성

---

# 🔨 Changed

## Pattern 생성

- NewPatternDialog 제거
- Pattern 생성 위치 변경
- PatternPanel로 기능 이동
- createPattern 구조 변경
- clearPattern 구조 변경

---

## Left Panel

- Pattern Panel 추가
- Image Import Panel 추가
- Palette Panel 추가
- StatusBar 추가
- Panel 순서 변경

기존

Pattern 생성 Dialog

↓

변경

Pattern Panel
Image Import
Palette
StatusBar

---

## Image Import UI

- PanelCard 제거
- Pattern Panel과 동일한 스타일 적용
- 입력창 스타일 통일
- 버튼 스타일 통일
- 여백 감소
- Panel 크기 축소

---

## Palette UI

- Compact UI 적용
- 여백 감소
- Palette 높이 감소
- Add Button 위치 조정
- Delete Button 개선

---

## Toolbar

- PNG 저장 버튼 추가
- Tool 선택 방식 개선
- Grid 토글 버튼 추가
- Zoom 버튼 추가

---

## PNG Export

- Canvas 저장 방식 개선
- Grid 저장
- 5칸마다 굵은 Grid 저장
- 화면과 동일한 결과 저장

---

## Grid

- 일반 Grid 출력
- 5칸마다 굵은 선 출력
- PNG Export와 동일한 Grid 적용

---

## Workspace

- Layout 구조 검토
- Workspace 구조 개선 시작
- CanvasViewport 리팩터링 준비

---

# ♻ Refactored

## Component

- LeftPanel 분리
- Workspace 분리
- CanvasViewport 분리
- CanvasContainer 분리
- PatternPanel 추가
- ImportImagePanel 분리

---

## Pattern

- Pattern 생성 로직 정리
- Pattern 상태 관리 정리
- Pattern 초기화 로직 정리

---

## Palette

- Palette 구조 개선
- Color 선택 구조 개선
- AddColor 구조 개선

---

## Backend

- API 구조 정리
- PatternData 반환 구조 개선
- Import 로직 정리

---

## Export

- PNG Export 함수 분리
- Toolbar와 Export 연결
- 저장 구조 개선

---

# 🐞 Fixed

## Pattern

- Pattern 생성 오류 수정
- Pattern 상태 초기화 오류 수정

---

## PNG

- exportPatternAsPNG import 오류 수정
- 저장 버튼 연결 오류 수정
- Grid 저장 오류 수정

---

## Image Import

- Import 버튼 스타일 수정
- Panel 중복 출력 수정
- Image Import 중복 Panel 제거

---

## Palette

- Palette 여백 수정
- Panel 높이 수정
- 색상 선택 오류 수정

---

## Layout

- LeftPanel Props 수정
- Pattern Panel 연결 오류 수정
- Workspace 연결 오류 수정

---

# 📄 Documentation

- README 작성
- DEVLOG 작성
- CHANGELOG 작성

---

# 🚧 진행 예정 (v0.3.0)

## UI

- Workspace 전체 리팩터링
- CanvasViewport 구조 개선
- 반응형 UI
- 단축키
- Panel 접기
- 우클릭 메뉴

---

## Backend

- Django 연동
- MySQL 연동
- 사용자 계정
- 프로젝트 저장

---

## Pattern

- DMC 실번호 지원
- Anchor 실번호 지원
- Symbol 자동 생성
- PDF Export
- Print Layout



# CHANGELOG

이 프로젝트의 모든 변경 사항을 기록합니다.

---

## v0.5.0 (2026-08-07 ~ 2026-09-04)

### ✨ Added

#### Frontend

- View Mode 추가
- Edit Mode / View Mode 전환 기능 추가
- View Mode에서 패턴 읽기 전용 기능 추가
- View Mode에서 현재 작업 행(Current Row) 표시 기능 추가
- 현재 행 클릭 이동 기능 추가
- 이전 행 / 다음 행 이동 기능 추가
- 현재 작업 행 진행률 표시 기능 추가
- Canvas 행/열 헤더 추가 및 개선
- 행/열 번호 1-based 표시 방식 적용
- 우측 하단 기준 행/열 번호 방향 개선
- Status Panel에 현재 작업 정보 표시
- 현재 작업 행 및 진행률 Status Panel 표시
- View Mode에서 Canvas 행 클릭을 통한 작업 위치 변경 기능 추가
- View Mode에서 현재 작업 행 테두리 강조 표시 추가
- Palette Add Color Modal 개선
- 색상 추가 기능을 Modal 방식으로 변경
- Color Picker Modal UI 개선
- HEX / RGB 색상 입력 기능 유지 및 개선
- Modal 외부 영역 클릭으로 닫기 기능 추가
- ESC 키를 이용한 Modal 닫기 기능 추가
- Modal 닫기 버튼 추가
- LeftPanel 2열 레이아웃 개선
- PanelCard 공통 UI 컴포넌트 추가
- Pattern Panel UI 개선
- Import Image Panel UI 개선
- Palette Panel UI 개선
- Status Panel UI 개선
- PNG Export Grid 기능 개선

#### Canvas

- Canvas Render Mode 구조 추가
- CanvasRenderer에 Edit / View Mode 처리 추가
- CurrentRowLayer 추가
- View Mode 전용 현재 행 강조 렌더링 추가
- Canvas Mode 변경 시 즉시 렌더링되도록 개선
- Canvas Event 처리에서 View Mode 분기 추가
- View Mode에서 Canvas 편집 이벤트 차단
- View Mode에서 현재 행 선택 이벤트 처리
- View Mode에서 편집 기능이 실행되지 않도록 이벤트 처리 개선
- View Mode에서 Grid 및 Zoom 기능 유지
- Grid 굵은 선 기준을 5칸에서 10칸 단위로 변경
- PNG Export 시 Grid 렌더링 구조 개선

#### Keyboard

- View Mode에서 편집용 단축키 비활성화
- View Mode에서 Brush 단축키 비활성화
- View Mode에서 Eraser 단축키 비활성화
- View Mode에서 Fill 단축키 비활성화
- View Mode에서 Delete 단축키 비활성화
- View Mode에서 Copy / Cut / Paste 단축키 비활성화
- View Mode에서 Undo / Redo 단축키 비활성화
- Edit Mode에서 기존 단축키 동작 유지

#### Documentation

- README 문서 정리
- 프로젝트 Architecture 문서 정리
- ERD 문서 정리
- Flowchart 문서 정리
- Requirements 문서 작성
- Development 문서 작성
- CHANGELOG 문서 정리
- 프로젝트 개발 과정 문서화
- 현재 프로젝트 구조 및 기능 문서화
- Django 연동을 고려한 향후 시스템 구조 문서화

---

### ♻ Changed

#### Frontend

- PatternEditor 상태 관리 구조 개선
- PatternEditor에 Edit / View Mode 상태 추가
- PatternEditor에 Current Row 상태 추가
- PatternEditor와 Workspace 간 상태 전달 구조 개선
- Workspace Props 구조 개선
- CanvasViewport Props 구조 개선
- CanvasContainer Props 구조 개선
- PatternCanvas Props 구조 개선
- StatusBar Props 구조 개선
- Toolbar Props 구조 개선
- Canvas 관련 컴포넌트 간 Mode 전달 구조 개선
- Canvas 관련 컴포넌트 간 Current Row 전달 구조 개선
- Toolbar의 편집 기능 활성화 상태 개선
- View Mode에서 편집 관련 Toolbar 기능 비활성화
- View Mode에서 Undo / Redo 비활성화
- View Mode에서 Rotate / Flip 비활성화
- View Mode에서 편집 Tool 비활성화
- View Mode에서 Grid / Zoom 기능 사용 가능하도록 개선

#### Canvas

- CanvasRenderer 렌더링 순서 개선
- CanvasRenderState에 Mode 정보 추가
- CanvasRenderState에 Current Row 정보 추가
- Canvas 이벤트 처리 구조 개선
- Canvas 렌더링과 편집 로직 분리 강화
- Current Row 렌더링을 View Mode에서만 실행하도록 변경
- Mode 변경 시 Canvas가 즉시 다시 렌더링되도록 수정
- Canvas Grid 렌더링 기준 개선
- PNG Export의 Grid 렌더링 로직을 픽셀 렌더링과 분리
- PNG Export 시 불필요한 Grid 반복 렌더링 제거
- PNG Export의 Grid 렌더링 성능 개선

#### UI

- Panel UI 디자인 통일
- PanelCard를 이용한 공통 Panel 디자인 적용
- Panel 제목 / 구분선 / 여백 구조 통일
- Palette UI 크기 및 배치 개선
- Color Picker 크기 조정
- Add Color Modal 중앙 정렬 방식 개선
- LeftPanel 레이아웃 개선
- StatusBar 정보 표시 구조 개선
- Toolbar Mode 버튼 추가 및 배치 개선

---

### 🐛 Fixed

#### Canvas

- View Mode에서도 Canvas 편집 이벤트가 실행될 수 있던 문제 수정
- View Mode에서 키보드 단축키로 편집 기능이 실행될 수 있던 문제 수정
- Mode 변경 후 Current Row 렌더링이 즉시 반영되지 않던 문제 수정
- Current Row 진행률 계산 시 `NaN%`가 표시되던 문제 수정
- Current Row와 Canvas Row 좌표 변환 문제 수정
- Canvas Row 선택 시 실제 작업 행과 표시 행이 일치하지 않던 문제 수정
- Current Row가 View Mode 진입 시 초기화되지 않던 문제 수정
- View Mode에서 첫 번째 행이 기본 선택되도록 수정

#### UI

- Palette Color Picker 크기 문제 수정
- Add Color Panel의 위치 및 표시 방식 개선
- LeftPanel 내부 Panel 배치 문제 수정
- Toolbar의 Mode 상태 표시 문제 수정

#### Export

- PNG Export에서 Grid가 각 픽셀마다 반복해서 그려지던 문제 수정
- PNG Export 시 Grid가 중복 렌더링되던 문제 수정
- PNG Export Grid 순서 및 렌더링 구조 수정
- PNG Export에서 10칸 단위 굵은 Grid가 정상적으로 표시되도록 수정

---

### 🧹 Refactored

#### Canvas

- CanvasRenderer 레이어 구조 정리
- CurrentRowLayer 분리
- CanvasRenderState 타입 확장
- Canvas Event 처리 로직 정리
- Edit / View Mode별 Canvas 동작 분리
- Canvas 렌더링 책임과 이벤트 처리 책임 분리 강화

#### Component

- PanelCard 공통 컴포넌트 추가 및 Panel UI 통합
- Palette 관련 컴포넌트 구조 정리
- AddColorPanel을 AddColorModal로 변경
- `showPanel` 상태를 `showModal`로 변경
- Workspace → CanvasViewport → CanvasContainer → PatternCanvas Props 전달 구조 정리

#### Documentation

- 기존 프로젝트 문서와 현재 구현 상태 정리
- 실제 프로젝트 구조와 문서 내용 일치하도록 수정
- FastAPI 기반 현재 Backend 구조와 향후 Django 구조 구분
- 향후 Django + DRF + MySQL + JWT 구조를 고려하여 문서 업데이트

---

### 📌 Current Status

#### Editor

- Brush
- Eraser
- Fill
- Select
- Move
- Undo / Redo
- Rotate
- Flip
- Zoom
- Grid
- Pattern 생성
- Image Import
- JSON 저장
- JSON 불러오기
- PNG 저장
- Palette 관리
- Color 추가 / 삭제
- Edit Mode
- View Mode
- Current Row 표시
- Current Row 이동
- Progress 표시

#### Backend

- FastAPI `/generate` API
- 이미지 업로드
- K-Means 기반 색상 양자화
- 도트 패턴 생성
- PatternData JSON 생성
- 이미지 비율 자동 계산
- Width / Height 예외 처리
- JSON Export 구조

#### Documentation

- README
- CHANGELOG
- Architecture
- ERD
- Flowchart
- Requirements
- Development Log

---

### 🚧 On Hold

#### Stitch Pattern

- 뜨개질 기호 변환 기능 검토
- 방안뜨기 변환
- 짧은뜨기 변환
- 긴뜨기 변환
- 한길긴뜨기 변환
- StitchLayer 렌더링
- 두 개의 세로 Pixel을 하나의 Stitch로 시각적 표현하는 방식 검토
- 원본 PatternData를 유지하면서 Stitch만 별도로 표시하는 구조 검토
- 서로 다른 색상의 Pixel을 하나의 Stitch로 병합할 때 색상이 사라지는 문제 검토

> Stitch Pattern 기능은 현재 Editor 안정화 이후 다시 진행할 예정.

---

### 🔜 Next

#### Backend

- Django 프로젝트 구성
- Django REST Framework 연동
- MySQL 연동
- Pattern Model 설계
- Pattern CRUD API 구현
- 사용자별 Pattern 관리
- JWT 로그인 / 인증 구현
- Pattern 소유권 및 권한 처리
- 공개 / 비공개 Pattern 관리

#### Frontend

- Django REST API 연동
- 로그인 / 회원가입 UI
- Pattern 목록 화면
- 사용자별 Pattern 관리
- Pattern 저장 / 불러오기
- View / Edit 권한에 따른 접근 제어

#### Testing

- Pattern 생성 테스트
- Image Import 테스트
- Palette 테스트
- Brush / Eraser / Fill 테스트
- Selection 테스트
- Copy / Cut / Paste 테스트
- Move / Rotate / Flip 테스트
- Undo / Redo 테스트
- Zoom / Grid 테스트
- Edit / View Mode 테스트
- Current Row 테스트
- PNG Export 테스트
- JSON Export / Import 테스트
- Backend API 테스트

#### Deployment

- Backend 배포 환경 구성
- Frontend 배포 환경 구성
- MySQL 운영 환경 구성
- 환경 변수 관리
- CORS 설정
- API 주소 환경별 분리