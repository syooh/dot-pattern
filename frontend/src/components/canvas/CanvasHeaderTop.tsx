// ======================================================
// CanvasHeaderTop
// Version : v0.9
// Last Update : 2026-07-14
//
// 역할
// 1. Canvas의 상단 번호를 출력한다.
// ======================================================

import { CELL_SIZE, HEADER_SIZE, GRID_INTERVAL } from "./CanvasConstants";
import { CanvasTheme } from "./CanvasTheme";
import { getCellSize } from "./CanvasUtils";
import type { CameraState } from "./camera/CameraState";

interface Props {

    width: number;

    hoverCell?: {

        x: number;

        y: number;

    } | null;

    camera: CameraState;

}

export default function CanvasHeaderTop({

    width,

    hoverCell,

    camera

}: Props) {

    const cellSize = getCellSize(camera.zoom);

    return (

        <div
            style={{

                display: "flex",

                height: HEADER_SIZE,

            }}
        >

            {

                Array.from({

                    length: width

                }).map((_, index) => (

                    <div

                        key={index}

                        style={{

                            width: cellSize,

                            height: HEADER_SIZE,

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            fontSize: 12,

                            fontWeight:

                                hoverCell?.x === index

                                    ? 700

                                    : 500,

                            color: CanvasTheme.headerText,

                            background:

                                hoverCell?.x === index

                                    ? "#DCEEFF"

                                    : CanvasTheme.headerBackground,

                            borderRight:

                                (index + 1) % GRID_INTERVAL === 0

                                    ? `2px solid ${CanvasTheme.boldGrid}`

                                    : `1px solid ${CanvasTheme.grid}`,

                            boxSizing: "border-box",

                            userSelect: "none"

                        }}

                    >

                        {index}

                    </div>

                ))

            }

        </div>

    );

}