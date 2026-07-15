// ======================================================
// BackgroundLayer
// Version : v2.0
//
// 역할
// 1. Canvas 배경 초기화
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";

import { CELL_SIZE } from "../../CanvasConstants";

export function drawBackground(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const { pattern } = state;

    ctx.clearRect(

        0,

        0,

        pattern.width * CELL_SIZE,

        pattern.height * CELL_SIZE

    );

}