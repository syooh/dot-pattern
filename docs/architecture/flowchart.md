# 🔄 FlowChart

프로젝트의 주요 기능 처리 흐름을 정리한 문서입니다.

---

# 🏗 전체 구조

```text
PatternEditor
│
├───────────────┬──────────────────────────────┐
│               │                              │
▼               ▼                              ▼
Toolbar     usePattern               useKeyboardShortcuts
│               │                              │
│               ├── Paint                     ├── ESC
│               ├── Erase                     ├── Delete
│               ├── Fill                      ├── Ctrl + C
│               ├── MoveSelection             ├── Ctrl + X
│               ├── RotateSelection           ├── Ctrl + V
│               ├── History                   ├── Ctrl + Z
│               └── Clipboard                 └── Ctrl + Shift + Z
│
▼
EditorLayout
│
├───────────────┬──────────────────────────────┐
│               │                              │
▼               ▼                              ▼
LeftPanel   Workspace                   StatusBar(예정)
│               │
▼               ▼
PalettePanel   CanvasViewport
                    │
                    ▼
            CanvasContainer
            ┌────────┴────────┐
            ▼                 ▼
    CanvasHeader       PatternCanvas
                              │
                              ▼
                      useCanvasEvents
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
     Paint Events      Selection Events     Hover State
                              │
                              ▼
                       CanvasRenderer
                              │
      ┌──────────┬──────────┬──────────┬────────────┬────────────────┬──────────────────┐
      ▼          ▼          ▼          ▼            ▼                ▼
 Background  PixelLayer  GridLayer  HoverLayer  SelectionLayer  PastePreviewLayer
```

---

# 🆕 새 도안 생성

```text
New Pattern
      │
      ▼
createPattern()
      │
      ▼
PatternData 생성
      │
      ▼
setPattern()
      │
      ▼
React State 업데이트
      │
      ▼
PatternCanvas Render
```

---

# 📂 도안 열기(Open)

```text
Toolbar Open
      │
      ▼
File Picker
      │
      ▼
JSON Read
      │
      ▼
loadPattern()
      │
      ▼
setPattern()
      │
      ▼
React State 업데이트
      │
      ▼
Canvas Render
```

---

# 💾 도안 저장(Save)

```text
Toolbar Save
      │
      ▼
PatternData
      │
      ▼
JSON 생성
      │
      ▼
Download
```

---

# 🎨 그리기 (Brush / Eraser / Fill)

```text
Mouse Down / Drag
        │
        ▼
CanvasEvents
        │
        ▼
saveHistory()
        │
        ▼
PatternEngine
        │
        ▼
새 PatternData 생성
        │
        ▼
setPattern()
        │
        ▼
React State 업데이트
        │
        ▼
CanvasRenderer
        │
        ▼
Canvas 다시 출력
```

---

# 🖱 Canvas 이벤트

```text
Mouse Down
      │
      ▼
CanvasEvents
      │
      ▼
Cell 좌표 계산
      │
      ▼
onPixelClick()
      │
      ▼
PatternEngine
      │
      ▼
PatternData 갱신
```

---

# 🖌 Canvas Render

```text
CanvasRenderer
      │
      ▼
BackgroundLayer
      │
      ▼
PixelLayer
      │
      ▼
GridLayer
      │
      ▼
HoverLayer
      │
      ▼
SelectionLayer
      │
      ▼
PastePreviewLayer
```

### 향후 추가 예정

```text
GuideLayer
      │
OverlayLayer
```

---

# 🛠 Tool 동작

Toolbar에서 선택한 기능이 Canvas에 적용되는 과정입니다.

```text
ToolbarButton
      │
      ▼
Toolbar
      │
      ▼
PatternEditor
      │
      ▼
usePattern
      │
      ▼
saveHistory()
      │
      ▼
PatternEngine
      │
      ▼
새 PatternData 생성
      │
      ▼
setPattern()
      │
      ▼
React State 업데이트
      │
      ▼
CanvasRenderer
      │
      ▼
PatternCanvas 다시 출력
```

---

# 🎨 Color 추가

```text
+ 버튼 클릭
      │
      ▼
AddColorPanel
      │
      ▼
Color Picker
      │
      ▼
HEX / RGB 입력
      │
      ▼
Preview
      │
      ▼
중복 색상 검사
      │
      ▼
Palette 추가
      │
      ▼
새 Color 자동 선택
      │
      ▼
Panel 닫기
```

---

# ↩ Undo / Redo

```text
Undo / Redo
      │
      ▼
History 확인
      │
      ▼
PatternData 복원
      │
      ▼
setPattern()
      │
      ▼
React State 업데이트
      │
      ▼
Canvas Render
```

---

# 📊 StatusBar 갱신

Pattern 상태가 변경될 때 StatusBar가 업데이트됩니다.

