# 🏗 Dot Pattern Editor Architecture

## 1. 전체 구조

현재 프로젝트는 **React Frontend + FastAPI + Django REST Framework +
MySQL** 구조입니다.

``` text
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

------------------------------------------------------------------------

## 2. Frontend 계층

### Page

`PatternEditor`

애플리케이션의 편집 화면을 조합합니다.

담당:

-   Pattern 상태 연결
-   Edit/View Mode 상태
-   현재 작업 행
-   Camera
-   Selection
-   Clipboard
-   Toolbar 이벤트
-   Workspace 이벤트
-   저장/불러오기
-   이미지 Import

### Components

화면 UI를 담당합니다.

``` text
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

``` text
hooks/
├── usePattern
└── useCamera
```

Canvas 관련 키보드 입력은:

``` text
components/canvas/hooks/useKeyBoardShortcuts.ts
```

에서 처리합니다.

### Engine

`PatternEngine.ts`

도안 데이터를 수정하는 순수 로직 계층입니다.

주요 기능:

-   clonePattern
-   paintPixel
-   erasePixel
-   floodFill
-   removeColor
-   fillSelection
-   copySelectionData
-   pasteClipboard
-   선택 영역 이동/변환 관련 로직

원칙:

``` text
Canvas → PatternEngine
```

Canvas가 직접 PatternData를 수정하지 않습니다.

------------------------------------------------------------------------

## 3. Canvas Rendering Architecture

``` text
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

``` text
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

``` text
pattern.height - y
```

방식으로 도안의 아래쪽을 1행으로 취급합니다.

------------------------------------------------------------------------

## 4. Edit Mode / View Mode

### Edit Mode

``` text
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

``` text
MouseDown
 → Tool 판별
 → PatternEngine 호출
 → PatternData 변경
 → Canvas 재렌더링
```

### View Mode

``` text
Toolbar
 ├── View
 ├── Grid
 └── Zoom
```

Canvas 입력:

``` text
MouseDown
 → 클릭한 y 계산
 → currentRow 변경
 → return
```

View Mode에서는:

-   색칠하지 않음
-   삭제하지 않음
-   선택하지 않음
-   이동하지 않음
-   Paste하지 않음
-   Undo/Redo하지 않음
-   편집 단축키를 실행하지 않음

즉, 버튼을 단순히 disabled 처리하는 것이 아니라 **이벤트/로직 레벨에서도
편집을 차단**합니다.

------------------------------------------------------------------------

## 5. Backend Architecture

현재 Backend는 **FastAPI와 Django REST Framework로 역할을 분리**합니다.

``` text
Backend
├── FastAPI
│   └── Image → PatternData
│
└── Django
    ├── JWT Authentication
    ├── Pattern CRUD
    ├── Public Pattern
    ├── Permission
    └── Validation
            │
            ▼
          MySQL
```

### FastAPI

FastAPI는 기존 이미지 → PatternData 변환 기능을 담당합니다.

``` text
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

``` text
frontend/src/api/patternApi.ts
```

에서 다음 API를 호출합니다.

``` text
http://127.0.0.1:8000/generate
```

------------------------------------------------------------------------

## 6. Django REST Framework Architecture

Django는 사용자 인증과 Pattern 저장/관리를 담당합니다.

``` text
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

``` text
Pattern Owner
   └── Edit

Other User
   └── View

Public Pattern
   └── View

Private Pattern
   └── Owner Only
```

------------------------------------------------------------------------

## 11. 설계 원칙

### 관심사 분리

``` text
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

향후 뜨개/코바늘 기호 표시를 추가하더라도 원본 PatternData와 표시 계층을
분리합니다.

------------------------------------------------------------------------

## 8. PNG Export Architecture

PNG Export는 화면용 Canvas와 별도의 다운로드용 Canvas를 생성하여
처리합니다.

``` text
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

``` text
for each pixel
    draw pixel
    draw all vertical grid
    draw all horizontal grid
```

수정 후에는:

``` text
draw all pixels
draw all vertical grid
draw all horizontal grid
```

로 변경했습니다.

예를 들어 `40 × 100` 패턴에서는 Pixel이 4,000개이므로 기존 구조에서는
전체 Grid가 Pixel마다 반복될 수 있었지만, 현재 구조에서는 세로/가로
Grid를 각각 한 번만 처리합니다.

이 변경은 **PNG 결과의 디자인을 변경하지 않으면서 불필요한 렌더링을
줄이는 최적화**입니다.

------------------------------------------------------------------------

## 10. 향후 Django Architecture

------------------------------------------------------------------------

## 14. Pattern 저장 및 권한

``` text
Pattern Editor
      │
      ▼
savedPatternId 확인
      │
      ├── 없음 → POST → Pattern 생성
      └── 있음 → PATCH → 기존 Pattern 수정
      │
      ▼
Django REST API
      │
      ▼
MySQL
```

-   로그인 사용자는 자신의 Pattern을 생성/조회/수정/삭제할 수 있습니다.
-   Public Pattern은 다른 사용자가 조회할 수 있습니다.
-   다른 사용자의 Pattern 수정/삭제는 차단합니다.
-   Serializer에서 width, height, pixels 크기와 pattern_data 구조를
    검증합니다.
-   Public Pattern 목록은 저장 후 프론트엔드 상태를 갱신하여 새로 고침
    없이 반영합니다.

## 15. 테스트

Django Pattern API 자동 테스트 **18개 전체 통과** 상태입니다.

``` text
Found 18 test(s).
..................
----------------------------------------------------------------------
Ran 18 tests

OK
```


---

# 🏗 Dot Pattern Editor Backend Architecture

## 1. Backend 전체 구조

``` text
Backend
├── FastAPI
│   └── Image → PatternData
│
└── Django
    ├── JWT Authentication
    ├── Pattern CRUD
    ├── Public Pattern
    ├── Permission
    └── Validation
            │
            ▼
          MySQL
```

## 2. FastAPI

FastAPI는 이미지 처리 및 Pattern 생성 기능을 담당합니다.

``` text
Image Upload → Pillow → Resize → K-Means → Palette/Pixel → PatternData
```

## 3. Django REST Framework

Django는 사용자 인증과 서버 Pattern 관리를 담당합니다.

``` text
/api/auth/
/api/patterns/
/api/patterns/public/
```

주요 기능:

-   회원가입 / 로그인
-   JWT Access / Refresh Token
-   현재 사용자 조회
-   Pattern CRUD
-   Public Pattern 조회
-   소유자 권한 검사
-   PatternData 유효성 검증

## 4. Django 구조

``` text
backend/django/
├── manage.py
├── config/
└── patterns/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── tests.py
```

## 5. Pattern 저장

``` text
Editor → savedPatternId 확인
             │
       ┌─────┴─────┐
       없음       있음
        │           │
       POST        PATCH
        │           │
        └─────┬─────┘
              ↓
            MySQL
```

최초 저장은 Pattern을 생성하고, 이후 저장은 기존 Pattern을 수정하여 중복
생성을 방지합니다.

## 6. 권한

``` text
Owner
 ├── View
 ├── Edit
 └── Delete

Non-owner
 ├── Public → View
 └── Private → Deny
```

## 7. 검증

-   pattern_data 존재 여부
-   width / height 유효성
-   Pattern과 PatternData 크기 일치
-   pixels 행 수와 height 일치
-   pixels 열 수와 width 일치

## 8. 테스트

Django Pattern API 자동 테스트 **18개 전체 통과** 상태입니다.

``` text
Found 18 test(s).
..................
----------------------------------------------------------------------
Ran 18 tests

OK
```
