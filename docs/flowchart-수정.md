# 🔄 Flow Chart

Dot Pattern Editor의 주요 기능 처리 흐름을 정리한 문서입니다.

---

# 🏗 전체 구조

```text
사용자

│

▼

PatternEditor

│

├──────── Toolbar

├──────── LeftPanel

└──────── Workspace

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

    Canvas Rendering
```

---

# 📄 새 도안 생성

```text
Pattern Panel

↓

Width 입력

↓

Height 입력

↓

Create

↓

createPattern()

↓

createEmptyPattern()

↓

PatternData 생성

↓

React State

↓

Canvas 출력
```

---

# 🖼 이미지 Import

```text
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

Canvas 출력
```

---

# 🖌 Brush

```text
Mouse Down

↓

Paint Pixel

↓

saveHistory()

↓

PatternEngine

↓

PatternData 변경

↓

Canvas 다시 그리기
```

---

# 🩹 Eraser

```text
Mouse Down

↓

Erase Pixel

↓

saveHistory()

↓

PatternEngine

↓

Canvas Update
```

---

# 🪣 Fill

```text
Click

↓

Flood Fill

↓

PatternEngine

↓

PatternData 변경

↓

Canvas Update
```

---

# ↩ Undo

```text
Undo

↓

History Pop

↓

Future Push

↓

PatternData

↓

Canvas
```

---

# ↪ Redo

```text
Redo

↓

Future Pop

↓

History Push

↓

PatternData

↓

Canvas
```

---

# 📋 Copy

```text
Selection

↓

Ctrl + C

↓

Clipboard 저장
```

---

# ✂ Cut

```text
Selection

↓

Ctrl + X

↓

Clipboard 저장

↓

Selection 삭제

↓

Canvas Update
```

---

# 📌 Paste

```text
Ctrl + V

↓

Paste Preview

↓

위치 선택

↓

PatternData 반영

↓

Canvas Update
```

---

# 🎨 Palette 추가

```text
+

↓

Color Picker

↓

HEX / RGB

↓

중복 검사

↓

Palette 추가

↓

자동 선택
```

---

# 💾 JSON 저장

```text
Toolbar

↓

Save

↓

PatternData

↓

JSON

↓

Download
```

---

# 📂 JSON 불러오기

```text
Toolbar

↓

Open

↓

JSON

↓

PatternData

↓

Canvas
```

---

# 🖼 PNG 저장

```text
Toolbar

↓

Export PNG

↓

Canvas 생성

↓

Pixel 출력

↓

Grid 출력

↓

5칸 Grid

↓

PNG 생성

↓

Download
```

---

# 🔍 Zoom

```text
Zoom +

↓

Camera.zoom 증가

↓

Canvas 다시 렌더링
```

---

# 📌 Grid

```text
Grid Toggle

↓

showGrid 변경

↓

Canvas Render

↓

Grid 표시/숨김
```

---

# 🎯 Selection

```text
Mouse Drag

↓

Selection 생성

↓

Move

↓

Rotate

↓

Flip

↓

Canvas Update
```