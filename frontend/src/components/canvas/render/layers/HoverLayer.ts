// ======================================================
// HoverLayer
// Version : v1.1
//
// 역할
// 1. 현재 마우스가 위치한 Cell을 표시한다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";

import { getCellSize } from "../../CanvasUtils";

export function drawHover(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const hover = state.hoverCell;

    if (!hover) {

        return;

    }

    const cellSize = getCellSize(state.camera.zoom);

    ctx.save();

    // =========================
    // Hover Background
    // =========================

    ctx.fillStyle = "rgba(80,140,255,0.18)";

    ctx.fillRect(

        hover.x * cellSize,

        hover.y * cellSize,

        cellSize,

        cellSize

    );

    // =========================
    // Hover Border
    // =========================

    ctx.strokeStyle = "#4F8CFF";

    ctx.lineWidth = 2;

    ctx.strokeRect(

        hover.x * cellSize,

        hover.y * cellSize,

        cellSize,

        cellSize

    );

    ctx.restore();

}