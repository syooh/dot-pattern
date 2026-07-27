// ======================================================
// SelectionLayer
//
// 역할
// 선택 영역을 출력한다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";
import { getCellSize } from "../../CanvasUtils";

export function drawSelection(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    if (!state.selection) {

        return;

    }

    const cellSize =

        getCellSize(state.camera.zoom);

    const {

        startX,

        startY,

        endX,

        endY,

        offsetX = 0,

        offsetY = 0

    } = state.selection;

    const left =

        Math.min(startX, endX) +

        offsetX;

    const top =

        Math.min(startY, endY) +

        offsetY;

    const right =

        Math.max(startX, endX) +

        offsetX;

    const bottom =

        Math.max(startY, endY) +

        offsetY;
        
    ctx.save();

    ctx.strokeStyle = "#4F8CFF";

    ctx.lineWidth = 2;

    ctx.setLineDash([6, 4]);

    ctx.strokeRect(

        left * cellSize,

        top * cellSize,

        (right - left + 1) * cellSize,

        (bottom - top + 1) * cellSize

    );

    ctx.restore();

}