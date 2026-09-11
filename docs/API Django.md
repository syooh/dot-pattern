# Django REST API

Dot Pattern Editor의 사용자 인증 및 Pattern 저장/관리를 담당하는 Django REST Framework API 문서입니다.

---

## 1. API 개요

### Backend

* Framework: Django
* API Framework: Django REST Framework
* Authentication: JWT
* Database: MySQL
* JWT Library: djangorestframework-simplejwt

### Base URL

```text
http://127.0.0.1:8001/api
```

### API 구조

```text
/api
├── /hello/
│
├── /auth/
│   ├── /register/
│   ├── /login/
│   ├── /token/refresh/
│   └── /me/
│
└── /patterns/
    ├── /
    ├── /<id>/
    ├── /public/
    └── /public/<id>/
```

---

# 2. 인증 API

## 2.1 회원가입

### `POST /auth/register/`

새로운 사용자를 생성합니다.

### 인증

불필요

### Request

```json
{
    "username": "testuser",
    "password": "password123"
}
```

### Response

```json
{
    "message": "회원가입이 완료되었습니다."
}
```

### 주요 처리

* Django User 생성
* 비밀번호는 Django의 비밀번호 해시 방식으로 저장
* 회원가입 후 로그인 API를 통해 JWT 발급

---

## 2.2 로그인

### `POST /auth/login/`

사용자 인증 후 Access Token과 Refresh Token을 발급합니다.

### 인증

불필요

### Request

```json
{
    "username": "testuser",
    "password": "password123"
}
```

### Response

```json
{
    "access": "<JWT Access Token>",
    "refresh": "<JWT Refresh Token>"
}
```

### Token 역할

| Token         | 용도              |
| ------------- | --------------- |
| Access Token  | 인증이 필요한 API 요청  |
| Refresh Token | Access Token 갱신 |

Access Token은 Pattern CRUD 등 인증이 필요한 요청의 `Authorization` Header에 사용합니다.

```http
Authorization: Bearer <Access Token>
```

SimpleJWT는 JWT를 HTTP 요청의 인증 정보로 사용하는 DRF 인증 방식을 제공합니다.

---

## 2.3 Access Token 갱신

### `POST /auth/token/refresh/`

만료되었거나 만료가 임박한 Access Token을 Refresh Token을 이용하여 갱신합니다.

### 인증

Refresh Token 필요

### Request

```json
{
    "refresh": "<JWT Refresh Token>"
}
```

### Response

```json
{
    "access": "<New JWT Access Token>"
}
```

---

## 2.4 현재 사용자 정보 조회

### `GET /auth/me/`

현재 로그인한 사용자의 정보를 조회합니다.

### 인증

필요

```http
Authorization: Bearer <Access Token>
```

### Response

```json
{
    "id": 1,
    "username": "testuser"
}
```

### 권한

Access Token에 포함된 사용자 정보를 기준으로 현재 로그인 사용자를 확인합니다.

---

# 3. Pattern API

Pattern API는 로그인한 사용자가 자신의 Pattern을 저장하고 관리할 수 있도록 제공합니다.

## Pattern 데이터 구조

```json
{
    "title": "꽃 도안",
    "width": 2,
    "height": 2,
    "is_public": false,
    "pattern_data": {
        "width": 2,
        "height": 2,
        "palette": [
            {
                "id": 0,
                "name": "Black",
                "hex": "#000000"
            },
            {
                "id": 1,
                "name": "White",
                "hex": "#FFFFFF"
            }
        ],
        "pixels": [
            [0, 1],
            [1, 0]
        ]
    }
}
```

---

# 4. 내 Pattern 목록 조회

### `GET /patterns/`

현재 로그인한 사용자가 저장한 Pattern 목록을 조회합니다.

### 인증

필요

```http
Authorization: Bearer <Access Token>
```

### Response

```json
[
    {
        "id": 1,
        "title": "꽃 도안",
        "width": 2,
        "height": 2,
        "is_public": false,
        "pattern_data": {
            "width": 2,
            "height": 2,
            "palette": [],
            "pixels": []
        },
        "created_at": "2026-09-10T10:00:00Z",
        "updated_at": "2026-09-10T10:00:00Z"
    }
]
```

### 권한

사용자 본인이 소유한 Pattern만 반환합니다.

```python
Pattern.objects.filter(owner=self.request.user)
```

따라서 다른 사용자의 Pattern은 목록에 포함되지 않습니다.

---

# 5. Pattern 생성

### `POST /patterns/`

현재 로그인한 사용자의 Pattern을 생성합니다.

