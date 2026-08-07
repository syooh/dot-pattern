import json
import numpy as np


print("✅ json_exporter 실행됨")

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

    palette = [

    "#FFFFFF",

    "#000000"

    ]

    color_to_index = {

        (255, 255, 255): 0,

        (0, 0, 0): 1

    }

    pixels = []

    for y in range(height):

        row = []

        for x in range(width):

            color = tuple(
                img_array[y, x]
            )

            if color not in color_to_index:

                color_to_index[color] = len(palette)

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

    colors = [

        {

            "hex": "#FFFFFF",

            "count": 0,

            "percent": 0

        },

        {

            "hex": "#000000",

            "count": 0,

            "percent": 0

        }

    ]

    for color, count in color_data:

        hex_color = (
            '#%02x%02x%02x' % color
        )

        percent = round(
            (count / total_pixels) * 100,
            2
        )

        if hex_color.upper() == "#FFFFFF":

            colors[0]["count"] = count

            colors[0]["percent"] = percent

        elif hex_color.upper() == "#000000":

            colors[1]["count"] = count

            colors[1]["percent"] = percent

        else:

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