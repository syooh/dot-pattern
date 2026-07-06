# Changelog

## 2026-06-30

### Project

- Git 프로젝트 초기화
- GitHub Repository 생성
- 첫 Commit 완료

### Backend

- 이미지 색상 압축(K-Means)
- JSON Export 기능
- 색상표 저장
- 픽셀 데이터 저장
- 도안 이미지 생성

### Frontend

- React 프로젝트 생성
- PatternCanvas 생성
- PatternEngine 생성
- 빈 도안 생성 기능
- 드래그 색칠 기능
- 색상 팔레트 컴포넌트
- Toolbar 컴포넌트
- New Pattern Dialog 생성

### Next

- 색상 추가 기능
- 지우개 기능
- 실행 취소(Undo)
- 확대/축소


# 변경 내역

## v0.5 (2026-07-03)

### 변경

- usePattern 구조를 리팩터링하였습니다.
- PatternCanvas와 PatternEngine의 연결 방식을 개선하였습니다.
- PatternEditor를 새로운 구조에 맞게 수정하였습니다.
- ColorPalette 컴포넌트의 구조를 개선하였습니다.

### 추가

- 사용자 색상 추가 기능을 개선하였습니다.
- 선택한 색상을 강조 표시하는 기능을 추가하였습니다.
- 색상 삭제 기능을 위한 UI를 준비하였습니다.

### 개선

- Canvas 드래그 시 동일한 칸을 반복해서 색칠하지 않도록 수정하였습니다.
- 컴포넌트의 역할을 분리하여 유지보수가 쉬운 구조로 개선하였습니다.


# 변경 내역

## v0.6 (2026-07-04)

### 추가

- Palette 색상 삭제 기능
- Undo History 구조
- Future 구조
- saveHistory() 함수

### 변경

- usePattern 구조 개선
- PatternEngine removeColor() 구현
- 새 도안 생성 시 History 초기화

### 리팩토링

- 모든 편집 기능이 동일한 흐름을 사용하도록 수정

Canvas
↓

saveHistory()

↓

PatternEngine

↓

setPattern()