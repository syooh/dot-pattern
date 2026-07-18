# 🏗 Architecture

프로젝트의 전체 구조와 컴포넌트 역할, 데이터 흐름을 정리한 문서입니다.

---

# 📂 프로젝트 구조

```text
PatternEditor
│
├── Toolbar
│   ├── ToolbarButton
│   ├── ToolbarGroup (예정)
│   └── ToolbarDivider (예정)
│
└── EditorLayout
    │
    ├── LeftPanel
    │   ├── PalettePanel
    │   └── StatusBar (예정)
    │
    └── Workspace
        │
        └── CanvasViewport
            │
            └── CanvasContainer
                │
                ├── CanvasHeaderTop
                ├── CanvasHeaderLeft
                └── PatternCanvas
```

---

# 🎨 Canvas Architecture

Canvas는 Layer 기반으로 렌더링됩니다.

## 현재 구조

```text
PatternCanvas
│
└── CanvasRenderer
    │
    ├── BackgroundLayer
    ├── PixelLayer
    ├── GridLayer
    └── HoverLayer
```

## 향후 확장

```text
CanvasRenderer
│
├── BackgroundLayer
├── PixelLayer
├── GridLayer
├── HoverLayer
├── SelectionLayer
├── GuideLayer
└── OverlayLayer
```

---

# 📷 Camera Architecture

Camera는 Zoom과 Pan을 담당하며 PatternEditor에서 상태를 관리합니다.

```text
CameraState
│
├── zoom
├── offsetX
└── offsetY
      │
      ▼
 useCamera()
      │
      ▼
PatternEditor
      │
      ▼
 Workspace
      │
      ▼
CanvasViewport
      │
      ▼
CanvasContainer
      │
      ▼
PatternCanvas
```

### 역할

- Zoom 상태 관리
- Pan 상태 관리
- Viewport 좌표 변환
- Canvas 렌더링 위치 제어

---

# 🔄 Rendering Flow

Canvas가 다시 그려지는 과정입니다.

```text
PatternEditor
      │
      ▼
Workspace
      │
      ▼
PatternCanvas
      │
      ▼
CanvasRenderer
      │
      ▼
BackgroundLayer
      │
      ▼
PixelLayer
      │
      ▼
GridLayer
      │
      ▼
HoverLayer
      │
      ▼
SelectionLayer (예정)
```

---

# 🔄 데이터 흐름

사용자의 입력은 다음 순서로 처리됩니다.

```text
사용자 입력
      │
      ▼
CanvasEvents
      │
      ▼
onPixelClick()
      │
      ▼
usePattern
      │
      ▼
saveHistory()
      │
      ▼
PatternEngine
      │
      ▼
새 PatternData 생성
      │
      ▼
setPattern()
      │
      ▼
React State 업데이트
      │
      ▼
CanvasRenderer
      │
      ▼
Canvas 출력
```

---

# 🛠 Tool 동작 구조

Toolbar에서 선택한 기능은 PatternEngine을 통해 Canvas에 반영됩니다.

```text
Toolbar
│
├── Brush
├── Eraser
├── Fill
├── Undo
└── Redo
      │
      ▼
 usePattern
      │
      ▼
PatternEngine
      │
      ▼
 PatternData
      │
      ▼
 React State
      │
      ▼
CanvasRenderer
```

---

# 🎨 Color System

Color 기능은 각각의 역할에 맞게 분리되어 있습니다.

```text
PalettePanel
│
├── ColorPalette
│
├── AddColorPanel
│   ├── Color Picker
│   ├── HEX Input
│   ├── RGB Input
│   └── Color Preview
│
└── ColorUtils
    ├── HEX ↔ RGB 변환
    ├── RGB ↔ HEX 변환
    ├── 중복 색상 검사
    └── Color 생성
```

---

# 🧩 주요 컴포넌트

## PatternEditor

프로젝트의 최상위 페이지입니다.

### 역할

- Toolbar 관리
- EditorLayout 관리
- usePattern 연결
- Camera 상태 관리

---

## EditorLayout

Editor의 전체 레이아웃을 담당합니다.

### 역할

- LeftPanel 배치
- Workspace 배치

---

## LeftPanel

좌측 UI 영역입니다.

