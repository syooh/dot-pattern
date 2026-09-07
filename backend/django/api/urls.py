from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import hello_api, register_api, me_api


urlpatterns = [
    # DRF 테스트 API
    path("hello/", hello_api, name="hello-api"),

    # 회원가입 API
    path("auth/register/", register_api, name="register-api"),

    # JWT 로그인
    path(
        "auth/login/",
        TokenObtainPairView.as_view(),
        name="token-obtain-pair",
    ),

    # Access Token 갱신
    path(
        "auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token-refresh",
    ),

    path(
    "auth/me/",
    me_api,
    name="me-api",
    ),
]