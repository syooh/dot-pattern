from django.urls import path

from .views import (
    PatternDetailView,
    PatternListCreateView,
    PublicPatternListView,
    PublicPatternDetailView,
)


urlpatterns = [
    # Pattern 목록 조회 / 생성
    path("", PatternListCreateView.as_view(), name="pattern-list-create"),

    # 특정 Pattern 조회 / 수정 / 삭제
    path("<int:pk>/", PatternDetailView.as_view(), name="pattern-detail"),

    # 공개 Pattern 목록
    path("public/",PublicPatternListView.as_view(),name="public-pattern-list",),

    # 공개 Pattern 상세
    path("public/<int:pk>/",PublicPatternDetailView.as_view(),name="public-pattern-detail",),
]