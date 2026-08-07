from io import BytesIO

from PIL import Image

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from generator import generate_pattern

app = FastAPI()

# React 연결 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate(
    image: UploadFile = File(...),
    width: int = Form(...),
    height: int | None = Form(None),
    colors: int = Form(...),
):
    contents = await image.read()

    pil_image = Image.open(BytesIO(contents))

    if height is not None and height <= 0:

        height = None

    result = generate_pattern(

        image=pil_image,

        target_width=width,

        target_height=height,

        colors=colors
    )

    palette = [

    {

        "id": 0,

        "name": "White",

        "hex": "#FFFFFF"

    },

    {

        "id": 1,

        "name": "Black",

        "hex": "#000000"

    }

    ]

    color_to_new_id = {

        "#FFFFFF": 0,

        "#000000": 1

    }

    next_id = 2

    for color, _ in result["palette"]:

        hex_color = "#%02x%02x%02x" % color

        if hex_color.upper() in color_to_new_id:

            continue

        color_to_new_id[hex_color.upper()] = next_id

        palette.append({

            "id": next_id,

            "name": f"Color {next_id}",

            "hex": hex_color

        })

        next_id += 1

        new_pixels = []

    for row in result["pixels"]:

        new_row = []

        for color_index in row:

            color = result["palette"][color_index][0]

            hex_color = "#%02x%02x%02x" % color

            new_row.append(

                color_to_new_id[hex_color.upper()]

            )

        new_pixels.append(new_row)

    return {

        "width": result["width"],

        "height": result["height"],

        "palette": palette,

        "pixels": new_pixels

    }