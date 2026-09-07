# 📝 Development Notes

# Dot Pattern Editor 개발 기록

## 1. 프로젝트 시작

이미지를 픽셀 기반 도안으로 변환하고 웹에서 수정할 수 있는 편집기를 목표로 개발을 시작했습니다.

초기 핵심 기능:

- 이미지 → 패턴 변환
- 색상 수 조절
- Canvas 편집
- Palette
- JSON 저장
- PNG Export

---

## 2. PatternData 설계

도안은 다음 구조를 중심으로 관리합니다.

```text
PatternData
├── width
├── height
├── palette
└── pixels
```

`pixels`에는 Palette의 색상 ID를 저장하여 실제 색상 정보와 픽셀 데이터를 분리했습니다.

---

## 3. Canvas Editor 개발

Canvas를 단순한 그리기 공간으로 사용하지 않고 다음 구조로 분리했습니다.

```text
PatternCanvas
    ↓
CanvasEvents
    ↓
PatternEditor / PatternEngine
```

렌더링은:

```text
CanvasRenderer
    ↓
Layer
```

구조로 분리했습니다.

이를 통해 편집 로직과 화면 렌더링 로직의 결합을 줄였습니다.

---

## 4. 편집 기능

다음 기능을 구현했습니다.

- Brush
- Eraser
- Fill
- Select
- Move
- Copy
- Cut
- Paste
- Undo
- Redo
- Rotate
- Horizontal Flip
- Vertical Flip
- Zoom
- Grid

---

## 5. Palette

Palette에서:

- 색상 선택
- 색상 추가
- 색상 삭제

기능을 구현했습니다.

색상 추가 UI는 Modal 형태로 정리했으며 HEX/RGB 기반 색상 선택을 지원합니다.

---

## 6. View Mode

편집 화면에 Edit / View Mode를 추가했습니다.

View Mode에서는:

- PatternData 수정 금지
- 편집 도구 사용 금지
- Undo / Redo 금지
- 키보드 편집 단축키 차단
- Grid / Zoom 사용 가능

하도록 구성했습니다.

또한 사용자가 현재 작업 중인 행을 지정할 수 있도록:

- 현재 행
- 이전 / 다음 행
- 진행률
- Current Row Highlight

를 추가했습니다.

---

## 7. 좌표 방향

실제 작업 방향을 고려하여 도안 좌표를 다음과 같이 표시합니다.

```text
위
↑
행 번호 증가
│
│
└── 아래쪽이 1행
```

가로 방향 역시 실제 작업 기준에 맞춰 1-based 좌표를 표시합니다.

Canvas 내부 좌표와 사용자에게 표시하는 작업 좌표를 분리하여 사용합니다.

---

## 8. PNG Export 개선

최근 PNG Export 코드를 정리했습니다.

### 문제

기존 Grid 렌더링이 Pixel 반복문 내부에 있었습니다.

```text
for each pixel
    draw pixel

    for each column
        draw grid

    for each row
        draw grid
```

이 구조에서는 하나의 Pixel을 그릴 때마다 전체 Grid가 다시 그려지는 문제가 있었습니다.

### 개선

현재는:

```text
1. Pixel 전체 렌더링
2. 세로 Grid 전체 렌더링
3. 가로 Grid 전체 렌더링
4. PNG 생성
```

순서로 변경했습니다.

이 변경은 결과 이미지는 유지하면서 불필요한 Grid 렌더링을 제거한 것입니다.

---

## 9. 현재 개발 상태

현재 Frontend Editor의 핵심 기능은 대부분 구현된 상태입니다.

```text
이미지 Import          ✅
패턴 생성              ✅
Palette                ✅
Brush                  ✅
Eraser                 ✅
Fill                   ✅
Select                 ✅
Move                   ✅
Copy / Cut / Paste     ✅
Undo / Redo            ✅
Rotate / Flip          ✅
Zoom                   ✅
Grid                   ✅
JSON Import / Export   ✅
PNG Export             ✅
Edit / View Mode       ✅
Current Row            ✅
Progress               ✅
```

보류:

```text
Stitch Symbol 변환     ⏸
```

---

## 10. 다음 개발 단계

현재 상태를 Git에 checkpoint로 저장한 뒤 Backend 확장 단계로 넘어갑니다.

```text
현재 Editor 완성
      ↓
문서 정리
      ↓
테스트
      ↓
Git Commit / Push
      ↓
Django
      ↓
DRF
      ↓
MySQL
      ↓
JWT
      ↓
User / Pattern CRUD
      ↓
권한 관리
      ↓
React ↔ Django 연동
```

---

## 11. 개발 원칙

앞으로도 다음 원칙을 유지합니다.

1. PatternData를 원본 데이터로 유지
2. Canvas와 데이터 수정 로직 분리
3. Renderer와 UI 분리
4. View Mode에서 원본 데이터 변경 금지
5. Backend 권한 검사를 최종 보안 계층으로 사용
6. 기능을 추가할 때 기존 구조를 최대한 유지
7. 기능 구현 후 Git checkpoint 생성
