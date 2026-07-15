// ======================================================
// HoverLayer
// Version : v1.0
//
// 역할
// 1. 현재 마우스가 위치한 Cell을 표시한다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";

import { CELL_SIZE } from "../../CanvasConstants";

export function drawHover(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const hover = state.hoverCell;

    if (!hover) {

        return;

    }

    ctx.save();

    ctx.fillStyle = "rgba(80,140,255,0.18)";

    ctx.fillRect(

        hover.x * CELL_SIZE,

        hover.y * CELL_SIZE,

        CELL_SIZE,

        CELL_SIZE

    );

    ctx.strokeStyle = "#4F8CFF";

    ctx.lineWidth = 2;

    ctx.strokeRect(

        hover.x * CELL_SIZE,

        hover.y * CELL_SIZE,

        CELL_SIZE,

        CELL_SIZE

    );

    ctx.restore();

}