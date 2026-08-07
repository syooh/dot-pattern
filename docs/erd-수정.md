# 🗄 ERD (Entity Relationship Diagram)

Dot Pattern Editor 프로젝트의 데이터 구조를 정의한 문서입니다.

현재는 PatternData(JSON)를 기준으로 동작하며,
향후 Django + MySQL 적용을 고려하여 ERD를 설계하였습니다.

---

# 📌 현재 데이터 구조

현재 프로젝트는 Database 대신 PatternData를 React State로 관리합니다.

```text
PatternData

──────────────────────────────

width

height

palette[]

pixels[][]
```

---

## Palette

```text
PaletteColor

──────────────────────────────

id

name

hex
```

예시

```json
{
  "id": 3,
  "name": "Blue",
  "hex": "#4287F5"
}
```

---

## Pixels

```text
pixels[y][x]

↓

Palette.id
```

예시

```text
0 0 0 1 1 2
0 0 1 1 2 2
3 3 3 1 0 0
```

각 숫자는 PaletteColor.id를 의미합니다.

---

# 현재 관계

```text
PatternData

│

├──────── palette (1 : N)

│

└──────── pixels (2D)

                 │

                 ▼

            Palette.id
```

---

# 📦 PatternData

```text
PatternData

──────────────────────────────

width

height

palette[]

pixels[][]
```

---

# 🎨 PaletteColor

```text
PaletteColor

──────────────────────────────

id

name

hex
```

향후

```text
PaletteColor

──────────────────────────────

id

name

hex

symbol

dmcCode

anchorCode

brand
```

으로 확장될 예정입니다.

---

# 🖼 Pixel

실제로는 별도의 객체가 존재하지 않고

```text
pixels[y][x]
```

배열 안에서 PaletteColor를 참조합니다.

```text
Pixel

──────────────────────────────

x

y

paletteId
```

개념으로 생각할 수 있습니다.

---

# 💾 JSON 저장 구조

```json
{

  "width": 40,

  "height": 60,

  "palette": [

    {

      "id":0,

      "name":"White",

      "hex":"#FFFFFF"

    }

  ],

  "pixels":[

    [0,0,0],

    [1,1,0]

  ]

}
```

---

# 🗄 향후 Database 설계

Django + MySQL 적용 시 사용할 ERD입니다.

---

## User

```text
User

──────────────────────────────

user_id (PK)

email

password

nickname

created_at
```

---

## Project

```text
Project

──────────────────────────────

project_id (PK)

user_id (FK)

title

width

height

created_at

updated_at
```

---

## Palette

```text
Palette

──────────────────────────────

palette_id (PK)

project_id (FK)

name

hex

symbol

dmc_code

anchor_code

brand
```

---

## Pixel

```text
Pixel

──────────────────────────────

pixel_id (PK)

project_id (FK)

palette_id (FK)

x

y
```

---

## History

Undo / Redo를 저장하기 위한 테이블

```text
History

──────────────────────────────

history_id (PK)

project_id (FK)

action

snapshot

created_at
```

---

# Entity Relationship

```text
User

│

│ 1

│

├───────────────────── N

Project

│

├───────────────┬─────────────────┐

│               │                 │

│1              │1                │1

│               │                 │

▼               ▼                 ▼

Palette         Pixel            History

       ▲

       │

       └──────────── palette_id
```

---

# 관계 설명

## User

하나의 사용자는

- 여러 개의 Project를 생성할 수 있습니다.

```
User 1 : N Project
```

---

## Project

하나의 프로젝트는

- 하나의 Palette 집합을 가지고

- 하나의 Pixel 집합을 가지며

- 여러 개의 History를 가집니다.

```
Project 1 : N Palette

Project 1 : N Pixel

Project 1 : N History
```

---

## Palette

Palette는

프로젝트마다 독립적으로 존재합니다.

```
Project

↓

Palette
```

---

## Pixel

Pixel은

Palette를 참조합니다.

```
Pixel

↓

palette_id

↓

Palette
```

---

# 📁 저장 구조

프로젝트 하나는

```text
Project

│

├── Palette

├── Pixels

├── History

└── Export File
```

형태로 저장됩니다.

---

# 🚀 향후 확장 예정

향후 추가 예정 Entity

```text
Favorite

Comment

Share

PrintSetting

ExportSetting

PatternSymbol

ThreadInfo

FabricInfo
```

---

# 최종 ERD

```text
                User
                 │
           1     │     N
                 │
              Project
        ┌────────┼─────────┐
        │        │         │
        │        │         │
        ▼        ▼         ▼
     Palette   Pixel    History
        ▲
        │
        └──── palette_id
```

---

본 문서는 현재(v0.2.x) 프로젝트 구조를 기준으로 작성되었으며,
향후 Django + MySQL 연동 시 기준 문서로 사용됩니다.