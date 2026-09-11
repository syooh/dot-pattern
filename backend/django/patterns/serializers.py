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

    def validate(self, attrs):
        """
        Pattern 데이터 전체를 검증한다.

        생성 시에는 width / height / pattern_data를 모두 검증하고,
        부분 수정(PATCH)에서는 전달된 값만 검증한다.

        또한 Pattern 모델의 width / height와
        내부 pattern_data의 width / height가
        서로 다른 상태로 저장되지 않도록 검사한다.
        """

        # 현재 Pattern의 기존 값을 가져온다.
        # PATCH 요청에서는 전달되지 않은 값이 attrs에 없기 때문에
        # 기존 instance의 값을 사용해야 한다.
        current_width = getattr(self.instance, "width", None)
        current_height = getattr(self.instance, "height", None)

        width = attrs.get("width", current_width)
        height = attrs.get("height", current_height)

        # pattern_data가 요청에 포함되었는지 확인한다.
        pattern_data = attrs.get("pattern_data")

        # ------------------------------------------
        # width / height 기본값 검증
        # ------------------------------------------

        if width is not None and width <= 0:
            raise serializers.ValidationError(
                {"width": "width는 1 이상이어야 합니다."}
            )

        if height is not None and height <= 0:
            raise serializers.ValidationError(
                {"height": "height는 1 이상이어야 합니다."}
            )

        # ------------------------------------------
        # PATCH에서 pattern_data가 전달되지 않은 경우
        # ------------------------------------------

        # PATCH로 title만 수정하는 경우처럼
        # pattern_data가 요청에 없으면 여기서 검증을 종료한다.
        if "pattern_data" not in attrs:
            return attrs

        # ------------------------------------------
        # pattern_data 형식 검증
        # ------------------------------------------

        if pattern_data is None:
            raise serializers.ValidationError(
                {"pattern_data": "pattern_data는 필수입니다."}
            )

        if not isinstance(pattern_data, dict):
            raise serializers.ValidationError(
                {"pattern_data": "pattern_data는 객체 형태여야 합니다."}
            )

        # ------------------------------------------
        # pattern_data의 width / height 확인
        # ------------------------------------------

        pattern_width = pattern_data.get("width")
        pattern_height = pattern_data.get("height")

        if pattern_width is None:
            raise serializers.ValidationError(
                {"pattern_data": "pattern_data.width가 필요합니다."}
            )

        if pattern_height is None:
            raise serializers.ValidationError(
                {"pattern_data": "pattern_data.height가 필요합니다."}
            )

        if pattern_width != width:
            raise serializers.ValidationError(
                {
                    "pattern_data": (
                        "pattern_data.width와 Pattern width가 "
                        "일치하지 않습니다."
                    )
                }
            )

        if pattern_height != height:
            raise serializers.ValidationError(
                {
                    "pattern_data": (
                        "pattern_data.height와 Pattern height가 "
                        "일치하지 않습니다."
                    )
                }
            )

        # ------------------------------------------
        # pixels 존재 여부 확인
        # ------------------------------------------

        pixels = pattern_data.get("pixels")

        if pixels is None:
            raise serializers.ValidationError(
                {"pattern_data": "pattern_data.pixels가 필요합니다."}
            )

        if not isinstance(pixels, list):
            raise serializers.ValidationError(
                {"pattern_data": "pixels는 배열 형태여야 합니다."}
            )

        # ------------------------------------------
        # pixels의 높이 확인
        # ------------------------------------------

        if len(pixels) != height:
            raise serializers.ValidationError(
                {
                    "pattern_data": (
                        "pixels의 행 개수가 height와 "
                        "일치하지 않습니다."
                    )
                }
            )

        # ------------------------------------------
        # 각 행의 너비 확인
        # ------------------------------------------

        for row in pixels:
            if not isinstance(row, list):
                raise serializers.ValidationError(
                    {"pattern_data": "pixels의 각 행은 배열이어야 합니다."}
                )

            if len(row) != width:
                raise serializers.ValidationError(
                    {
                        "pattern_data": (
                            "pixels의 열 개수가 width와 "
                            "일치하지 않습니다."
                        )
                    }
                )

        return attrs