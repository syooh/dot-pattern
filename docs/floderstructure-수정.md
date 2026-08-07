# 📁 Folder Structure

Dot Pattern Editor 프로젝트의 폴더 구조와 각 디렉터리의 역할을 설명합니다.

---

# 프로젝트 구조

```text
dot_pattern
│
├── backend
│
├── frontend
│
├── docs
│
├── README.md
│
├── CHANGELOG.md
│
└── package.json
```

---

# Backend

```text
backend
│
├── api.py
├── pattern_generator.py
├── color_quantizer.py
├── image_utils.py
├── json_exporter.py
└── ...
```

## api.py

### 역할

- FastAPI 서버
- React와 통신
- 이미지 업로드 처리
- PatternData 반환

---

## pattern_generator.py

### 역할

- 이미지 → 도안 생성
- PatternData 생성

---

## color_quantizer.py

### 역할

- KMeans 색상 압축

---

## image_utils.py

### 역할

- 이미지 Resize
- 이미지 전처리

---

## json_exporter.py

### 역할

- JSON 저장
- PatternData Export

---

# Frontend

```text
frontend
│
├── src
│
├── public
│
├── package.json
│
└── vite.config.ts
```

---

# src

```text
src
│
├── components
├── engine
├── hooks
├── pages
├── types
├── utils
│
├── App.tsx
└── main.tsx
```

---

# pages

```text
pages
│
└── PatternEditor.tsx
```

### 역할

프로젝트의 메인 페이지

모든 컴포넌트를 연결합니다.

---

# components

```text
components
│
├── canvas
├── common
├── import
├── layout
├── palette
├── pattern
├── status
├── toolbar
└── workspace
```

---

# canvas

```text
canvas
│
├── PatternCanvas
├── CanvasContainer
├── CanvasViewport
├── CanvasHeaderTop
├── CanvasHeaderLeft
└── camera
```

### 역할

Canvas 관련 컴포넌트

---

## PatternCanvas

- Canvas 생성
- Mouse Event
- Grid 출력
- Pattern 출력

---

## CanvasContainer

- Header
- Canvas 배치

---

## CanvasViewport

- Viewport 관리
- Zoom 적용

---

## CanvasHeaderTop

상단 번호 출력

---

## CanvasHeaderLeft

좌측 번호 출력

---

# toolbar

```text
toolbar

└── Toolbar
```

### 역할

- Tool 선택
- Undo
- Redo
- Save
- Export
- Zoom
- Grid

---

# workspace

```text
workspace

└── Workspace
```

### 역할

Canvas 작업 영역

---

# layout

```text
layout

├── EditorLayout

└── LeftPanel
```

---

## EditorLayout

전체 Editor 레이아웃

```
LeftPanel

Workspace
```

배치

---

## LeftPanel

좌측 Panel

```
PatternPanel

↓

ImportImagePanel

↓

PalettePanel

↓

StatusBar
```

---

# pattern

```text
pattern

└── PatternPanel
```

### 역할

- Width
- Height
- Create Pattern

---

# import

```text
import

└── ImportImagePanel
```

### 역할

- Image Upload
- Width
- Height
- Color Count
- FastAPI 호출

---

# palette

```text
palette

├── PalettePanel

├── ColorPalette

└── AddColorPanel
```

---

## PalettePanel

Palette Card

---

## ColorPalette

Palette 출력

색상 선택

---

## AddColorPanel

Color Picker

HEX

RGB

Preview

Color 추가

---

# status

```text
status

└── StatusBar
```

### 역할

현재 상태 출력

- Tool
- Size
- Hover
- Grid

---

# common

```text
common

└── PanelCard
```

### 역할

공통 Panel UI

---

# hooks

```text
hooks

├── usePattern

└── useKeyboardShortcuts
```

---

## usePattern

프로젝트 핵심 상태

- Pattern
- History
- Tool
- Palette

---

## useKeyboardShortcuts

단축키

- Ctrl+C
- Ctrl+V
- Undo
- Redo

---

# engine

```text
engine

└── PatternEngine
```

### 역할

Pattern 수정

- Paint
- Fill
- Rotate
- Move
- Flip

---

# types

```text
types
```

### 역할

모든 Type 정의

예)

```
PatternData

PaletteColor

Selection

Clipboard

CameraState
```

---

# utils

```text
utils
```

### 역할

공통 함수

예)

- PNG Export
- JSON
- Color
- Math

---

# docs

```text
docs

├── Architecture.md

├── FlowChart.md

├── ERD.md

├── FolderStructure.md

├── API.md

└── CodingConvention.md
```

프로젝트 문서를 관리합니다.

---

# 향후 구조

```text
backend

├── django

├── api

├── service

├── repository

└── model
```

```text
frontend

├── components

├── pages

├── hooks

├── store

├── engine

├── api

└── utils
```

---

# 폴더 의존성

```text
pages

↓

layout

↓

workspace

↓

canvas

↓

engine

↓

types
```

위 방향으로만 의존하도록 설계합니다.

반대로 참조하지 않습니다.

---

# 설계 원칙

- UI와 로직 분리
- Engine 독립
- Hook 중심 상태 관리
- Type 중앙 관리
- Component 단일 책임
- 공통 UI(common) 재사용
- Backend와 Frontend 분리