from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Pattern
from .serializers import PatternSerializer

# Create your views here.

class PatternListCreateView(generics.ListCreateAPIView):
    """
    Pattern 목록 조회 및 새로운 Pattern 생성을 처리합니다.

    GET:
        로그인한 사용자가 자신의 도안 목록을 조회합니다.

    POST:
        로그인한 사용자가 새로운 도안을 저장합니다.
    """

    serializer_class = PatternSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        현재 로그인한 사용자의 Pattern만 조회합니다.
        """

        return Pattern.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        """
        새로운 Pattern을 저장할 때
        owner를 클라이언트가 아닌 현재 로그인한 사용자로 지정합니다.
        """

        serializer.save(
            owner=self.request.user
        )
        
class PatternDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    하나의 Pattern을 조회, 수정, 삭제하는 API입니다.

    GET:
        특정 도안의 상세 정보를 조회합니다.

    PUT:
        특정 도안의 전체 정보를 수정합니다.

    PATCH:
        특정 도안의 일부 정보를 수정합니다.

    DELETE:
        특정 도안을 삭제합니다.
    """

    serializer_class = PatternSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        현재 로그인한 사용자의 Pattern만 대상으로 합니다.

        따라서 다른 사용자의 Pattern ID를 알고 있더라도
        해당 도안에 접근할 수 없습니다.
        """

        return Pattern.objects.filter(
            owner=self.request.user
        )

class PublicPatternListView(generics.ListAPIView):
    """
    공개된 Pattern 목록 조회 API

    로그인하지 않은 사용자도 접근할 수 있다.
    단, is_public=True인 Pattern만 조회한다.
    """

    serializer_class = PatternSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # 공개된 Pattern만 조회한다.
        return Pattern.objects.filter(is_public=True)


class PublicPatternDetailView(generics.RetrieveAPIView):
    """
    공개된 Pattern 상세 조회 API

    로그인하지 않은 사용자도 접근할 수 있다.
    단, is_public=True인 Pattern만 조회할 수 있다.
    """

    serializer_class = PatternSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # 공개된 Pattern만 접근할 수 있도록 제한한다.
        return Pattern.objects.filter(is_public=True)