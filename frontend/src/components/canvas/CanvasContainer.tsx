// ======================================================
// CanvasContainer
// Version : v1.1
// Last Update : 2026-07-15
//
// 역할
// 1. Header와 Canvas를 하나의 작업판으로 출력한다.
// ======================================================

import PatternCanvas from "./PatternCanvas";
import CanvasHeaderTop from "./CanvasHeaderTop";
import CanvasHeaderLeft from "./CanvasHeaderLeft";

import type { PatternData } from "../../types/Pattern";
import { HEADER_SIZE } from "./CanvasConstants";
import type { CameraState } from "./camera/CameraState";
import type { Selection } from "../../types/Selection";
import type { ToolType } from "../../types/Pattern";
import type { ClipboardData } from "../../types/Clipboard";

interface Props {

    pattern: PatternData;

    showGrid: boolean;
    
    camera: CameraState;

    hoverCell: {

        x: number;

        y: number;

    } | null;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

    onHoverChange: (

        cell: {

            x: number;

            y: number;

        } | null

    ) => void;

    selection: Selection | null;

    onSelectionChange: (

        selection: Selection | null

    ) => void;

    selectedTool: ToolType;

    isPasteMode: boolean;

    clipboard: ClipboardData | null;

}

export default function CanvasContainer({

    pattern,

    showGrid,

    camera,

    hoverCell,

    onPixelClick,

    onHoverChange,

    selection,

    onSelectionChange,

    selectedTool,

    isPasteMode,

    clipboard,

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

                    camera={camera}

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

                    camera={camera}

                />

                <PatternCanvas

                    pattern={pattern}

                    showGrid={showGrid}

                    camera={camera}

                    onPixelClick={onPixelClick}

                    onHoverChange={onHoverChange}

                    selection={selection}

                    onSelectionChange={onSelectionChange}

                    selectedTool={selectedTool}

                    isPasteMode={isPasteMode}

                    clipboard={clipboard}

                />

            </div>

        </div>

    );

}