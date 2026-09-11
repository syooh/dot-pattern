# 🧶 Dot Pattern Editor

이미지를 도안 형태의 픽셀 패턴으로 변환하고, 브라우저에서 직접
수정·저장할 수 있는 웹 기반 도안 편집기입니다.

> **현재 기준:** Frontend 편집기 + FastAPI 이미지 변환 API + Django REST
> Framework/MySQL/JWT 기반 사용자·도안 저장 기능이 구현되어 있습니다.

------------------------------------------------------------------------

## 1. 프로젝트 목표

-   이미지를 지정한 크기와 색상 수의 도안으로 변환
-   Canvas 기반으로 도안을 직접 편집
-   색상 팔레트 관리
-   선택 영역 복사/붙여넣기/이동
-   Undo / Redo
-   JSON / PNG 저장
-   Edit Mode / View Mode 제공
-   View Mode에서 현재 작업 행과 진행률 확인
-   향후 로그인, 개인 도안 저장, 공개/비공개 및 권한 관리까지 확장

------------------------------------------------------------------------

## 2. 현재 구현 기능

### 🖼 이미지 → 도안

-   이미지 업로드
-   FastAPI `/generate` API 호출
-   Pillow 기반 이미지 처리
-   K-Means 색상 양자화
-   도안 가로 크기 지정
-   세로 크기 지정 또는 원본 비율 기반 계산
-   색상 수 지정
-   `PatternData` 형태의 JSON 반환

### 🎨 도안 편집

-   Brush
-   Eraser
-   Fill
-   Select
-   Move
-   Undo / Redo
-   Grid ON / OFF
-   Zoom In / Out
-   선택 영역 복사 / 잘라내기 / 붙여넣기
-   선택 영역 이동
-   Rotate
-   Horizontal / Vertical Flip

### 🎨 Palette

-   색상 선택
-   색상 추가
-   색상 삭제
-   선택 색상 표시
-   색상 정보 확장 필드(`code`, `brand`, `symbol`, `count`) 설계

### 👁 View Mode

-   Edit / View 모드 전환
-   View Mode에서 도안 수정 차단
-   클릭한 행을 현재 작업 행으로 지정
-   이전 / 다음 행 이동
-   현재 행 표시
-   전체 행 대비 진행률 표시
-   현재 커서의 도안 좌표 표시
-   현재 작업 행을 Canvas에 시각적으로 표시

### 📁 저장 / 불러오기

-   JSON 파일 저장
-   JSON 파일 불러오기
-   PNG 저장
-   PNG에서 10칸 단위 굵은 Grid 출력
-   PNG Export의 Grid 렌더링 구조 최적화

------------------------------------------------------------------------

## 3. 기술 스택

### Frontend

-   React 19
-   TypeScript 6
-   Vite 8
-   react-colorful
-   lucide-react

### Backend

-   Python
-   FastAPI
-   Uvicorn
-   Pillow
-   NumPy
-   scikit-learn (K-Means)

### Backend 추가 구성

-   Django
-   Django REST Framework
-   MySQL
-   JWT 인증
-   사용자별 Pattern CRUD
-   Public / Private Pattern
-   Pattern 권한 관리
-   Pattern 데이터 검증

------------------------------------------------------------------------

## 4. 프로젝트 구조

``` text
dot_pattern/
├── backend/
│   ├── app.py
│   ├── generator.py
│   ├── color_quantizer.py
│   ├── image_utils.py
│   ├── pattern_generator.py
│   ├── json_exporter.py
│   ├── main.py
│   ├── input/
│   └── output/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── canvas/
│   │   │   ├── common/
│   │   │   ├── dialog/
│   │   │   ├── layout/
│   │   │   ├── palette/
│   │   │   ├── panel/
│   │   │   ├── toolbar/
│   │   │   └── workspace/
│   │   ├── engine/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── docs/
├── requirements.txt
└── README.md
```

------------------------------------------------------------------------

## 5. 실행 방법

### Backend

``` bash
cd backend
uvicorn app:app --reload
```

기본 API:

``` text
POST http://127.0.0.1:8000/generate
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

Vite 개발 서버에서 실행합니다.

------------------------------------------------------------------------

## 6. PatternData

Frontend의 핵심 데이터 구조는 다음과 같습니다.

``` text
PatternData
├── width
├── height
├── palette[]
└── pixels[][]
```

`pixels[y][x]`에는 실제 HEX 값이 아니라 `palette`의 색상 `id`가
저장됩니다.

예:

``` text
palette
0 → White
1 → Black
2 → Red

pixels
[
  [0, 0, 1, 1],
  [0, 2, 2, 1]
]
```

이 구조를 사용하면 색상 정보와 픽셀 데이터를 분리할 수 있습니다.

------------------------------------------------------------------------

## 7. Canvas 구조

Canvas는 직접 데이터를 수정하지 않고 Renderer와 Layer를 통해 화면을
그립니다.

``` text
PatternCanvas
      │
      ▼
CanvasRenderer
      │
      ├── BackgroundLayer
      ├── PixelLayer
      ├── GridLayer
      ├── CurrentRowLayer (View Mode)
      ├── HoverLayer
      ├── SelectionLayer
      └── PastePreviewLayer
```

도안 데이터 변경은 `PatternEngine`에서 담당합니다.

------------------------------------------------------------------------

## 8. 개발 방향

### 다음 단계

1.  현재 Frontend/Backend 상태 Git checkpoint 생성
2.  문서 정리
3.  테스트 보강
4.  Django 프로젝트 생성
5.  Django REST Framework 적용
6.  MySQL 연결
7.  User / Pattern 모델 생성
8.  Pattern CRUD API
9.  JWT 로그인
10. 소유자/비소유자 권한 처리
11. React와 Django API 연결
12. 개인 도안 목록 → PatternEditor 연결

### 보류

-   코바늘/뜨개 기호 변환
-   실제 StitchPattern 데이터 변환
-   PDF 출력
-   DMC/Anchor 자동 매칭

------------------------------------------------------------------------

## 9. PNG Export 구조

PNG Export는 다음 순서로 처리합니다.

``` text
PatternData
    ↓
모든 Pixel 렌더링
    ↓
세로 Grid 전체 렌더링
    ↓
가로 Grid 전체 렌더링
    ↓
PNG Blob 생성
    ↓
다운로드
```

Grid를 각각의 Pixel 처리 안에서 반복해서 그리지 않고, **모든 Pixel을
먼저 그린 뒤 Grid를 한 번씩 렌더링**하도록 구성했습니다.

이를 통해 패턴 크기가 커져도 불필요한 Grid 반복 렌더링을 방지합니다.

## 10. 현재 프로젝트의 핵심 설계 원칙

-   Canvas와 데이터 수정 로직 분리
-   UI 컴포넌트와 도안 연산 로직 분리
-   `PatternData`를 원본 데이터로 유지
-   View Mode는 원본 데이터를 변경하지 않음
-   향후 Backend에서도 권한 검사를 수행하여 Frontend의 View/Edit 제한을
    보완

------------------------------------------------------------------------

## 11. Backend Architecture

``` text
FastAPI
→ 이미지 → PatternData

Django REST Framework
→ 인증 / Pattern CRUD / Public Pattern / 권한

MySQL
→ User / Pattern 데이터 저장
```

Django Pattern API 자동 테스트는 **18개 전체 통과**했습니다.

자세한 Backend 구조는 `ARCHITECTURE_BACKEND.md`에서 확인할 수 있습니다.
