import type { CanvasRenderState } from "../CanvasRenderState";

import { GRID_INTERVAL } from "../../CanvasConstants";

import { getCellSize } from "../../CanvasUtils";
import { CanvasTheme } from "../../CanvasTheme";

// ======================================================
// Grid Layer
// ======================================================

export function drawGrid(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const { pattern } = state;

    const cellSize =
        getCellSize(
            state.camera.zoom
        );

    // =========================
    // Vertical Line
    // =========================

    for (

        let x = 0;

        x <= pattern.width;

        x++

    ) {

        ctx.beginPath();

        const bold =

            x !== 0 &&

            x % GRID_INTERVAL === 0;

        ctx.lineWidth =

            bold ? 2 : 1;

        ctx.strokeStyle =

            bold

                ? CanvasTheme.boldGrid

                : CanvasTheme.grid;

        ctx.moveTo(

            x * cellSize,

            0

        );

        ctx.lineTo(

            x * cellSize,

            pattern.height * cellSize

        );

        ctx.stroke();

    }

    // =========================
    // Horizontal Line
    // =========================

    for (

        let y = 0;

        y <= pattern.height;

        y++

    ) {

        ctx.beginPath();

        const bold =

            y !== 0 &&

            y % GRID_INTERVAL === 0;

        ctx.lineWidth =

            bold ? 2 : 1;

        ctx.strokeStyle =

            bold

                ? CanvasTheme.boldGrid

                : CanvasTheme.grid;

        ctx.moveTo(

            0,

            y * cellSize

        );

        ctx.lineTo(

            pattern.width * cellSize,

            y * cellSize

        );

        ctx.stroke();

    }

}