// ======================================================
// CurrentRowLayer
//
// 역할
// 1. 현재 작업 중인 행 전체를 하이라이트한다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";
import { getCellSize } from "../../CanvasUtils";

export function drawCurrentRow(
    ctx: CanvasRenderingContext2D,
    state: CanvasRenderState
) {

    // 현재 작업 행이 없으면 표시하지 않는다.
    if (!state.currentRow) {
        return;
    }

    const cellSize = getCellSize(
        state.camera.zoom
    );

    // 실제 Canvas의 y 좌표로 변환
    // Row 1 = 맨 아래
    // Row가 증가할수록 위로 이동한다.
    const rowY =
        (state.pattern.height - state.currentRow) *
        cellSize;

    ctx.save();

    // 현재 작업 행을 붉은색 테두리로 표시
    ctx.strokeStyle = "rgba(74, 144, 226, 1)";
    ctx.lineWidth = 2;

    ctx.strokeRect(
        1,
        rowY + 1,
        state.pattern.width * cellSize - 2,
        cellSize - 2
    );

    ctx.restore();
}