### 인증

필요

### Request

```json
{
    "title": "꽃 도안",
    "width": 2,
    "height": 2,
    "is_public": false,
    "pattern_data": {
        "width": 2,
        "height": 2,
        "palette": [],
        "pixels": [
            [0, 1],
            [1, 0]
        ]
    }
}
```

### Response

```json
{
    "id": 1,
    "title": "꽃 도안",
    "width": 2,
    "height": 2,
    "is_public": false,
    "pattern_data": {
        "width": 2,
        "height": 2,
        "palette": [],
        "pixels": [
            [0, 1],
            [1, 0]
        ]
    },
    "created_at": "2026-09-10T10:00:00Z",
    "updated_at": "2026-09-10T10:00:00Z"
}
```

### 소유자 처리

클라이언트가 `owner` 값을 직접 전달하지 않습니다.

서버에서 인증된 사용자를 기준으로 자동 지정합니다.

```python
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
```

---

# 6. Pattern 상세 조회

### `GET /patterns/<id>/`

특정 Pattern을 조회합니다.

### 인증

필요

### 예시

```text
GET /api/patterns/1/
```

### 권한

자신이 소유한 Pattern만 조회할 수 있습니다.

다른 사용자의 Pattern ID를 요청하더라도 해당 사용자의 Pattern이 반환되지 않습니다.

---

# 7. Pattern 전체 수정

### `PUT /patterns/<id>/`

특정 Pattern의 데이터를 수정합니다.

### 인증

필요

### Request

```json
{
    "title": "수정된 꽃 도안",
    "width": 2,
    "height": 2,
    "is_public": true,
    "pattern_data": {
        "width": 2,
        "height": 2,
        "palette": [],
        "pixels": [
            [1, 1],
            [0, 0]
        ]
    }
}
```

---

# 8. Pattern 부분 수정

### `PATCH /patterns/<id>/`

Pattern의 일부 데이터만 수정합니다.

예를 들어 제목만 변경할 수 있습니다.

### Request

```json
{
    "title": "새로운 제목"
}
```

Pattern 전체 데이터를 다시 전달하지 않아도 필요한 필드만 수정할 수 있습니다.

---

# 9. Pattern 삭제

### `DELETE /patterns/<id>/`

현재 사용자가 소유한 Pattern을 삭제합니다.

### 인증

필요

### 예시

```text
DELETE /api/patterns/1/
```

### 권한

본인의 Pattern만 삭제할 수 있습니다.

다른 사용자의 Pattern은 삭제할 수 없습니다.

---

# 10. Public Pattern 목록

### `GET /patterns/public/`

공개 설정된 Pattern 목록을 조회합니다.

### 인증

불필요

### Response

```json
[
    {
        "id": 1,
        "title": "꽃 도안",
        "width": 20,
        "height": 20,
        "is_public": true,
        "pattern_data": {},
        "created_at": "2026-09-10T10:00:00Z",
        "updated_at": "2026-09-10T10:00:00Z"
    }
]
```

### 조회 조건

```python
Pattern.objects.filter(is_public=True)
```

`is_public`이 `false`인 Pattern은 Public API에서 반환되지 않습니다.

### 인증

불필요

즉, 로그인하지 않은 사용자도 공개된 Pattern을 조회할 수 있습니다.

---

# 11. Public Pattern 상세 조회

### `GET /patterns/public/<id>/`

공개된 특정 Pattern을 조회합니다.

### 인증

불필요

### 예시

```text
GET /api/patterns/public/1/
```

### 접근 조건

```text
is_public = true
```

인 Pattern만 조회할 수 있습니다.

Private Pattern을 요청하면 조회할 수 없습니다.

---

# 12. Pattern 데이터 검증

Pattern 저장 및 수정 시 Serializer에서 Pattern 데이터의 유효성을 검사합니다.

## width / height

```text
width >= 1
height >= 1
```

0 이하의 값은 허용하지 않습니다.

---

## PatternData 크기

Pattern 모델의 `width`, `height`와 `pattern_data` 내부의 크기가 일치해야 합니다.

```text
Pattern.width
    =
PatternData.width

Pattern.height
    =
PatternData.height
```

---

## pixels 행 개수

```text
pixels.length === height
```

---

## pixels 열 개수

각 행의 길이는 Pattern의 width와 일치해야 합니다.

```text
pixels[row].length === width
```

예를 들어:

```json
{
    "width": 3,
    "height": 2,
    "pattern_data": {
        "width": 3,
        "height": 2,
        "pixels": [
            [0, 1, 2],
            [2, 1, 0]
        ]
    }
}
```

