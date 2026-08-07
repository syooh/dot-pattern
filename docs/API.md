# 🌐 API Documentation

Dot Pattern Editor의 Backend API 문서입니다.

현재는 FastAPI를 사용하며,
향후 Django REST Framework로 이전하더라도 동일한 API 형태를 유지하는 것을 목표로 합니다.

---

# Base URL

개발 환경

```
http://localhost:8000
```

예정

```
https://api.dotpattern.com
```

---

# API 목록

| Method | URL | 설명 |
|---------|-----|------|
| POST | /generate | 이미지를 도안으로 변환 |
| GET | /health | 서버 상태 확인 |
| POST | /save | 도안 저장 (예정) |
| GET | /project/{id} | 도안 불러오기 (예정) |
| PUT | /project/{id} | 도안 수정 (예정) |
| DELETE | /project/{id} | 도안 삭제 (예정) |

---

# 1. Generate Pattern

이미지를 업로드하여 PatternData를 생성합니다.

```
POST /generate
```

---

## Request

Content-Type

```
multipart/form-data
```

### Parameters

| Name | Type | Required | 설명 |
|------|------|----------|------|
| image | File | ✅ | 업로드 이미지 |
| width | Integer | ✅ | 도안 가로 |
| height | Integer / null | ❌ | 도안 세로 (null이면 비율 유지) |
| colors | Integer | ✅ | 색상 개수 |

---

### Example

```
image : flower.png

width : 80

height : null

colors : 24
```

---

## Response

```json
{
    "width":80,
    "height":53,

    "palette":[
        {
            "id":0,
            "name":"White",
            "hex":"#FFFFFF"
        },
        {
            "id":1,
            "name":"Black",
            "hex":"#000000"
        }
    ],

    "pixels":[
        [0,0,0],
        [1,1,1]
    ]
}
```

---

## Status Code

| Code | 설명 |
|------|------|
| 200 | 성공 |
| 400 | 잘못된 요청 |
| 415 | 이미지 형식 오류 |
| 500 | 서버 오류 |

---

# 2. Health Check

서버 실행 여부 확인

```
GET /health
```

---

## Response

```json
{
    "status":"ok"
}
```

---

# 예정 API

---

# Save Project

```
POST /project
```

도안을 서버에 저장합니다.

---

## Request

```json
{
    "title":"My Pattern",

    "pattern":{
        ...
    }
}
```

---

## Response

```json
{
    "projectId":15
}
```

---

# Load Project

```
GET /project/{id}
```

---

## Response

```json
{
    "projectId":15,

    "title":"My Pattern",

    "pattern":{
        ...
    }
}
```

---

# Update Project

```
PUT /project/{id}
```

---

# Delete Project

```
DELETE /project/{id}
```

---

# PatternData Schema

```json
{
    "width":80,

    "height":50,

    "palette":[

        {
            "id":0,

            "name":"White",

            "hex":"#FFFFFF"
        }

    ],

    "pixels":[]
}
```

---

## PatternData

| Field | Type | 설명 |
|--------|------|------|
| width | Integer | 도안 가로 |
| height | Integer | 도안 세로 |
| palette | Array | 색상 목록 |
| pixels | 2D Array | 픽셀 데이터 |

---

## Palette

| Field | Type |
|--------|------|
| id | Integer |
| name | String |
| hex | String |

---

# 오류 응답

```json
{
    "detail":"Invalid image."
}
```

---

# Backend 처리 과정

```
Image

↓

Upload

↓

FastAPI

↓

Pillow

↓

Resize

↓

Color Quantizer

↓

Pattern Generator

↓

PatternData

↓

Response
```

---

# Frontend 호출 흐름

```
ImportImagePanel

↓

fetch()

↓

POST /generate

↓

Response

↓

PatternData

↓

setPattern()

↓

Canvas Rendering
```

---

# 향후 인증

Django 적용 시

```
POST /login

POST /logout

POST /signup

GET /me
```

JWT 인증을 사용할 예정입니다.

---

# 향후 Project API

```
POST /project

GET /project

GET /project/{id}

PUT /project/{id}

DELETE /project/{id}
```

---

# 향후 Export API

```
POST /export/png

POST /export/pdf

POST /export/json
```

---

# API 설계 원칙

- REST API 사용
- JSON 기반 응답
- PatternData를 공통 데이터 구조로 사용
- Frontend와 Backend를 독립적으로 유지
- FastAPI → Django 전환 시 URL 유지