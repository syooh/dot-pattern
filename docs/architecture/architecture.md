# 🏗 Dot Pattern Editor Architecture

## 1. 전체 구조

현재 프로젝트는 **React Frontend + FastAPI Backend** 구조입니다.

```text
                    Browser
                       │
                       ▼
              React / TypeScript
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
        PatternEditor       patternApi
              │                 │
              ▼                 │ HTTP POST
        EditorLayout            │
        ┌──────┴──────┐         ▼
        │             │     FastAPI
   LeftPanel       Workspace    │
        │             │         ▼
 Pattern/Palette   Canvas     Generator
 Import/Status       │         │
                     ▼         ▼
              CanvasRenderer  Pillow
                     │       K-Means
                     ▼
                 Canvas
```

---

## 2. Frontend 계층

### Page

`PatternEditor`

애플리케이션의 편집 화면을 조합합니다.

담당:

- Pattern 상태 연결
- Edit/View Mode 상태
- 현재 작업 행
- Camera
- Selection
- Clipboard
- Toolbar 이벤트
- Workspace 이벤트
- 저장/불러오기
- 이미지 Import

### Components

화면 UI를 담당합니다.

```text
components/
├── canvas/
├── common/
├── dialog/
├── layout/
├── palette/
├── panel/
├── toolbar/
└── workspace/
```

### Hooks

React 상태 및 사용자 입력을 관리합니다.

```text
hooks/
├── usePattern
└── useCamera
```

Canvas 관련 키보드 입력은:

```text
components/canvas/hooks/useKeyBoardShortcuts.ts
```

에서 처리합니다.

### Engine

`PatternEngine.ts`

도안 데이터를 수정하는 순수 로직 계층입니다.

주요 기능:

- clonePattern
- paintPixel
- erasePixel
- floodFill
- removeColor
- fillSelection
- copySelectionData
- pasteClipboard
- 선택 영역 이동/변환 관련 로직

원칙:

```text
Canvas → PatternEngine
```

Canvas가 직접 PatternData를 수정하지 않습니다.

---

## 3. Canvas Rendering Architecture

```text
PatternCanvas
      │
      ├── useCanvasEvents
      │
      └── renderCanvas()
               │
               ▼
        CanvasRenderer
               │
               ├── Background
               ├── Pixels
               ├── Grid
               ├── Current Row
               ├── Hover
               ├── Selection
               └── Paste Preview
```

`CanvasRenderState`는 Renderer에 필요한 상태를 전달합니다.

핵심 상태:

```text
pattern
camera
mode
currentRow
hoverCell
selection
showGrid
clipboard
pastePreview
```

### Current Row

`mode === "view"`일 때만 `CurrentRowLayer`를 렌더링합니다.

현재 작업 행은:

```text
pattern.height - y
```

방식으로 도안의 아래쪽을 1행으로 취급합니다.

---

## 4. Edit Mode / View Mode

### Edit Mode

```text
Toolbar
 ├── Brush
 ├── Eraser
 ├── Fill
 ├── Select
 ├── Move
 ├── Undo / Redo
 └── Rotate / Flip
```

Canvas 입력:

```text
MouseDown
 → Tool 판별
 → PatternEngine 호출
 → PatternData 변경
 → Canvas 재렌더링
```

### View Mode

```text
Toolbar
 ├── View
 ├── Grid
 └── Zoom
```

Canvas 입력:

```text
MouseDown
 → 클릭한 y 계산
 → currentRow 변경
 → return
```

View Mode에서는:

- 색칠하지 않음
- 삭제하지 않음
- 선택하지 않음
- 이동하지 않음
- Paste하지 않음
- Undo/Redo하지 않음
- 편집 단축키를 실행하지 않음

즉, 버튼을 단순히 disabled 처리하는 것이 아니라 **이벤트/로직 레벨에서도 편집을 차단**합니다.

---

## 5. Backend Architecture

현재 Backend는 FastAPI 기반 이미지 변환 API입니다.

```text
POST /generate
      │
      ▼
UploadFile
      │
      ▼
Pillow Image
      │
      ▼
generate_pattern()
      │
      ├── resize
      ├── K-Means color quantization
      └── pixel pattern generation
      │
      ▼
PatternData JSON
```

Frontend는:

```text
frontend/src/api/patternApi.ts
```

에서 다음 API를 호출합니다.

```text
http://127.0.0.1:8000/generate
```

---

## 6. 향후 Django Architecture

서비스화 단계에서는 FastAPI 이미지 생성 기능과 별개로 Django REST API를 중심으로 사용자/도안 저장 기능을 추가할 계획입니다.

```text
React
  │
  ▼
Django REST Framework
  │
  ├── JWT Authentication
  ├── User
  ├── Pattern CRUD
  └── Permission
  │
  ▼
MySQL
```

권한 예:

```text
Pattern Owner
   └── Edit

Other User
   └── View

Public Pattern
   └── View

Private Pattern
   └── Owner Only
```

---

## 11. 설계 원칙

### 관심사 분리

```text
UI             → Components
State          → Hooks / Page
Pattern Logic  → Engine
Canvas Drawing → Renderer / Layers
API            → api/
Data Model     → types/
Export         → utils/
```

### 원본 데이터 보존

View/표시 방식 때문에 `PatternData` 자체를 변경하지 않습니다.

향후 뜨개/코바늘 기호 표시를 추가하더라도 원본 PatternData와 표시 계층을 분리합니다.


---

## 8. PNG Export Architecture

PNG Export는 화면용 Canvas와 별도의 다운로드용 Canvas를 생성하여 처리합니다.

```text
PatternData
    │
    ▼
exportPatternAsPNG()
    │
    ├── Canvas 생성
    │
    ├── Pixel 전체 렌더링
    │
    ├── 세로 Grid 전체 렌더링
    │
    ├── 가로 Grid 전체 렌더링
    │
    └── canvas.toBlob()
             │
             ▼
          PNG 다운로드
```

### Grid 렌더링 최적화

기존에는 Pixel 반복문 내부에서 전체 Grid를 반복해서 그리는 구조였습니다.

```text
for each pixel
    draw pixel
    draw all vertical grid
    draw all horizontal grid
```

수정 후에는:

```text
draw all pixels
draw all vertical grid
draw all horizontal grid
```

로 변경했습니다.

예를 들어 `40 × 100` 패턴에서는 Pixel이 4,000개이므로 기존 구조에서는 전체 Grid가 Pixel마다 반복될 수 있었지만, 현재 구조에서는 세로/가로 Grid를 각각 한 번만 처리합니다.

이 변경은 **PNG 결과의 디자인을 변경하지 않으면서 불필요한 렌더링을 줄이는 최적화**입니다.

---

## 10. 향후 Django Architecture
