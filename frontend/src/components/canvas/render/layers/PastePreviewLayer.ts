// ======================================================
// PastePreviewLayer
//
// 역할
// 붙여넣기 위치를 미리 보여준다.
// ======================================================

import type { CanvasRenderState } from "../CanvasRenderState";
import { getCellSize } from "../../CanvasUtils";

export function drawPastePreview(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    if (

        !state.pastePreview ||

        !state.clipboard

    ) {

        return;

    }

    const cellSize =

        getCellSize(

            state.camera.zoom

        );

    ctx.save();

    ctx.fillStyle = "rgba(0,200,83,0.18)";

    ctx.strokeStyle = "#00C853";

    ctx.fillRect(

        state.pastePreview.x * cellSize,

        state.pastePreview.y * cellSize,

        state.clipboard.width * cellSize,

        state.clipboard.height * cellSize

    );

    ctx.lineWidth = 2;

    ctx.setLineDash([4, 4]);

    ctx.strokeRect(

        state.pastePreview.x * cellSize,

        state.pastePreview.y * cellSize,

        state.clipboard.width * cellSize,

        state.clipboard.height * cellSize

    );

    ctx.restore();

}