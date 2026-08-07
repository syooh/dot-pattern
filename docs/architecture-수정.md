# 🏗 Architecture

> Dot Pattern Editor의 전체 구조와 데이터 흐름을 설명하는 문서입니다.

---

# 1. 프로젝트 개요

Dot Pattern Editor는 이미지를 십자수(도트) 도안으로 변환하고,
사용자가 직접 수정, 저장, 출력할 수 있는 웹 기반 도안 편집기입니다.

프로젝트는 **Frontend(React)** 와 **Backend(FastAPI)** 로 분리되어 있으며,
Frontend는 사용자 편집 기능을 담당하고,
Backend는 이미지 분석 및 Pattern 생성 기능을 담당합니다.

---

# 2. 전체 시스템 구조

```text
                     Dot Pattern Editor

                ┌──────────────────────────────┐
                │          Frontend            │
                │     React + TypeScript       │
                └──────────────┬───────────────┘
                               │
                      PatternData(JSON)
                               │
                               ▼
                ┌──────────────────────────────┐
                │          Backend             │
                │           FastAPI            │
                └──────────────┬───────────────┘
                               │
                               ▼
                    Image Processing Engine
                               │
             ┌─────────────────┴──────────────────┐
             │                                    │
             ▼                                    ▼
      Pillow(Image)                    KMeans Quantizer
             │                                    │
             └─────────────────┬──────────────────┘
                               ▼
                      Pattern Generator
                               │
                               ▼
                       PatternData(JSON)
```

---

# 3. Frontend Architecture

Frontend는 크게

- Editor
- Canvas
- Palette
- Toolbar
- Pattern
- Import

6개의 영역으로 구성됩니다.

```text
PatternEditor
│
├──────── Toolbar
│
├──────── EditorLayout
│         │
│         ├──────── LeftPanel
│         │         │
│         │         ├── PatternPanel
│         │         ├── ImportImagePanel
│         │         ├── PalettePanel
│         │         └── StatusBar
│         │
│         └──────── Workspace
│                   │
│                   ▼
│             CanvasViewport
│                   │
│                   ▼
│             CanvasContainer
│                   │
│        ┌──────────┴───────────┐
│        ▼                      ▼
│ CanvasHeaderTop       CanvasHeaderLeft
│
└────────────── PatternCanvas
```

---

# 4. Backend Architecture

Backend는 이미지 분석만 담당합니다.

```text
Image

↓

FastAPI

↓

Pillow

↓

Resize

↓

KMeans Color Quantizer

↓

Pattern Generator

↓

PatternData(JSON)

↓

React
```

---

# 5. 프로젝트 디렉터리 구조

```text
dot_pattern

├── backend
│   │
│   ├── api.py
│   ├── pattern_generator.py
│   ├── color_quantizer.py
│   ├── image_utils.py
│   ├── json_exporter.py
│   └── ...
│
├── frontend
│   │
│   ├── components
│   │
│   │   ├── canvas
│   │   │      PatternCanvas
│   │   │      CanvasContainer
│   │   │      CanvasViewport
│   │   │      CanvasHeaderTop
│   │   │      CanvasHeaderLeft
│   │   │
│   │   ├── toolbar
│   │   │      Toolbar
│   │   │
│   │   ├── workspace
│   │   │      Workspace
│   │   │
│   │   ├── layout
│   │   │      EditorLayout
│   │   │      LeftPanel
│   │   │
│   │   ├── palette
│   │   │      PalettePanel
│   │   │      ColorPalette
│   │   │      AddColorPanel
│   │   │
│   │   ├── pattern
│   │   │      PatternPanel
│   │   │
│   │   ├── import
│   │   │      ImportImagePanel
│   │   │
│   │   └── common
│   │
│   ├── hooks
│   │      usePattern
│   │      useKeyboardShortcuts
│   │
│   ├── engine
│   │      PatternEngine
│   │
│   ├── pages
│   │      PatternEditor
│   │
│   └── utils
│
└── docs
```

---

# 6. 프로젝트 계층 구조

```text
PatternEditor

│

├──────── UI

│

├──────── Hooks

│

├──────── Engine

│

├──────── React State

│

└──────── Canvas Rendering
```

각 계층은 독립적으로 동작하도록 설계되어 있습니다.

---

# 7. Component Architecture

프로젝트는 각 기능을 하나의 컴포넌트로 분리하여 관리합니다.

