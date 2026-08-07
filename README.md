# 🧶 Dot Pattern Editor

이미지를 십자수 도안(Cross Stitch Pattern)으로 변환하고,
직접 수정 및 저장할 수 있는 도안 편집기입니다.

---

# ✨ 주요 기능

## 🖼 이미지 → 도안 변환

- 이미지 업로드
- K-Means 색상 압축
- 색상 개수 지정
- 도안 크기 지정
- 자동 비율 유지

---

## 🎨 도안 편집

- Brush
- Eraser
- Fill
- Select
- Move
- Undo / Redo
- Grid ON / OFF
- Zoom In / Out

---

## 🎨 Palette

- 색상 추가
- 색상 삭제
- 색상 선택
- 자동 선택

---

## 📁 저장

- JSON 저장
- JSON 불러오기
- PNG 저장
- Grid 포함 PNG 저장
- 5칸마다 굵은 Grid 출력

---

# 🏗 프로젝트 구조

```
dot_pattern
│
├── backend
│   ├── api.py
│   ├── pattern_generator.py
│   ├── color_quantizer.py
│   ├── image_utils.py
│   ├── json_exporter.py
│   └── ...
│
├── frontend
│   ├── src
│   │
│   ├── components
│   │   ├── canvas
│   │   ├── layout
│   │   ├── palette
│   │   ├── toolbar
│   │   ├── workspace
│   │   └── common
│   │
│   ├── hooks
│   │
│   ├── pages
│   │
│   ├── engine
│   │
│   └── utils
│
└── docs
```

---

# ⚙ 기술 스택

## Frontend

- React
- TypeScript
- Vite

## Backend

- Python
- FastAPI
- Pillow
- NumPy
- Scikit-Learn (K-Means)

---

# 🚀 실행 방법

## Backend

```bash
cd backend

python api.py
```

또는

```bash
uvicorn api:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📦 현재 구현 완료

## Backend

- 이미지 불러오기
- K-Means 색상 압축
- 크기 조절
- JSON 생성
- FastAPI API
- React 연동

---

## Frontend

- Pattern 생성
- Pattern 편집
- Palette
- Brush
- Eraser
- Fill
- Select
- Move
- Undo
- Redo
- Zoom
- PNG 저장
- JSON 저장
- JSON 불러오기
- 이미지 Import

---

# 📌 향후 개발 계획

## UI

- Workspace 리팩터링
- Panel 접기
- 반응형 UI
- 단축키
- 우클릭 메뉴

## Backend

- Django 연동
- MySQL 연동
- 프로젝트 저장
- 사용자 계정

## 도안 기능

- DMC 실번호 자동 변환
- Anchor 지원
- 심볼(Symbol) 자동 생성
- PDF 출력
- 인쇄 최적화

---

# 📖 개발 문서

프로젝트 문서는 docs 폴더에서 관리됩니다.

- CHANGELOG
- DEVLOG
- Architecture
- FlowChart
- Folder Structure
- ERD

---

# 📄 License

MIT License