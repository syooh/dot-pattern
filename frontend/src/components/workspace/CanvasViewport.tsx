// ======================================================
// CanvasViewport
// Version : v1.1
// Last Update : 2026-09-02
//
// 역할
// 1. Canvas 작업 영역(Viewport)
// 2. Scroll 관리
// 3. Workspace 내부에서 Canvas를 왼쪽 기준으로 배치
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

    mode: "edit" | "view";

    currentRow: number;
    onCurrentRowChange: (row: number) => void;

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

    pastePreview: {

        x: number;

        y: number;

    } | null;

    onPastePreviewChange: (

        preview: {

            x: number;

            y: number;

        } | null

    ) => void;

    onMoveSelection: () => void;

}

export default function CanvasViewport({

    pattern,

    showGrid,

    mode,

    currentRow,
    onCurrentRowChange,

    camera,

    hoverCell,

    onPixelClick,

    onHoverChange,

    selection,

    onSelectionChange,

    selectedTool,

    isPasteMode,

    clipboard,

    pastePreview,

    onPastePreviewChange,

    onMoveSelection,

}: Props) {

    return (

        <div
            style={{

                width: "100%",

                flex: 1,

                minWidth: 0,

                minHeight: 0,

                overflowX: "auto",

                overflowY: "auto",

                boxSizing: "border-box"

            }}
        >

            <div
                style={{

                    width: "max-content",

                    minWidth: "100%",

                    padding: 20,

                    background: "#ECECEC",

                    border: "1px solid #CCCCCC",

                    borderRadius: 10,

                    boxSizing: "border-box",

                    display: "flex",

                    justifyContent: "flex-start",

                    alignItems: "flex-start"

                }}
            >

                <CanvasContainer

                    pattern={pattern}

                    showGrid={showGrid}

                    mode={mode}

                    currentRow={currentRow}
                    onCurrentRowChange={onCurrentRowChange}

                    camera={camera}

                    hoverCell={hoverCell}

                    selectedTool={selectedTool}

                    selection={selection}

                    onSelectionChange={onSelectionChange}

                    onMoveSelection={onMoveSelection}

                    onPixelClick={onPixelClick}

                    onHoverChange={onHoverChange}

                    isPasteMode={isPasteMode}

                    clipboard={clipboard}

                    pastePreview={pastePreview}

                    onPastePreviewChange={onPastePreviewChange}

                />

            </div>

        </div>

    );

}