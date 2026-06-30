from PIL import Image

from color_quantizer import quantize_colors_kmeans

from pattern_generator import (
    create_grid_pattern,
    count_colors
)

from json_exporter import (
    image_to_pattern_json
)

from image_utils import calculate_size

from datetime import datetime
import uuid
import os
import shutil


# ======================
# 설정
# ======================

IMAGE_PATH = "backend/input/poster_house.png"

TARGET_WIDTH = 40
TARGET_HEIGHT = None

COLORS = 8

CELL_SIZE = 15


# ======================
# 이미지 불러오기
# ======================

img = Image.open(IMAGE_PATH)

WIDTH, HEIGHT = calculate_size(
    img.width,
    img.height,
    target_width=TARGET_WIDTH,
    target_height=TARGET_HEIGHT
)

print(
    f"원본 크기 : {img.width} x {img.height}"
)

print(
    f"변환 크기 : {WIDTH} x {HEIGHT}"
)

# ======================
# 크기 조절
# ======================

img = img.resize(
    (WIDTH, HEIGHT),
    Image.Resampling.NEAREST
)


# ======================
# 색상 압축
# ======================

img = quantize_colors_kmeans(
    img,
    COLORS
)


# ======================
# 색상표 계산
# ======================

color_data = count_colors(img)

total_pixels = WIDTH * HEIGHT

print("\n===== 색상표 =====\n")

for color, count in color_data:

    hex_color = '#%02x%02x%02x' % color

    percent = round(
        (count / total_pixels) * 100,
        2
    )

    print(
        f"{hex_color} | {count}칸 | {percent}%"
    )


# ======================
# 도안 생성
# ======================

pattern = create_grid_pattern(
    img,
    cell_size=CELL_SIZE
)


# ======================
# 파일명 생성
# ======================

timestamp = datetime.now().strftime(
    "%Y%m%d_%H%M%S"
)

uid = uuid.uuid4().hex[:6]

original_name = os.path.splitext(
    os.path.basename(IMAGE_PATH)
)[0]


# ======================
# PNG 저장
# ======================

png_filename = (
    f"{original_name}_{timestamp}_{uid}.png"
)

png_path = (
    f"backend/output/{png_filename}"
)

pattern.save(png_path)

print("\n===================")
print(f"PNG 저장 완료 : {png_path}")
print("===================")


# ======================
# JSON 저장
# ======================

json_filename = (
    f"{original_name}_{timestamp}_{uid}.json"
)

json_path = (
    f"backend/output/{json_filename}"
)

image_to_pattern_json(
    img,
    json_path,
    color_data
)

print(
    f"JSON 저장 완료 : {json_path}"
)