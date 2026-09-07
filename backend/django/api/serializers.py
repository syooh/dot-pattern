from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    """
    회원가입 요청 데이터를 검증하고
    Django User 객체를 생성하는 Serializer입니다.
    """

    # 비밀번호는 응답에 포함되지 않도록 write_only로 설정합니다.
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    # 회원가입 시 비밀번호 확인을 위해 사용하는 필드입니다.
    password_confirm = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User

        # 회원가입에 사용할 필드만 정의합니다.
        fields = [
            "username",
            "password",
            "password_confirm",
        ]

    def validate(self, attrs):
        """
        입력한 두 비밀번호가 같은지 확인합니다.
        """

        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {
                    "password_confirm": "비밀번호가 일치하지 않습니다."
                }
            )

        return attrs

    def create(self, validated_data):
        """
        검증이 완료된 데이터를 이용해 User를 생성합니다.

        create_user()를 사용하기 때문에
        비밀번호가 평문으로 저장되지 않고 Django의
        비밀번호 해싱 방식으로 저장됩니다.
        """

        # 비밀번호 확인용 필드는 User 생성에 필요하지 않습니다.
        validated_data.pop("password_confirm")

        # Django가 비밀번호를 안전하게 해싱하여 User를 생성합니다.
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )

        return user

class UserSerializer(serializers.ModelSerializer):
    """
    현재 로그인한 사용자 정보를 반환하기 위한 Serializer입니다.

    비밀번호와 같은 민감한 정보는 반환하지 않습니다.
    """

    class Meta:
        model = User

        # 클라이언트에 보여줄 사용자 정보만 지정합니다.
        fields = [
            "id",
            "username",
        ]