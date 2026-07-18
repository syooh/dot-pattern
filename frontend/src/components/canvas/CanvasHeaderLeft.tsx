// ======================================================
// CanvasHeaderLeft
// Version : v0.9
// Last Update : 2026-07-14
//
// 역할
// 1. Canvas의 좌측 번호를 출력한다.
// ======================================================

import type { CameraState } from "./camera/CameraState";
import { HEADER_SIZE, GRID_INTERVAL } from "./CanvasConstants";
import { CanvasTheme } from "./CanvasTheme";
import { getCellSize } from "./CanvasUtils";

interface Props {

    height: number;

    hoverCell?: {

        x: number;

        y: number;

    } | null;

    camera: CameraState;

}

export default function CanvasHeaderLeft({

    height,

    hoverCell,
    
    camera

}: Props) {

    const cellSize = getCellSize(camera.zoom);

    return (

        <div
            style={{

                width: HEADER_SIZE,

            }}
        >

            {

                Array.from({

                    length: height

                }).map((_, index) => (

                    <div

                        key={index}

                        style={{

                            width: HEADER_SIZE,

                            height: cellSize,

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            fontSize: 12,

                            fontWeight:

                                hoverCell?.y === index

                                    ? 700

                                    : 500,
                            
                            color: CanvasTheme.headerText,

                            background:

                                hoverCell?.y === index

                                    ? "#DCEEFF"

                                    : CanvasTheme.headerBackground,

                            borderBottom:

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