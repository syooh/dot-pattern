from rest_framework import serializers

from .models import Pattern


class PatternSerializer(serializers.ModelSerializer):
    """
    Pattern 모델과 API 요청/응답 데이터를 연결하는 Serializer입니다.

    PatternData는 JSON 형태로 그대로 저장하기 때문에
    pattern_data 필드는 JSONField를 그대로 사용합니다.
    """

    class Meta:
        model = Pattern

        # API에서 사용할 Pattern 필드입니다.
        fields = [
            "id",
            "title",
            "width",
            "height",
            "is_public",
            "pattern_data",
            "created_at",
            "updated_at",
        ]

        # 서버에서 자동으로 관리해야 하는 필드입니다.
        #
        # owner:
        #   JWT로 인증된 request.user를 사용해야 하므로
        #   클라이언트가 직접 지정하지 않습니다.
        #
        # id:
        #   Django가 자동으로 생성합니다.
        #
        # created_at / updated_at:
        #   Django가 자동으로 관리합니다.
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]