와 같이 Pattern 크기와 Pixel 배열의 크기가 일치해야 합니다.

---

# 13. 권한 구조

Pattern API는 사용자 소유권을 기준으로 접근을 제한합니다.

```text
                  Pattern API
                       │
             ┌─────────┴─────────┐
             │                   │
        인증 필요 API        Public API
             │                   │
             ▼                   ▼
       로그인 사용자          누구나 조회
             │                   │
             ▼                   ▼
       자신의 Pattern       is_public=True
             │
      ┌──────┼──────┐
      ▼      ▼      ▼
     GET    PUT    DELETE
```

### 접근 권한 정리

| 요청            | 비로그인 | 본인 Pattern | 다른 사용자 Private | 다른 사용자 Public |
| ------------- | ---: | ---------: | -------------: | ------------: |
| 내 Pattern API |    ❌ |          ✅ |              ❌ |             ❌ |
| Public 목록     |    ✅ |          - |              - |             ✅ |
| Public 상세     |    ✅ |          - |              ❌ |             ✅ |

---

# 14. 주요 HTTP 상태 코드

| 상태 코드              | 의미        | 주요 상황                               |
| ------------------ | --------- | ----------------------------------- |
| `200 OK`           | 요청 성공     | 조회, 수정                              |
| `201 Created`      | 리소스 생성 성공 | Pattern 생성, 회원가입                    |
| `204 No Content`   | 삭제 성공     | Pattern 삭제                          |
| `400 Bad Request`  | 잘못된 요청    | 잘못된 Pattern 데이터                     |
| `401 Unauthorized` | 인증 필요     | JWT 없음 또는 만료                        |
| `404 Not Found`    | 리소스 없음    | 존재하지 않는 Pattern 또는 접근할 수 없는 Pattern |

---

# 15. API 테스트

Django REST Framework의 테스트 기능을 사용하여 Pattern API의 주요 기능과 권한을 자동으로 검증했습니다.

현재 총 **18개의 테스트가 통과**했습니다.

```text
Found 18 test(s).
..................
----------------------------------------------------------------------
Ran 18 tests

OK
```

### 테스트 범위

#### CRUD

* Pattern 생성
* Pattern 목록 조회
* Pattern 상세 조회
* Pattern 수정
* Pattern 삭제

#### 인증 / 권한

* 비로그인 사용자의 Pattern 접근 차단
* 다른 사용자의 Pattern 조회 차단
* 다른 사용자의 Pattern 수정 차단
* 다른 사용자의 Pattern 삭제 차단

#### Public Pattern

* Public Pattern 목록 조회
* Public Pattern 상세 조회
* Private Pattern의 Public API 접근 차단
* 다른 사용자의 Public Pattern 조회

#### 데이터 검증

* 잘못된 width 차단
* 잘못된 height 차단
* pattern_data 누락 차단
* Pattern 크기와 pattern_data 크기 불일치 차단
* pixels 크기 오류 차단

---

# 16. Frontend 연동

React Frontend에서는 Django API를 별도의 API 모듈을 통해 호출합니다.

```text
frontend/src/api/djangoApi.ts
```

### 인증

```text
React
  │
  ├── 회원가입
  ├── 로그인
  ├── Token Refresh
  └── 현재 사용자 확인
          │
          ▼
      Django API
```

### Pattern

```text
React Editor
     │
     ▼
djangoApi.ts
     │
     ▼
Django REST API
     │
     ▼
MySQL
```

이를 통해 기존 FastAPI의 이미지 변환 기능과 Django의 사용자/Pattern 관리 기능을 분리하여 유지합니다.

---

# 17. Backend 역할 분리

Dot Pattern Editor는 두 개의 Backend를 함께 사용합니다.

```text
                    React
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      FastAPI                  Django
      :8000                    :8001
          │                       │
          ▼                       ▼
   Image → PatternData       User / Pattern
                                  │
                                  ▼
                                MySQL
```

### FastAPI

```text
POST /generate
```

* 이미지 업로드
* 이미지 색상 분석
* 색상 수 감소
* PatternData 생성

### Django

```text
/api/auth/*
/api/patterns/*
```

* 회원가입
* 로그인
* JWT 인증
* 사용자 정보
* Pattern 저장
* Pattern 조회
* Pattern 수정
* Pattern 삭제
* Public Pattern 조회

두 Backend의 역할을 분리하여 기존 이미지 변환 기능을 유지하면서 사용자별 Pattern 관리 기능을 추가했습니다.
