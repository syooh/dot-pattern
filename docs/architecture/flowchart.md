# 🔄 FlowChart

## 1. 이미지 → 도안 생성

```text
사용자
  │
  ▼
Import Image
  │
  ▼
이미지 파일 선택
  │
  ▼
width / height / colors 입력
  │
  ▼
PatternEditor
  │
  ▼
patternApi.generatePattern()
  │
  │ POST /generate
  ▼
FastAPI
  │
  ▼
Pillow 이미지 로드
  │
  ▼
generate_pattern()
  │
  ├── 이미지 크기 조정
  ├── K-Means 색상 양자화
  └── Pixel Pattern 생성
  │
  ▼
PatternData JSON
  │
  ▼
React setPattern()
  │
  ▼
Canvas 재렌더링
```

---

## 2. Edit Mode

```text
사용자
  │
  ▼
Canvas 클릭/드래그
  │
  ▼
CanvasEvents
  │
  ├── Brush
  ├── Eraser
  ├── Fill
  ├── Select
  └── Move
  │
  ▼
PatternEditor
  │
  ▼
PatternEngine
  │
  ▼
PatternData 변경
  │
  ▼
React State 업데이트
  │
  ▼
PatternCanvas
  │
  ▼
CanvasRenderer
  │
  ▼
화면 갱신
```

---

## 3. View Mode

```text
View Mode 진입
  │
  ▼
currentRow = 1
  │
  ▼
Canvas 클릭
  │
  ▼
클릭한 y 좌표 계산
  │
  ▼
currentRow = pattern.height - y
  │
  ▼
CurrentRowLayer
  │
  ▼
현재 행 강조
  │
  ▼
StatusBar
  ├── Row
  └── Progress
```

---

## 4. JSON 저장

```text
Save
 │
 ▼
PatternData
 │
 ▼
JSON.stringify()
 │
 ▼
Blob
 │
 ▼
브라우저 다운로드
```

---

## 5. JSON 불러오기

```text
Open
 │
 ▼
파일 선택
 │
 ▼
FileReader
 │
 ▼
JSON.parse()
 │
 ▼
loadPattern()
 │
 ▼
PatternData
 │
 ▼
Canvas 갱신
```

---

## 6. PNG 저장

```text
Export PNG
 │
 ▼
PatternData
 │
 ▼
Offscreen Canvas 생성
 │
 ▼
Pixel 색상 출력
 │
 ▼
Grid 출력
 │
 ▼
canvas.toBlob()
 │
 ▼
PNG 다운로드
```

---

## 7. 향후 서비스 흐름

```text
Login
 │
 ▼
JWT 발급
 │
 ▼
내 도안 목록
 │
 ├───────────────┐
 ▼               ▼
내 도안         공개 도안
 │               │
 ▼               ▼
Edit/View       View
 │
 ▼
PatternEditor
 │
 ▼
Django REST API
 │
 ▼
MySQL
```

---

## 8. 권한 흐름

```text
Pattern 요청
    │
    ▼
JWT 인증
    │
    ▼
소유자 확인
    │
    ├── Yes → Edit 허용
    │
    └── No
         │
         ├── Public → View
         │
         └── Private → 접근 거부
```


---

## 9. PNG Export 최적화 흐름

```text
Export PNG
    │
    ▼
PatternData
    │
    ▼
Canvas 생성
    │
    ▼
Pixel 전체 렌더링
    │
    ▼
세로 Grid 전체 렌더링
    │
    ▼
가로 Grid 전체 렌더링
    │
    ▼
Canvas → Blob
    │
    ▼
PNG 다운로드
```

### 기존 문제

```text
Pixel 반복
   ├── Pixel 렌더링
   ├── 전체 세로 Grid
   └── 전체 가로 Grid
```

Grid가 Pixel 수만큼 불필요하게 반복되었습니다.

### 현재 구조

```text
Pixel 전체
   ↓
세로 Grid 1회
   ↓
가로 Grid 1회
```

따라서 패턴 크기가 커질수록 불필요한 반복 작업을 줄일 수 있습니다.
