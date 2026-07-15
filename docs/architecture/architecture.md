# 🏗 Architecture

프로젝트의 전체 구조와 데이터 흐름을 정리한 문서입니다.

---

# 📂 프로젝트 구조

```text
PatternEditor
│
├── Toolbar
│
├── PatternCanvas
│
├── ColorPalette
│   │
│   └── AddColorPanel
│       │
│       └── ColorUtils
│
└── usePattern
    │
    └── PatternEngine
```

# Architecture

PatternEditor
│
├── Toolbar
│
└── EditorLayout
    │
    ├── PalettePanel
    │   └── ColorPalette
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

---

# 🔄 데이터 흐름

사용자의 입력은 아래와 같은 순서로 처리됩니다.

```text
사용자
    │
    ▼
PatternEditor
    │
    ▼
PatternCanvas
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
PatternCanvas 렌더링
```

---

# 🛠 Tool 동작 구조

Toolbar에서 선택한 기능은 `usePattern`을 통해 `PatternEngine`으로 전달되고, 변경된 상태가 React State에 반영되어 Canvas가 다시 렌더링됩니다.

```text
Toolbar
    │
    ├── Brush
    ├── Eraser
    ├── Fill
    ├── Color Picker
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
      PatternCanvas
```

---

# 🎨 Color 시스템 구조

Color 관련 기능은 각각의 역할에 맞게 독립적인 모듈로 분리되어 있습니다.

```text
ColorPalette
    │
    ├── Palette UI
    │
    ├── AddColorPanel
    │      │
    │      ├── Color Picker
    │      ├── HEX Input
    │      ├── RGB Input
    │      └── Color Preview
    │
    └── ColorUtils
           │
           ├── HEX ↔ RGB 변환
           ├── 중복 색상 검사
           └── Color 생성
```

---

# 🧩 주요 컴포넌트

## PatternEditor

프로젝트의 최상위 페이지입니다.

역할

- Toolbar 관리
- PatternCanvas 표시
- ColorPalette 표시
- usePattern 연결

---

## Toolbar

도안 편집에 필요한 기능을 제공합니다.

기능

- Brush
- Eraser
- Fill
- Color Picker
- Undo
- Redo

Toolbar에서 선택한 기능은 `usePattern`을 통해 처리됩니다.

---

## PatternCanvas

도안을 실제로 그리는 Canvas입니다.

역할

- 마우스 입력 처리
- 드래그 색칠
- 클릭 이벤트 처리
- PatternData 렌더링

---

## usePattern

프로젝트의 핵심 상태 관리 Hook입니다.

역할

- Pattern 상태 관리
- Tool 상태 관리
- 선택된 Color 관리
- Undo / Redo 관리
- History 저장
- PatternEngine 호출

---

## PatternEngine

실제 편집 로직을 담당합니다.

역할

- Paint
- Fill
- Eraser
- Remove Color
- Pattern 생성
- Pattern 복사

React와 분리되어 있어 재사용이 가능합니다.

---

## ColorPalette

현재 Palette를 표시합니다.

역할

- 색상 선택
- 색상 목록 표시
- AddColorPanel 열기

---

## AddColorPanel

새로운 색상을 추가하는 UI입니다.

기능

- Color Picker
- HEX 입력
- RGB 입력
- Preview
- 색상 추가

---

## ColorUtils

색상 관련 공통 함수입니다.

기능

- HEX ↔ RGB 변환
- 색상 생성
- 중복 색상 검사

---

# ✨ 리팩토링

## Color 시스템

기존에는 `ColorPalette`가 모든 Color 기능을 담당했습니다.

```text
ColorPalette
    ├── Color Picker
    ├── HEX
    ├── RGB
    ├── Preview
    └── Color 생성
```

현재는 기능별로 분리하여 유지보수성을 높였습니다.

```text
ColorPalette
        │
        ├── Palette UI
        ├── AddColorPanel
        └── ColorUtils
```

### 개선 효과

- UI와 로직 분리
- 컴포넌트 역할 명확화
- 유지보수성 향상
- 기능 확장 용이
- 재사용성 증가

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
- ✅ Color 추가
- ✅ HEX 입력
- ✅ RGB 입력
- ✅ Color Preview
- ✅ 중복 색상 검사
- ✅ 자동 색상 선택
- ✅ Palette 색상 삭제

## Canvas

- ✅ 빈 도안 생성
- ✅ 드래그 색칠
- ✅ History 관리
- ✅ PatternData 렌더링

---

# 📌 향후 개발 예정

- 브러시 크기 조절
- Zoom In / Zoom Out
- Grid 표시 옵션
- 단축키 확장
- 선택 영역 기능
- 도안 저장 및 불러오기
- 이미지 Import / Export 기능