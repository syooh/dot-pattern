// ======================================================
// CanvasRenderer
// Version : v2.1
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas의 모든 Layer를 순서대로 출력한다.
//
// Layer 순서
// 1. Background
// 2. Pixels
// 3. Grid
// 4. Hover
// 5. Selection
// 6. Overlay
// ======================================================

import { drawBackground } from "./layers/BackgroundLayer";

import { drawPixels } from "./layers/PixelLayer";

import { drawGrid } from "./layers/GridLayer";

import { drawHover } from "./layers/HoverLayer";

// ======================================================
// Canvas Render
// ======================================================

import type { CanvasRenderState } from "./CanvasRenderState";

export function renderCanvas(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    drawBackground(

        ctx,

        state

    );

    drawPixels(

        ctx,

        state

    );

    if (

        state.showGrid !== false

    ) {

        drawGrid(

            ctx,

            state

        );

    }

    drawHover(

        ctx,

        state

    );

}