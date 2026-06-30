def calculate_size(
    original_width,
    original_height,
    target_width=None,
    target_height=None
):
    """
    이미지 비율 유지

    사용 예시

    calculate_size(
        1200,
        800,
        target_width=100
    )

    calculate_size(
        1200,
        800,
        target_height=100
    )

    calculate_size(
        1200,
        800,
        target_width=100,
        target_height=150
    )
    """

    # 직접 입력

    if (
        target_width is not None
        and target_height is not None
    ):
        return (
            target_width,
            target_height
        )

    # 가로 기준

    if target_width is not None:

        ratio = (
            original_height /
            original_width
        )

        height = int(
            target_width * ratio
        )

        return (
            target_width,
            height
        )

    # 세로 기준

    if target_height is not None:

        ratio = (
            original_width /
            original_height
        )

        width = int(
            target_height * ratio
        )

        return (
            width,
            target_height
        )

    raise ValueError(
        "target_width 또는 target_height를 입력하세요."
    )