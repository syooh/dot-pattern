# 🗄 ERD

## 1. 현재 Frontend 데이터 모델

현재 프로젝트에는 DB가 연결되어 있지 않으므로 실제 SQL 테이블은 존재하지 않습니다.

현재 핵심 모델은 TypeScript interface로 관리합니다.

```text
PatternData
├── width : number
├── height : number
├── palette : PaletteColor[]
└── pixels : number[][]

PaletteColor
├── id : number
├── hex : string
├── name : string
├── code? : string
├── brand? : string
├── symbol? : string
└── count? : number
```

관계:

```text
PatternData
    │
    ├── 1 : N ── PaletteColor
    │
    └── 1 : 1 ── pixels matrix
```

`pixels[y][x]`는 `PaletteColor.id`를 참조합니다.

---

## 2. 현재 상태와 향후 DB 모델의 차이

현재:

```text
React State
    ↓
PatternData
    ↓
JSON / PNG
```

향후:

```text
React
   ↓
Django REST API
   ↓
MySQL
```

---

## 3. 향후 DB ERD

서비스화 단계에서 권장하는 기본 구조입니다.

```text
┌──────────────────┐
│      User        │
├──────────────────┤
│ PK id            │
│ username         │
│ email            │
│ password         │
│ created_at       │
└────────┬─────────┘
         │ 1
         │
         │ N
┌────────▼─────────┐
│     Pattern      │
├──────────────────┤
│ PK id            │
│ FK owner_id      │
│ title            │
│ width            │
│ height           │
│ is_public        │
│ pattern_data     │
│ created_at       │
│ updated_at       │
└──────────────────┘
```

### 관계

```text
User 1 ───── N Pattern
```

한 사용자는 여러 개의 도안을 소유할 수 있습니다.

---

## 4. Pattern 저장 방식

초기 Django 구현에서는 `pattern_data`를 JSON 형태로 저장하는 방법을 우선 고려합니다.

예:

```json
{
  "width": 40,
  "height": 50,
  "palette": [],
  "pixels": []
}
```

장점:

- 현재 `PatternData` 구조를 거의 그대로 저장 가능
- React ↔ Django 데이터 구조가 단순함
- 도안 편집기 개발 속도가 빠름

추후 검색/통계/실 정보 관리가 필요해지면 Palette 또는 Stitch 데이터를 별도 테이블로 정규화할 수 있습니다.

---

## 5. 권한 모델

```text
User
 │
 └── Pattern
      │
      ├── owner → Edit
      │
      └── non-owner
           ├── public  → View
           └── private → Deny
```

중요한 점:

> View/Edit 제한은 React UI만으로 구현하지 않고 Django Permission에서 최종적으로 검사해야 합니다.

---

## 6. 향후 확장 모델

필요성이 확인된 후 다음 모델을 추가할 수 있습니다.

```text
PatternVersion
Favorite
Comment
PatternImage
PaletteColor
StitchPattern
```

단, MVP에서는 먼저 `User + Pattern`으로 시작하여 데이터 구조를 과도하게 복잡하게 만들지 않습니다.
