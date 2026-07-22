// ======================================================
// PatternCanvas
// Version : v1.0
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas를 생성한다.
// 2. CanvasDrawer에게 그리기를 요청한다.
// 3. CanvasEvents를 연결한다.
//
// 실제 도안 수정은 PatternEngine이 담당한다.
// ======================================================

import { useEffect, useRef } from "react";

import type { PatternData } from "../../types/Pattern";

import { renderCanvas } from "./render/CanvasRenderer";

import { useCanvasEvents } from "./CanvasEvents";

import { getCanvasWidth, getCanvasHeight } from "./CanvasUtils";

import type { CameraState } from "./camera/CameraState";

import type { Selection } from "../../types/Selection";

import type { ToolType } from "../../types/Pattern";

interface Props {

    pattern: PatternData;

    showGrid: boolean;

    camera: CameraState;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

    onHoverChange?: (

        cell: {

            x: number;

            y: number;

        } | null

    ) => void;

    selectedTool: ToolType;

    selection: Selection | null;

    onSelectionChange: (

        selection: Selection | null

    ) => void;

}

export default function PatternCanvas({

    pattern,

    onPixelClick,

    onHoverChange,

    showGrid,

    camera,

    selectedTool,

    selection,

    onSelectionChange,


}: Props) {

    // ==================================================
    // Canvas 참조
    // ==================================================

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    // ==================================================
    // Canvas 이벤트
    // ==================================================

    const {

        hoverCell,

        handleMouseDown,

        handleMouseMove,

        handleMouseLeave,

        stopDrawing

    } = useCanvasEvents({

        onPixelClick,

        onHoverChange,

        camera,

        selectedTool,

        selection,

        onSelectionChange

    });

    // ==================================================
    // Canvas 다시 그리기
    // ==================================================

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas)
            return;

        const ctx = canvas.getContext("2d");

        if (!ctx)
            return;

        canvas.width =

            getCanvasWidth(

                pattern.width,

                camera.zoom

            );

        canvas.height =

            getCanvasHeight(

                pattern.height,

                camera.zoom

            );
            
        renderCanvas(

            ctx,

            {

                pattern,

                camera,

                hoverCell,

                selection,

                showGrid

            }

        );

    }, [pattern, hoverCell, selection, showGrid, camera]);

    // ==================================================
    // Render
    // ==================================================

    return (

        <canvas

            ref={canvasRef}

            onMouseDown={handleMouseDown}

            onMouseMove={handleMouseMove}

            onMouseUp={stopDrawing}

            onMouseLeave={handleMouseLeave}

            style={{
                display: "block"
            }}

        />

    );

}