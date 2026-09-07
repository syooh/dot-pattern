from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer, UserSerializer


@api_view(["GET"])
def hello_api(request):
    """
    Django REST Framework가 정상적으로 동작하는지 확인하기 위한
    간단한 테스트 API입니다.
    """

    return Response(
        {
            "message": "Hello, Dot Pattern Editor!",
            "status": "success",
        }
    )

@api_view(["GET"])
def hello_api(request):
    """
    Django REST Framework가 정상적으로 동작하는지 확인하기 위한
    간단한 테스트 API입니다.
    """
    return Response(
        {
            "message": "Hello, Dot Pattern Editor!",
            "status": "success",
        }
    )


@api_view(["POST"])
def register_api(request):
    """
    회원가입 API입니다.

    클라이언트에서 전달받은 username과 password를 검증한 후
    새로운 Django User를 생성합니다.
    """

    # 요청으로 전달받은 데이터를 Serializer에 전달합니다.
    serializer = RegisterSerializer(data=request.data)

    # 데이터가 유효하지 않으면 오류 내용을 반환합니다.
    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    # 검증된 데이터를 이용해 새로운 사용자를 생성합니다.
    user = serializer.save()

    # 회원가입 성공 응답을 반환합니다.
    return Response(
        {
            "message": "회원가입이 완료되었습니다.",
            "user": {
                "id": user.id,
                "username": user.username,
            },
        },
        status=status.HTTP_201_CREATED,
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_api(request):
    """
    현재 로그인한 사용자 정보를 반환하는 API입니다.

    JWT 인증이 성공한 사용자만 접근할 수 있습니다.
    """

    # JWT 인증을 통해 확인된 현재 사용자를 반환합니다.
    serializer = UserSerializer(request.user)

    return Response(serializer.data)