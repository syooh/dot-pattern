# 📖 Coding Convention

Dot Pattern Editor 프로젝트에서 사용하는 코딩 규칙입니다.

프로젝트의 일관성을 유지하기 위해 아래 규칙을 따릅니다.

---

# 1. 기본 원칙

- 하나의 컴포넌트는 하나의 역할만 가진다.
- UI와 로직을 분리한다.
- 재사용 가능한 코드는 Hook 또는 Engine으로 분리한다.
- Type은 중앙에서 관리한다.
- 가능한 모든 함수는 순수 함수(Pure Function)로 작성한다.

---

# 2. 폴더 구조

```text
components
hooks
engine
pages
types
utils
```

각 폴더는 자신의 역할만 담당한다.

---

# 3. 파일명 규칙

## 컴포넌트

PascalCase

```
PatternCanvas.tsx

CanvasViewport.tsx

PalettePanel.tsx
```

---

## Hook

camelCase

```
usePattern.ts

useKeyboardShortcuts.ts
```

---

## Engine

PascalCase

```
PatternEngine.ts

CanvasRenderer.ts
```

---

## Type

PascalCase

```
Pattern.ts

Selection.ts

Clipboard.ts
```

---

## CSS

컴포넌트 이름과 동일하게 작성한다.

```
Palette.css

Toolbar.css
```

---

# 4. 컴포넌트 작성 순서

모든 컴포넌트는 아래 순서를 따른다.

```tsx
// Header Comment

import ...

interface Props

export default function ...

State

Ref

Memo

Callback

Effect

Function

Return
```

예시

```tsx
import ...

interface Props {}

export default function Toolbar() {

    const [state, setState] = useState();

    const ref = useRef();

    useEffect(() => {

    }, []);

    function handleClick() {

    }

    return (

        ...

    );

}
```

---

# 5. Props 규칙

Props는 항상 interface로 선언한다.

```tsx
interface Props {

    pattern: PatternData;

    showGrid: boolean;

}
```

type 대신 interface를 기본으로 사용한다.

---

# 6. Type 규칙

공통 타입은

```
types
```

폴더에서만 관리한다.

예)

```
PatternData

PaletteColor

Selection

ClipboardData

CameraState
```

---

# 7. 함수 작성 규칙

함수 이름은 동사로 시작한다.

좋은 예

```
createPattern()

paintPixel()

rotateSelection()

saveHistory()
```

좋지 않은 예

```
pattern()

pixel()

rotate()

save()
```

---

# 8. State 이름

State는 의미가 명확해야 한다.

예)

```
selectedColor

showGrid

hoverCell

camera

selection
```

---

# 9. Boolean 이름

Boolean은

```
is

has

can

show
```

로 시작한다.

예)

```
isPasteMode

canUndo

showGrid

hasSelection
```

---

# 10. Event 함수

Event는

```
handle
```

로 시작한다.

예)

```
handleClick()

handleImport()

handleSave()

handleRotate()
```

---

# 11. Callback

Callback은

```
on
```

으로 시작한다.

예)

```
onClick

onImport

onSelect

onChange
```

---

# 12. React Hook

Hook은

```
use
```

로 시작한다.

```
usePattern()

useKeyboardShortcuts()

useCamera()
```

---

# 13. CSS 규칙

class 이름은 kebab-case를 사용한다.

예)

```
palette-list

color-button

toolbar-item
```

---

# 14. 주석 규칙

모든 파일은 Header를 가진다.

```ts
// ======================================================
// Component Name
// Version : v1.0
// Last Update : YYYY-MM-DD
//
// 역할
// 1.
// 2.
// ======================================================
```

---

## 큰 영역

```tsx
/* -------------------------------- */
/* Toolbar */
/* -------------------------------- */
```

---

## 작은 영역

```tsx
// ========================
// History
// ========================
```

---

# 15. Import 순서

```tsx
React

↓

Types

↓

Components

↓

Hooks

↓

Utils

↓

CSS
```

예시

```tsx
import { useState } from "react";

import type { PatternData } from "../../types/Pattern";

import PalettePanel from "../palette/PalettePanel";

import "./Palette.css";
```

---

# 16. Engine 규칙

Engine은 React를 import하지 않는다.

좋은 예

```
PatternEngine

↓

PatternData

↓

return PatternData
```

좋지 않은 예

```
PatternEngine

↓

setState()
```

Engine은 React를 몰라야 한다.

---

# 17. Hook 규칙

Hook은

```
UI를 그리지 않는다.
```

Hook은

- State

- Logic

만 담당한다.

---

# 18. Component 규칙

Component는

```
UI만 그린다.
```

비즈니스 로직은 Hook 또는 Engine으로 이동한다.

---

# 19. Commit 규칙

Commit Message

```
feat:

fix:

refactor:

style:

docs:

test:

chore:
```

예시

```
feat: add fill tool

fix: resolve undo history bug

docs: update architecture

refactor: split workspace components
```

---

# 20. Branch 규칙

```
main

develop

feature/import-image

feature/fill-tool

fix/history

docs/architecture
```

---

# 21. 네이밍 규칙

| 대상 | 규칙 |
|------|------|
| Component | PascalCase |
| Hook | camelCase (use~) |
| Function | camelCase |
| Variable | camelCase |
| Type | PascalCase |
| CSS | kebab-case |
| Folder | lowercase |

---

# 22. 프로젝트 설계 원칙

프로젝트는 아래 원칙을 따른다.

```
UI

↓

Hook

↓

Engine

↓

Data
```

UI는 Engine을 직접 수정하지 않는다.

반드시

```
Hook

↓

Engine
```

순서로 접근한다.

---

# 23. 코드 스타일

- 세미콜론(`;`)은 사용하지 않는다.
- 문자열은 큰따옴표(`"`)를 사용한다.
- 들여쓰기는 **4칸**을 사용한다.
- JSX 속성은 여러 개일 경우 줄바꿈한다.
- 긴 함수는 역할별로 분리한다.
- 하나의 함수는 하나의 책임만 가진다.

---

# 24. 문서 관리

프로젝트 문서는 `docs` 폴더에서 관리한다.

```
docs/

README.md

CHANGELOG.md

DEVLOG.md

Architecture.md

FlowChart.md

ERD.md

FolderStructure.md

API.md

CodingConvention.md
```

---

# 25. 목표

모든 코드가

- 읽기 쉽고
- 수정하기 쉽고
- 재사용 가능하며
- 확장 가능한 구조

를 유지하도록 한다.