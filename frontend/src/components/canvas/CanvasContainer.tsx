// ======================================================
// CanvasContainer
// Version : v1.1
// Last Update : 2026-07-15
//
// 역할
// 1. Header와 Canvas를 하나의 작업판으로 출력한다.
// ======================================================

import type { PatternData } from "../../types/Pattern";

import PatternCanvas from "./PatternCanvas";
import CanvasHeaderTop from "./CanvasHeaderTop";
import CanvasHeaderLeft from "./CanvasHeaderLeft";

import { HEADER_SIZE } from "./CanvasConstants";

interface Props {

    pattern: PatternData;

    hoverCell?: {

        x: number;

        y: number;

    } | null;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export default function CanvasContainer({

    pattern,

    onPixelClick

}: Props) {

    return (

        <div

            style={{

                display: "inline-block",

                background: "#FFFFFF",

                border: "1px solid #BDBDBD",

                borderRadius: 8,

                overflow: "hidden",

                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"

            }}

        >

            {/* ========================= */}
            {/* Header */}
            {/* ========================= */}

            <div

                style={{

                    display: "flex",

                    alignItems: "flex-start"

                }}

            >

                <div

                    style={{

                        width: HEADER_SIZE,

                        height: HEADER_SIZE,

                        background: "#F7F7F7"

                    }}

                />

                <CanvasHeaderTop

                    width={pattern.width}

                    hoverCell={hoverCell}

                />

            </div>

            {/* ========================= */}
            {/* Canvas */}
            {/* ========================= */}

            <div

                style={{

                    display: "flex",

                    alignItems: "flex-start"

                }}

            >

                <CanvasHeaderLeft

                    height={pattern.height}

                    hoverCell={hoverCell}

                />

                <PatternCanvas

                    pattern={pattern}

                    onPixelClick={onPixelClick}

                />

            </div>

        </div>

    );

}