```text
PatternEditor
│
├── Toolbar
│
├── EditorLayout
│     │
│     ├── LeftPanel
│     │      │
│     │      ├── PatternPanel
│     │      ├── ImportImagePanel
│     │      ├── PalettePanel
│     │      └── StatusBar
│     │
│     └── Workspace
│             │
│             ▼
│      CanvasViewport
│             │
│             ▼
│      CanvasContainer
│             │
│      ┌──────┴────────┐
│      ▼               ▼
│ CanvasHeaderTop   CanvasHeaderLeft
│
└──────── PatternCanvas
```

---

# 8. Hook Architecture

프로젝트의 상태 관리는 React Hook을 중심으로 이루어집니다.

```text
PatternEditor
│
├──────── usePattern
│
├──────── useKeyboardShortcuts
│
└──────── CameraState
```

---

## usePattern

프로젝트의 핵심 상태를 관리합니다.

```text
Pattern

Palette

History

Future

Selection

Clipboard

Tool

Selected Color
```

### 주요 함수

```text
createPattern()

clearPattern()

setPattern()

paintPixel()

fill()

erase()

addColor()

removeColor()

undo()

redo()

copySelection()

cutSelection()

pasteSelection()

moveSelection()

rotateSelection()

flipHorizontal()

flipVertical()
```

---

## useKeyboardShortcuts

키보드 입력을 처리합니다.

```text
ESC

Delete

Ctrl + C

Ctrl + X

Ctrl + V

Ctrl + Z

Ctrl + Shift + Z
```

Toolbar와 동일한 기능을 단축키로 실행합니다.

---

# 9. Engine Architecture

실제 도안을 수정하는 로직은 PatternEngine이 담당합니다.

React와 분리되어 있기 때문에
UI와 관계없이 재사용할 수 있습니다.

```text
PatternEngine

│

├── clonePattern()

├── paintPixel()

├── erasePixel()

├── floodFill()

├── moveSelection()

├── rotateSelection()

├── flipHorizontal()

├── flipVertical()

├── copySelection()

├── cutSelection()

└── pasteSelection()
```

---

# 10. Canvas Architecture

Canvas는 여러 개의 컴포넌트로 분리되어 있습니다.

```text
Workspace

↓

CanvasViewport

↓

CanvasContainer

↓

PatternCanvas
```

Canvas 자체는

- 이벤트 처리

- 렌더링

을 담당합니다.

---

## CanvasContainer

Canvas와 Header를 하나의 영역으로 관리합니다.

```text
CanvasContainer

│

├── CanvasHeaderTop

├── CanvasHeaderLeft

└── PatternCanvas
```

---

## PatternCanvas

실제 Canvas를 그리는 컴포넌트입니다.

### 역할

- Canvas 생성

- Mouse Event 처리

- Hover 처리

- Grid 출력

- Zoom 적용

- Pattern 출력

---

## CanvasHeaderTop

상단 번호(Header)를 출력합니다.

```
 1 2 3 4 5 ...
```

---

## CanvasHeaderLeft

좌측 번호(Header)를 출력합니다.

```
1

2

3

4
```

---

# 11. Pattern 생성 구조

Pattern 생성은 PatternPanel에서 수행됩니다.

```text
PatternPanel

↓

Width 입력

↓

Height 입력

↓

Create Button

↓

createPattern()

↓

createEmptyPattern()

↓

PatternData 생성

↓

setPattern()

↓

Canvas 출력
```

---

# 12. Image Import 구조

```text
ImportImagePanel

↓

Choose Image

↓

Width

↓

Height

↓

Colors

↓

Generate Pattern

↓

FastAPI

↓

Image Upload

↓

Pillow

↓

Resize

↓

KMeans

↓

Pattern Generator

↓

PatternData

↓

React

↓

Canvas
```

---

# 13. Color System

색상은 Palette를 기준으로 관리됩니다.

```text
PalettePanel

│

├── ColorPalette

│

└── AddColorPanel
```

---

## AddColorPanel

기능

```
Color Picker

↓

HEX 입력

↓

RGB 입력

↓

Preview

↓

중복 검사

↓

Palette 추가
```

---

## ColorPalette

기능

```
Palette 출력

↓

색상 선택

↓

현재 선택 표시

↓

삭제
```

---

# 14. Pattern Data Flow

도안 데이터는 `PatternData`를 중심으로 관리됩니다.

```text
사용자 입력

        │

        ▼

Toolbar / Canvas / PatternPanel

        │

        ▼

usePattern()

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

React State Update

        │

        ▼

PatternCanvas

        │

        ▼

Canvas 다시 그리기
```

---

# 15. Canvas Rendering Flow

Canvas는 PatternData가 변경될 때마다 다시 렌더링됩니다.

```text
PatternData 변경

↓

PatternCanvas

↓

Canvas Context 생성

↓

Grid 출력

↓

Pixel 출력

↓

Selection 출력

↓

Hover 출력

↓

Canvas 화면 갱신
```

