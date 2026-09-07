from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Pattern(models.Model):
    """
    사용자가 생성하고 저장한 도안 정보를 관리하는 모델입니다.

    실제 도안 데이터는 기존 React에서 사용하는 PatternData 구조를
    그대로 JSON 형태로 저장합니다.
    """

    # 도안을 생성한 사용자입니다.
    # User 1명은 여러 개의 Pattern을 가질 수 있습니다.
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="patterns",
    )

    # 사용자가 지정한 도안 이름입니다.
    title = models.CharField(
        max_length=100,
    )

    # 도안의 가로 크기입니다.
    width = models.PositiveIntegerField()

    # 도안의 세로 크기입니다.
    height = models.PositiveIntegerField()

    # 다른 사용자에게 공개할지 여부입니다.
    is_public = models.BooleanField(
        default=False,
    )

    # 기존 PatternData 전체를 JSON 형태로 저장합니다.
    #
    # 예:
    # {
    #     "width": 40,
    #     "height": 30,
    #     "palette": [...],
    #     "pixels": [...]
    # }
    pattern_data = models.JSONField()

    # 도안을 처음 저장한 시간입니다.
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    # 도안을 마지막으로 수정한 시간입니다.
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        # 최신 수정 도안부터 조회하도록 기본 정렬을 설정합니다.
        ordering = ["-updated_at"]

    def __str__(self):
        """
        Django Admin 등에서 Pattern을 표시할 때
        도안 제목이 보이도록 합니다.
        """
        return self.title