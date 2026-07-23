// ======================================================
// Workspace
// 역할
// 1. Canvas 작업 영역
// ======================================================

import type { PatternData } from "../../types/Pattern";
import type { CameraState } from "../canvas/camera/CameraState";
import type { Selection } from "../../types/Selection";
import type { ToolType } from "../../types/Pattern";
import type { ClipboardData } from "../../types/Clipboard";

import CanvasViewport from "./CanvasViewport";

interface Props {

    pattern: PatternData;

    showGrid: boolean;

    camera:CameraState;

    hoverCell: {

        x: number;

        y: number;

    } | null;

    onHoverChange: (

        cell: {

            x: number;

            y: number;

        } | null

    ) => void;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

    selection: Selection | null;

    onSelectionChange: (

        selection: Selection | null

    ) => void;

    selectedTool: ToolType;

    isPasteMode: boolean;

    clipboard: ClipboardData | null;

}

export default function Workspace({

    pattern,

    showGrid,
    
    camera,

    hoverCell,

    onHoverChange,

    onPixelClick,

    selection,

    onSelectionChange,

    selectedTool,

    isPasteMode,

    clipboard

}: Props) {

    return (

        <div>

            <CanvasViewport

                pattern={pattern}

                showGrid={showGrid}

                camera={camera}

                hoverCell={hoverCell}

                onHoverChange={onHoverChange}

                onPixelClick={onPixelClick}

                selectedTool={selectedTool}

                selection={selection}

                onSelectionChange={onSelectionChange}

                isPasteMode={isPasteMode}
                
                clipboard={clipboard}

            />

        </div>

    );

}