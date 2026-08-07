from PIL import Image

from color_quantizer import quantize_colors_kmeans
from pattern_generator import (

    create_grid_pattern,

    create_pixel_data,

    count_colors
)
from image_utils import calculate_size


def generate_pattern(
        
    image: Image.Image,

    target_width: int,

    target_height: int | None,

    colors: int,
    
    cell_size: int = 15
):

    """
    이미지를 도안으로 변환한다.

    Parameters
    ----------
    image : PIL.Image
        업로드한 원본 이미지

    target_width : int
        목표 가로 크기

    target_height : int | None
        목표 세로 크기
        (None이면 비율 유지)

    colors : int
        사용할 색상 개수

    cell_size : int
        미리보기 PNG 셀 크기

    Returns
    -------
    dict
        Pattern 생성 결과
    """

    # -----------------------------
    # 크기 계산
    # -----------------------------

    width, height = calculate_size(

        image.width,
        image.height,

        target_width=target_width,

        target_height=target_height

    )

    # -----------------------------
    # Resize
    # -----------------------------

    image = image.resize(

        (width, height),

        Image.Resampling.NEAREST

    )

    # -----------------------------
    # Color Quantization
    # -----------------------------

    image = quantize_colors_kmeans(

        image,

        colors

    )

    # -----------------------------
    # Palette
    # -----------------------------

    color_data = count_colors(image)

    # -----------------------------
    # Pattern Preview
    # -----------------------------

    preview = create_grid_pattern(

        image,

        cell_size=cell_size

    )

    pixels = create_pixel_data(

    image,

    color_data

    )

    return {

        "image": image,

        "preview": preview,

        "palette": color_data,

        "pixels" : pixels,

        "width": width,

        "height": height

    }