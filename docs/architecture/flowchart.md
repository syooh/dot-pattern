# 🔄 FlowChart

프로젝트의 주요 기능 처리 흐름을 정리한 문서입니다.

---

# 🏗 전체 구조

```
PatternEditor
      │
      ▼
Toolbar
      │
      ▼
EditorLayout
      │
      ├───────────────┬──────────────────────┐
      │               │                      │
      │ PalettePanel  │      Workspace       │
      │               │                      │
      └───────────────┴──────────────────────┘
                              │
                              ▼
                      CanvasViewport
                              │
                              ▼
                      CanvasContainer
                   ┌──────────┴──────────┐
                   │                     │
                   ▼                     ▼
          CanvasHeader         PatternCanvas
                                       │
                                       ▼
                               CanvasRenderer
                                       │
      ┌──────────────┬──────────────┬──────────────┬──────────────┐
      ▼              ▼              ▼              ▼
BackgroundLayer  PixelLayer    GridLayer    HoverLayer
```

---

# 🆕 새 도안 생성

사용자가 새로운 도안을 생성하는 과정입니다.

```text
새 도안 생성
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
PatternCanvas 렌더링
```

---

# 🎨 그리기 (Brush / Eraser / Fill)

Canvas에서 편집 기능을 사용하는 과정입니다.

```text
사용자 클릭 또는 드래그
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
Layer 순서대로 다시 출력
```

---

# 🖌 Canvas Render

Canvas가 다시 그려지는 과정입니다.

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
```

향후 추가 예정

```text
SelectionLayer
      │
GuideLayer
      │
OverlayLayer
```

---

# 🎨 Color 추가

새로운 색상을 Palette에 추가하는 과정입니다.

```text
+ 버튼 클릭
      │
      ▼
AddColorPanel 열기
      │
      ▼
Color Picker
      │
      ▼
HEX / RGB 입력
      │
      ▼
Color Preview
      │
      ▼
중복 색상 검사
      │
      ▼
Palette에 색상 추가
      │
      ▼
새 Color 자동 선택
      │
      ▼
Panel 닫기
```

---

# ↩ Undo / Redo

History를 이용하여 이전 또는 이후 상태를 복원합니다.

```text
Undo / Redo 클릭
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
CanvasRenderer 다시 출력
```

---

# 🖱 Canvas 이벤트

Canvas에서 발생하는 마우스 이벤트 처리 과정입니다.

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
paint()
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

# 🔄 FlowChart

ToolbarButton 클릭

↓

Toolbar

↓

PatternEditor

↓

usePattern

↓

PatternEngine

↓

PatternData 생성

↓

React State 업데이트

↓

CanvasRenderer

↓

PatternCanvas 다시 출력

--------------------------------

Status 정보

Pattern 상태 변경

↓

StatusBar

↓

Tool

↓

Color

↓

Pattern Size

↓

화면 업데이트

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

## Camera

```text
Mouse Wheel
      │
      ▼
Camera Zoom
      │
      ▼
CanvasRenderer
```

---

## Pan

```text
Space + Drag
      │
      ▼
Camera Offset 변경
      │
      ▼
CanvasRenderer
```

---

# ✨ 변경 사항

## Color 시스템

기존에는 브라우저 기본 Color Picker를 사용하였습니다.

```text
Browser Color Picker
        │
        ▼
Palette
```

현재는 독립적인 Color 시스템으로 변경되었습니다.

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

# 📅 최근 변경 사항 (2026-07-15)

- CanvasRenderer 구조 도입
- Layer 기반 렌더링 적용
- Hover Layer 추가
- Workspace 구조 개선
- Canvas 이벤트 처리 개선
- CanvasContainer 구조 정리