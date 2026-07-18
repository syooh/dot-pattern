// ======================================================
// PixelLayer
//
// 역할
// 1. 도안을 출력한다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";

import { getCellSize } from "../../CanvasUtils";

export function drawPixels(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const { pattern } = state;

    const cellSize = getCellSize(
        state.camera.zoom
    );

    for (

        let y = 0;

        y < pattern.height;

        y++

    ) {

        for (

            let x = 0;

            x < pattern.width;

            x++

        ) {

            const color =

                pattern.palette[

                pattern.pixels[y][x]

                ];

            ctx.fillStyle = color.hex;

            ctx.fillRect(

                x * cellSize,

                y * cellSize,

                cellSize,

                cellSize

            );

        }

    }

}