### 역할

- PalettePanel 출력
- StatusBar 출력(예정)

---

## Workspace

Canvas 작업 공간입니다.

### 역할

- CanvasViewport 관리
- Camera 기능 연결

---

## CanvasViewport

Canvas가 표시되는 Viewport입니다.

### 역할

- Zoom
- Pan
- Viewport 관리

---

## CanvasContainer

Canvas와 Header를 하나의 영역으로 관리합니다.

### 역할

- CanvasHeaderTop 출력
- CanvasHeaderLeft 출력
- PatternCanvas 출력

---

## PatternCanvas

Canvas를 관리하는 핵심 컴포넌트입니다.

### 역할

- Canvas 생성
- CanvasRenderer 호출
- CanvasEvents 연결
- Camera 적용
- Canvas 다시 그리기

---

## CanvasRenderer

Canvas Layer를 순서대로 렌더링합니다.

### 현재 Layer

- BackgroundLayer
- PixelLayer
- GridLayer
- HoverLayer

### 예정 Layer

- SelectionLayer
- GuideLayer
- OverlayLayer

---

## CanvasEvents

Canvas의 사용자 입력을 처리합니다.

### 역할

- Mouse Down
- Mouse Move
- Mouse Up
- Drag
- Hover Cell 계산

---

## usePattern

프로젝트의 핵심 상태 관리 Hook입니다.

### 역할

- Pattern 상태 관리
- Tool 상태 관리
- 선택 Color 관리
- Undo / Redo 관리
- History 저장
- PatternEngine 호출

---

## PatternEngine

실제 도안 수정 로직을 담당합니다.

### 역할

- Paint
- Fill
- Eraser
- Remove Color
- Pattern 생성
- Pattern 복사

React와 분리되어 있어 재사용이 가능합니다.

---

## PalettePanel

Palette UI를 관리합니다.

### 역할

- ColorPalette 출력
- AddColorPanel 연결

---

## ColorPalette

현재 Palette를 표시합니다.

### 역할

- 색상 선택
- Palette 출력

---

## AddColorPanel

새로운 색상을 추가하는 UI입니다.

### 기능

- Color Picker
- HEX 입력
- RGB 입력
- Preview
- 색상 추가

---

## ColorUtils

색상 관련 공통 함수입니다.

### 기능

- HEX ↔ RGB 변환
- RGB ↔ HEX 변환
- 중복 색상 검사
- Color 생성

---

# ✨ 최근 리팩토링

## Editor 구조 개선

기존

```text
PatternEditor
├── Toolbar
├── Palette
└── Canvas
```

↓

현재

```text
PatternEditor
├── Toolbar
└── EditorLayout
    ├── LeftPanel
    └── Workspace
```

---

## Canvas 구조 개선

기존

```text
PatternCanvas
└── CanvasDrawer
```

↓

현재

```text
PatternCanvas
├── CanvasRenderer
└── CanvasEvents
```

---

## Render 구조 개선

기존

```text
CanvasDrawer
```

↓

현재

```text
CanvasRenderer
├── BackgroundLayer
├── PixelLayer
├── GridLayer
└── HoverLayer
```

---

# 🚀 현재 구현 기능

## Drawing

- ✅ Brush
- ✅ Eraser
- ✅ Fill

## History

- ✅ Undo
- ✅ Redo

## Color

- ✅ Color Picker
- ✅ HEX 입력
- ✅ RGB 입력
- ✅ Color Preview
- ✅ 중복 색상 검사
- ✅ Color 추가
- ✅ Color 삭제
- ✅ 자동 선택

## Canvas

- ✅ 빈 도안 생성
- ✅ 클릭 색칠
- ✅ 드래그 색칠
- ✅ Hover 표시
- ✅ Grid 출력
- ✅ Header 출력
- ✅ Layer 기반 Render

---

# 📌 향후 개발 예정

## Canvas

- Header Highlight
- StatusBar
- Selection Tool
- Selection Layer
- Zoom
- Pan
- Camera System

## Drawing

- Brush Size
- Line Tool
- Rectangle Tool

## File

- Import
- Export
- JSON 저장
- 이미지 저장

## View

- Grid 표시 옵션
- Grid 색상 변경
- 단축키 확장