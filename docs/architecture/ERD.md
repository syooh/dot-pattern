# 🗄 ERD

프로젝트에서 사용하는 데이터 모델을 정의한 문서입니다.

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

---

# 🔗 데이터 관계

```text
PatternData
│
├── width
├── height
├── pixels[][]
└── palette[]
      │
      ├── PaletteColor
      │     ├── id
      │     ├── name
      │     └── hex
      │
      └── pixels[][]의 값은
          PaletteColor.id를 참조
```

예시

```text
palette

0 → #FFFFFF
1 → #000000
2 → #FF0000

pixels

0 0 1 1
2 2 1 0
0 2 2 1
```

위 데이터에서 `pixels` 배열의 숫자는 `palette`의 `id`를 의미합니다.

---

# 📄 데이터 구조

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

# ✨ 특징

- `PatternData` 하나가 도안 전체를 관리합니다.
- `pixels`에는 실제 색상이 아닌 `PaletteColor.id`를 저장합니다.
- 색상 정보는 `palette`에서만 관리하여 메모리 사용을 줄였습니다.
- 동일한 색상이 여러 픽셀에서 재사용될 수 있습니다.

---

# 📝 변경 이력

현재 버전에서는 데이터 구조(ERD)의 변경 사항이 없습니다.