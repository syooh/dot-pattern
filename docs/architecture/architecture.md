사용자

↓

PatternEditor

↓

PatternCanvas

↓

usePattern

↓

PatternEngine

↓

PatternData

↓

React State

↓

Canvas




Toolbar
    │
    │ Tool 선택
    ▼
usePattern
    │
    ├── Brush
    ├── Eraser
    └── Fill(예정)
    │
    ▼
PatternEngine
    │
    ▼
PatternData
    │
    ▼
PatternCanvas



# 🏗 Architecture

```
PatternEditor
│
├── Toolbar
│
├── Canvas
│
├── ColorPalette
│      │
│      ▼
│   AddColorPanel
│      │
│      ▼
│   ColorUtils
│
└── usePattern
```

## 변경 사항

Color 기능을 독립적인 모듈 구조로 리팩토링하였다.

기존에는 ColorPalette 내부에서 모든 작업을 수행했으나,
현재는 Color Picker, Color Logic, Palette UI가 각각 분리되어 유지보수가 쉬운 구조가 되었다.