```text
Pattern 상태 변경
      │
      ▼
StatusBar
      │
      ├── Tool
      ├── Selected Color
      ├── Pattern Size
      └── 기타 상태 정보
```

---

# 🔳 Grid 표시

```text
Toolbar
      │
      ▼
showGrid 변경
      │
      ▼
CanvasRenderer
      │
      ▼
GridLayer 출력 여부 결정
```

---

# 🔍 Zoom

```text
Toolbar
      │
      ▼
Zoom In / Zoom Out
      │
      ▼
CameraState 변경
      │
      ▼
CanvasRenderer
      │
      ▼
Pixel
      │
      ▼
Grid
      │
      ▼
Hover
      │
      ▼
Header
```

---

# ✋ Pan

```text
Space + Drag
      │
      ▼
Camera Offset 변경
      │
      ▼
CameraState 업데이트
      │
      ▼
CanvasRenderer
      │
      ▼
Canvas 이동
```

---

# 🖱 Mouse Wheel Zoom

```text
Mouse Wheel
      │
      ▼
Camera Zoom 변경
      │
      ▼
CameraState 업데이트
      │
      ▼
CanvasRenderer
      │
      ▼
Canvas Render
```

---

# 📌 향후 예정

## Header Highlight

```text
Mouse Move
      │
      ▼
Hover Cell 변경
      │
      ▼
Header Highlight
```

---

## Selection Tool

```text
Selection Tool
      │
      ▼
Mouse Down
      │
      ▼
Selection 생성
      │
      ▼
Mouse Drag
      │
      ▼
Selection Update
      │
      ▼
SelectionLayer
      │
      ▼
Canvas Render
      │
      ▼
ESC
      │
      ▼
Selection 제거
```

### Copy/Cut/Paste Flow

```text
Copy / Cut

      │

      ▼

Selection 확인

      │

      ▼

Clipboard 생성

      │

      ▼

ClipboardData 저장

      │

      ▼

Ctrl + V

      │

      ▼

Paste Preview 생성

      │

      ▼

Mouse Move

      │

      ▼

Preview 이동

      │

      ▼

Mouse Click

      │

      ▼

PatternEngine

      │

      ▼

Pattern 갱신
```

---

## Import Image

```text
Import Image
      │
      ▼
Image Loader
      │
      ▼
Color Quantization
      │
      ▼
PatternData 생성
      │
      ▼
Canvas Render
```
## Delete Flow

```text
Delete Key

↓

useKeyboardShortcuts

↓

handleDeleteSelection()

↓

saveHistory()

↓

fillSelection()

↓

PatternEngine

↓

PatternData 수정

↓

setPattern()

↓

Canvas Render
```

## Selection Flow

```text
Select Tool

↓

Mouse Down

↓

Selection 생성

↓

Mouse Drag

↓

Selection Update

↓

Canvas Render

↓

ESC

↓

Selection 제거
```

### move Flow

```text
Select
    ↓
Selection 생성
    ↓
Move Tool 선택
    ↓
Drag
    ↓
Preview 이동
    ↓
Mouse Up
    ↓
PatternEngine.moveSelection()
    ↓
Pattern 갱신
```

### Rotate Flow

```text
Rotate

    ↓

Selection 확인

    ↓

saveHistory()

    ↓

PatternEngine.rotateSelection()

    ↓

Selection 크기 갱신

    ↓

offset 초기화

    ↓

Pattern 갱신

    ↓

Canvas Render
```

---

# ✨ 변경 사항

## Color 시스템 개선

### 기존

```text
Browser Color Picker
        │
        ▼
Palette
```

### 현재

```text
AddColorPanel
        │
        ├── Color Picker
        ├── HEX 입력
        ├── RGB 입력
        ├── Preview
        └── ColorUtils
                │
                ▼
             Palette
```

### 개선 효과

- Browser Color Picker 의존성 제거
- 사용자 경험(UX) 향상
- Color 기능 모듈화
- 유지보수성 향상
- 기능 확장 용이

---

# 📅 최근 변경 사항 (2026-07-18)

- CanvasRenderer 구조 도입
- Layer 기반 렌더링 적용
- Hover Layer 추가
- Workspace 구조 개선
- CanvasContainer 구조 개선
- CanvasEvents 분리
- Color 시스템 리팩토링
- Camera 구조 추가
- Zoom / Pan 구조 설계
- Save / Open Flow 추가
- StatusBar Flow 추가

# 📅 최근 변경 사항 (2026-07-28)

- Undo / Redo 구현
- Clipboard 시스템 추가
- Copy / Cut / Paste 구현
- Paste Preview Layer 추가
- Move Tool 구현
- Rotate Engine 구현
- Rotate Toolbar 추가
- Rotate UX 개선
- Selection 자동 갱신
- Selection Offset 초기화
```