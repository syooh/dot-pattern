import type { PatternData } from "../types/Pattern";

export async function generatePattern(

    file: File,

    width: number,

    height: number | null,

    colors: number

): Promise<PatternData> {

    const formData = new FormData();

    formData.append("image", file);

    formData.append("width", width.toString());

    if (height !== null) {

        formData.append(

            "height",

            height.toString()

        );

    }

    formData.append(

        "colors",

        colors.toString()

    );

    const response = await fetch(

        "http://127.0.0.1:8000/generate",

        {

            method: "POST",

            body: formData

        }

    );

    if (!response.ok) {

        throw new Error(

            "Pattern Generate Failed"

        );

    }

    return await response.json();

}