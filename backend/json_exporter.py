import json
import numpy as np


def image_to_pattern_json(
        image,
        output_path,
        color_data
):
    """
    이미지를 도안 JSON으로 저장

    포함 내용
    - width
    - height
    - colors (색상표)
    - palette
    - pixels
    """

    img_array = np.array(image)

    height, width, _ = img_array.shape

    # =====================
    # palette 생성
    # =====================

    palette = []

    color_to_index = {}

    pixels = []

    for y in range(height):

        row = []

        for x in range(width):

            color = tuple(
                img_array[y, x]
            )

            if color not in color_to_index:

                color_to_index[color] = len(
                    palette
                )

                palette.append(
                    '#%02x%02x%02x' % color
                )

            row.append(
                color_to_index[color]
            )

        pixels.append(row)

    # =====================
    # 색상표 생성
    # =====================

    total_pixels = width * height

    colors = []

    for color, count in color_data:

        hex_color = (
            '#%02x%02x%02x' % color
        )

        percent = round(
            (count / total_pixels) * 100,
            2
        )

        colors.append(
            {
                "hex": hex_color,
                "count": count,
                "percent": percent
            }
        )

    # =====================
    # 최종 데이터
    # =====================

    data = {
        "width": width,
        "height": height,

        "colors": colors,

        "palette": palette,

        "pixels": pixels
    }

    # =====================
    # 저장
    # =====================

    with open(
            output_path,
            "w",
            encoding="utf-8"
    ) as f:

        json.dump(
            data,
            f,
            ensure_ascii=False,
            indent=4
        )

    return data