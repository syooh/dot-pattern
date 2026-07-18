# 🗄 ERD

프로젝트에서 사용하는 데이터 모델을 정의한 문서입니다.

---

# 📦 데이터 모델

현재 프로젝트는 **PatternData**, **PaletteColor**, **CameraState** 세 가지 주요 데이터 모델을 사용합니다.

```text
PatternData
│
├── width : number
├── height : number
├── palette : PaletteColor[]
└── pixels : number[][]

PaletteColor
│
├── id : number
├── name : string
└── hex : string

CameraState
│
├── zoom : number
├── offsetX : number
└── offsetY : number
```

---

# 📦 PatternData

도안 전체를 관리하는 최상위 데이터입니다.

```text
PatternData
──────────────────────────
width      : number
height     : number
palette[]  : PaletteColor[]
pixels[][] : number[][]
──────────────────────────
```

### 역할

- 도안 크기 관리
- 색상(Palette) 관리
- 픽셀 데이터 관리

---

# 🎨 PaletteColor

팔레트의 색상 정보를 저장합니다.

```text
PaletteColor
──────────────────────────
id   : number
name : string
hex  : string
──────────────────────────
```

### 역할

- 색상 고유 ID 관리
- 색상 이름 관리
- HEX 색상 코드 관리

---

# 📷 CameraState

Canvas의 Viewport 상태를 관리합니다.

```text
CameraState
──────────────────────────
zoom    : number
offsetX : number
offsetY : number
──────────────────────────
```

### 역할

- Zoom 배율
- X 이동값
- Y 이동값

CameraState는 PatternData와 분리되어 있으며, 화면(View) 상태만 관리합니다.

---

# 🔗 데이터 관계

```text
PatternData
│
├── width
├── height
├── palette[]
│      │
│      └── PaletteColor
│            ├── id
│            ├── name
│            └── hex
│
└── pixels[][]
       │
       └── PaletteColor.id 참조
```

Camera는 별도의 UI 상태로 관리됩니다.

```text
PatternEditor
│
├── PatternData
└── CameraState
```

---

# 📄 데이터 예시

### palette

```text
0 → #FFFFFF
1 → #000000
2 → #FF0000
```

### pixels

```text
0 0 1 1
2 2 1 0
0 2 2 1
```

`pixels` 배열의 숫자는 실제 색상이 아니라 **PaletteColor.id**를 의미합니다.

---

# 📑 데이터 구조

## PatternData

| 필드 | 타입 | 설명 |
|------|------|------|
| width | number | 도안의 가로 크기 |
| height | number | 도안의 세로 크기 |
| palette | PaletteColor[] | 사용 중인 색상 목록 |
| pixels | number[][] | 각 픽셀의 색상 ID |

---

## PaletteColor

| 필드 | 타입 | 설명 |
|------|------|------|
| id | number | 색상 고유 ID |
| name | string | 색상 이름 |
| hex | string | HEX 색상 코드 |

---

## CameraState

| 필드 | 타입 | 설명 |
|------|------|------|
| zoom | number | 확대/축소 배율 |
| offsetX | number | X축 이동값 |
| offsetY | number | Y축 이동값 |

---

# ✨ 설계 특징

## PatternData

- 하나의 PatternData가 도안 전체를 관리합니다.
- 모든 픽셀은 PaletteColor를 참조합니다.
- PatternEngine은 PatternData만 수정합니다.

---

## Palette

- 실제 색상은 Palette에서만 관리합니다.
- pixels에는 색상값이 아닌 ID만 저장합니다.
- 동일한 색상을 여러 픽셀이 공유할 수 있습니다.
- 메모리 사용량을 줄일 수 있습니다.

---

## Camera

- CameraState는 UI 상태입니다.
- PatternData와 완전히 분리되어 있습니다.
- 확대/이동 시에도 도안 데이터는 변경되지 않습니다.
- Viewport만 변경됩니다.

---

# 📌 향후 확장 예정

## PatternData

추가 예정 필드

```text
PatternData
│
├── width
├── height
├── palette
├── pixels
├── guides (예정)
├── selection (예정)
└── metadata (예정)
```

---

## CameraState

추가 예정 필드

```text
CameraState
│
├── zoom
├── offsetX
├── offsetY
├── minZoom
├── maxZoom
└── viewportSize
```

---

# 📝 변경 이력

## v0.9

- PatternData 구조 정의
- PaletteColor 구조 정의
- pixels → PaletteColor.id 참조 구조 적용

## v1.0

- CameraState 추가
- PatternData와 CameraState 분리
- Camera를 View 상태로 관리하도록 구조 개선