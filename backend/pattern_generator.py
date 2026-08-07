from PIL import Image
from PIL import ImageDraw
from collections import Counter

def create_grid_pattern(
    image,
    cell_size=20
):
    width, height = image.size

    canvas = Image.new(
        "RGB",
        (
            width * cell_size,
            height * cell_size
        ),
        "white"
    )

    draw = ImageDraw.Draw(canvas)

    pixels = image.load()

    for y in range(height):
        for x in range(width):

            color = pixels[x, y]

            draw.rectangle(
                (
                    x * cell_size,
                    y * cell_size,
                    (x + 1) * cell_size,
                    (y + 1) * cell_size
                ),
                fill=color,
                outline="gray"
            )

    return canvas

# ==================================================
# Pixel Data 생성
# ==================================================

def create_pixel_data(

    image,

    color_data

):
    """
    이미지를 PatternData에서 사용하는

    pixels[][] 형태로 변환한다.
    """

    width, height = image.size

    pixels = image.load()

    # Palette 순서 유지
    palette = [

        color

        for color, _ in color_data

    ]

    pixel_data = []

    for y in range(height):

        row = []

        for x in range(width):

            color = pixels[x, y]

            color_id = palette.index(color)

            row.append(color_id)

        pixel_data.append(row)

    return pixel_data

def count_colors(image):
    """
    색상별 사용 횟수 계산
    """

    pixels = list(image.getdata())

    counter = Counter(pixels)

    return counter.most_common()