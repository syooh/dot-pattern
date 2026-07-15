import type { CanvasRenderState } from "../CanvasRenderState";

import {

    CELL_SIZE,

    GRID_INTERVAL

} from "../../CanvasConstants";

import { CanvasTheme } from "../../CanvasTheme";

// ======================================================
// Grid Layer
// ======================================================

export function drawGrid(

    ctx: CanvasRenderingContext2D,

    state: CanvasRenderState

) {

    const { pattern } = state;

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

            x * CELL_SIZE,

            0

        );

        ctx.lineTo(

            x * CELL_SIZE,

            pattern.height * CELL_SIZE

        );

        ctx.stroke();

    }

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

            y * CELL_SIZE

        );

        ctx.lineTo(

            pattern.width * CELL_SIZE,

            y * CELL_SIZE

        );

        ctx.stroke();

    }

}