---

## 현재 Rendering 순서

```text
Background

↓

Pixel

↓

Grid

↓

Selection

↓

Paste Preview

↓

Hover
```

---

## 향후 Rendering 구조

```text
BackgroundLayer

↓

PixelLayer

↓

GridLayer

↓

GuideLayer

↓

SelectionLayer

↓

PastePreviewLayer

↓

OverlayLayer
```

Layer를 분리하면 유지보수와 성능이 향상됩니다.

---

# 16. PNG Export Flow

PNG 저장 과정입니다.

```text
Toolbar

↓

Export PNG

↓

exportPatternAsPNG()

↓

Canvas 생성

↓

Background 출력

↓

Pixel 출력

↓

Grid 출력

↓

5칸 Grid 출력

↓

PNG Blob 생성

↓

Download
```

현재 저장되는 PNG는

- Grid 포함
- 5칸마다 굵은 Grid 포함
- 화면과 동일한 도안

을 출력합니다.

---

# 17. JSON Save Flow

```text
Toolbar

↓

Save

↓

PatternData

↓

JSON.stringify()

↓

Download
```

저장되는 데이터

```text
PatternData

├── width

├── height

├── palette[]

└── pixels[][]
```

---

# 18. JSON Load Flow

```text
Toolbar

↓

Open

↓

JSON File

↓

PatternData

↓

setPattern()

↓

Canvas Update
```

---

# 19. Camera Architecture

Camera는 Canvas 확대/축소를 담당합니다.

```text
CameraState

│

├── zoom

├── offsetX

└── offsetY
```

현재는 Zoom 기능이 적용되어 있으며

향후

- Pan
- 마우스 휠 확대
- 가운데 기준 확대

등이 추가될 예정입니다.

---

# 20. Selection Architecture

Selection은 독립적으로 관리됩니다.

```text
Selection

│

├── start

├── end

├── width

├── height

└── pixels
```

Selection은

- Move
- Rotate
- Flip
- Copy
- Cut
- Paste

에서 공통으로 사용됩니다.

---

# 21. Clipboard Architecture

복사/붙여넣기를 위한 구조입니다.

```text
ClipboardData

│

├── width

├── height

└── pixels
```

동작 순서

```text
Ctrl + C

↓

Clipboard 저장

↓

Ctrl + V

↓

Paste Preview

↓

Click

↓

PatternData 반영
```

---

# 22. 현재 구현 기능

## Pattern

- ✅ 빈 도안 생성
- ✅ PatternPanel
- ✅ Pattern 초기화

---

## Import

- ✅ 이미지 업로드
- ✅ Width 지정
- ✅ Height 지정
- ✅ Color Count 지정
- ✅ FastAPI 연동

---

## Drawing

- ✅ Brush
- ✅ Eraser
- ✅ Fill

---

## Editing

- ✅ Select
- ✅ Move
- ✅ Rotate
- ✅ Flip Horizontal
- ✅ Flip Vertical

---

## History

- ✅ Undo
- ✅ Redo

---

## Palette

- ✅ Color 선택
- ✅ Color 추가
- ✅ Color 삭제
- ✅ Color Picker
- ✅ HEX 입력
- ✅ RGB 입력

---

## Canvas

- ✅ Hover
- ✅ Grid
- ✅ 5칸 Grid
- ✅ Zoom
- ✅ Header

---

## File

- ✅ JSON 저장
- ✅ JSON 불러오기
- ✅ PNG 저장
- ✅ Grid 포함 PNG 저장

---

# 23. 향후 개발 계획

## UI

- Workspace 리팩터링
- 반응형 레이아웃
- Panel 접기
- 다크모드
- MiniMap

---

## Canvas

- Pan 기능
- Layer 완전 분리
- Virtual Rendering
- 성능 최적화

---

## Pattern

- DMC 실번호
- Anchor 실번호
- Symbol 자동 생성
- PDF Export
- Print Layout

---

## Backend

- Django 연동
- MySQL 연동
- 사용자 계정
- 프로젝트 저장
- 클라우드 저장

---

# 24. Architecture 요약

```text
Frontend (React)

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

Canvas

        │

        ▼

JSON / PNG

──────────────────────────────

Image

↓

FastAPI

↓

Pillow

↓

KMeans

↓

Pattern Generator

↓

PatternData

↓

React
```

---

본 문서는 현재(v0.2.x) 프로젝트 구조를 기준으로 작성되었으며,
향후 UI 리팩터링 및 Django/MySQL 연동 시 함께 업데이트됩니다.