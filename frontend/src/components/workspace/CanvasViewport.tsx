// ======================================================
// CanvasViewport
// Version : v1.0
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas 작업 영역(Viewport)
// 2. Scroll 관리
// 3. Zoom 기능이 추가될 영역
// ======================================================

import type { PatternData } from "../../types/Pattern";
import type { CameraState } from "../canvas/camera/CameraState";
import type { Selection } from "../../types/Selection";
import type { ToolType } from "../../types/Pattern";
import type { ClipboardData } from "../../types/Clipboard";

import CanvasContainer from "../canvas/CanvasContainer";

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

export default function CanvasViewport({

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

                marginTop: 25,

                display: "flex",

                justifyContent: "center"

            }}

        >

            <div

                style={{

                    maxWidth: "100%",

                    maxHeight: "70vh",

                    overflow: "auto",

                    padding: 20,

                    background: "#ECECEC",

                    border: "1px solid #CCCCCC",

                    borderRadius: 10

                }}

            >

                <CanvasContainer

                    pattern={pattern}

                    showGrid={showGrid}

                    camera={camera}

                    hoverCell={hoverCell}

                    selectedTool={selectedTool}

                    selection={selection}

                    onSelectionChange={onSelectionChange}

                    onPixelClick={onPixelClick}

                    onHoverChange={onHoverChange}

                    isPasteMode={isPasteMode}

                    clipboard={clipboard}

                />

            </div>

        </div>

    );

}