// ======================================================
// CanvasDrawer
// Version : v1.1
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas 초기화
// 2. Pixel 출력
// 3. Grid 출력
// 4. Canvas 전체 그리기
// ======================================================

import type { PatternData } from "../../types/Pattern";
import { CELL_SIZE, GRID_INTERVAL } from "./CanvasConstants";
import { CanvasTheme } from "./CanvasTheme";
import { cellToPixel } from "./CanvasUtils";


// ======================================================
// Canvas 초기화
// ======================================================

export function clearCanvas(

    ctx: CanvasRenderingContext2D,

    width: number,

    height: number

) {

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

}


// ======================================================
// Pixel 출력
// ======================================================

export function drawPixels(

    ctx: CanvasRenderingContext2D,

    pattern: PatternData

) {

    for (let y = 0; y < pattern.height; y++) {

        for (let x = 0; x < pattern.width; x++) {

            const color =

                pattern.palette[

                pattern.pixels[y][x]

                ];

            ctx.fillStyle = color.hex;

            ctx.fillRect(

                cellToPixel(x),

                cellToPixel(y),

                CELL_SIZE,

                CELL_SIZE

            );

        }

    }

}


// ======================================================
// Grid 출력
// ======================================================

export function drawGrid(

    ctx: CanvasRenderingContext2D,

    pattern: PatternData

) {

    // --------------------------
    // 세로선
    // --------------------------

    for (let x = 0; x <= pattern.width; x++) {

        const pixelX =

            cellToPixel(x);

        const bold =

            x !== 0 &&

            x % GRID_INTERVAL === 0;

        ctx.beginPath();

        ctx.lineWidth =

            bold ? 2 : 1;

        ctx.strokeStyle =

            bold

                ? CanvasTheme.boldGrid

                : CanvasTheme.grid;

        ctx.moveTo(

            pixelX,

            0

        );

        ctx.lineTo(

            pixelX,

            cellToPixel(pattern.height)

        );

        ctx.stroke();

    }

    // --------------------------
    // 가로선
    // --------------------------

    for (let y = 0; y <= pattern.height; y++) {

        const pixelY =

            cellToPixel(y);

        const bold =

            y !== 0 &&

            y % GRID_INTERVAL === 0;

        ctx.beginPath();

        ctx.lineWidth =

            bold ? 2 : 1;

        ctx.strokeStyle =

            bold

                ? CanvasTheme.boldGrid

                : CanvasTheme.grid;

        ctx.moveTo(

            0,

            pixelY

        );

        ctx.lineTo(

            cellToPixel(pattern.width),

            pixelY

        );

        ctx.stroke();

    }

}


// ======================================================
// Canvas 전체 출력
// ======================================================

export function drawCanvas(

    ctx: CanvasRenderingContext2D,

    pattern: PatternData

) {

    clearCanvas(

        ctx,

        cellToPixel(pattern.width),

        cellToPixel(pattern.height)

    );

    drawPixels(

        ctx,

        pattern

    );

    drawGrid(

        ctx,

        pattern

    );

}