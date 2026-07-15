// ======================================================
// CanvasLayers
// Version : v1.0
//
// 역할
// Canvas에서 사용하는 Layer를 관리한다.
// ======================================================

import type { PatternData } from "../../types/Pattern";

import {

    CELL_SIZE,

    GRID_INTERVAL

} from "./CanvasConstants";

import { CanvasTheme } from "./CanvasTheme";


// ======================================================
// Background Layer
// ======================================================

export function drawBackground(

    ctx: CanvasRenderingContext2D,

    width: number,

    height: number

) {

    ctx.clearRect(

        0,

        0,

        width * CELL_SIZE,

        height * CELL_SIZE

    );

}


// ======================================================
// Pixel Layer
// ======================================================

export function drawPixels(

    ctx: CanvasRenderingContext2D,

    pattern: PatternData

) {

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

                x * CELL_SIZE,

                y * CELL_SIZE,

                CELL_SIZE,

                CELL_SIZE

            );

        }

    }

}