// ======================================================
// CanvasEvents
// Version : v1.0
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas 마우스 이벤트 처리
// 2. 드래그 상태 관리
// 3. 클릭 좌표 계산
// ======================================================

import { useState } from "react";
import { pixelToCell } from "./CanvasUtils";
import type { CameraState } from "./camera/CameraState";
import { usePaintEvents } from "./events/usePaintEvents";
import type { Selection } from "./../../types/Selection";
import type { ToolType } from "./../../types/Pattern";
import { useSelectionEvents } from "./events/useSelectionEvents";

interface Props {

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

    camera: CameraState;

    selectedTool: ToolType;

    selection: Selection | null;

    onSelectionChange: (

        selection: Selection | null

    ) => void;

    isPasteMode: boolean;

    onPastePreviewChange?: (

        preview: {

            x: number;

            y: number;

        } | null

    ) => void;

}

export function useCanvasEvents({

    onPixelClick,

    onHoverChange,

    camera,

    selectedTool,

    selection,

    onSelectionChange,

    isPasteMode,

    onPastePreviewChange

}: Props) {

    const [isDrawing, setIsDrawing] =

        useState(false);

    const [hoverCell, setHoverCell] =

        useState<{

            x: number;

            y: number;

        } | null>(null);

    const {

        paint,

        resetPaint

    } = usePaintEvents({

        onPixelClick
        

    });

    const {

        startSelection,

        updateSelection,

        clearSelection

    } = useSelectionEvents({

        selection,

        onSelectionChange

    });
    
    

    // =============================
    // Mouse → Cell
    // =============================

    function getCellPosition(

        event: React.MouseEvent<HTMLCanvasElement>

    ) {

        const rect =

            event.currentTarget.getBoundingClientRect();

        const x = pixelToCell(

            event.clientX - rect.left,

            camera.zoom

        );

        const y = pixelToCell(

            event.clientY - rect.top,

            camera.zoom

        );

        return { x, y };

    }

    // =============================
    // Mouse Down
    // =============================

    function handleMouseDown(

        event: React.MouseEvent<HTMLCanvasElement>

    ) {

        setIsDrawing(true);

        const {

            x,

            y

        } = getCellPosition(event);

        const cell = {

            x,

            y

        };

        setHoverCell(cell);

        onHoverChange?.(cell);

        // ===================================
        // Paste Mode
        // ===================================

        if (isPasteMode) {

            onPixelClick(

                x,

                y

            );

            return;

        }

        // ===================================
        // Selection
        // ===================================

        if (selectedTool === "select") {

            startSelection(

                x,

                y

            );

            return;

        }

        // ===================================
        // Brush / Eraser / Fill
        // ===================================

        paint(

            x,

            y

        );
    }

    // =============================
    // Mouse Move
    // =============================

    function handleMouseMove(

        event: React.MouseEvent<HTMLCanvasElement>

    ) {

        const {

            x,

            y

        } = getCellPosition(event);

        const cell = {

            x,

            y

        };

        setHoverCell(cell);

        onHoverChange?.(cell);

        if (

            isPasteMode

        ) {

            onPastePreviewChange?.({

                x,

                y

            });

        }

        if (!isDrawing)

            return;

        if (selectedTool === "select") {

            updateSelection(

                x,

                y

            );

            return;

        }

        paint(

            x,

            y

        );

    }

    function handleMouseLeave() {

        stopDrawing();

        setHoverCell(null);

        onHoverChange?.(null);
        
    }

    // =============================
    // Stop Drawing
    // =============================

    function stopDrawing() {

        setIsDrawing(false);

        resetPaint();

    }

    return {

        hoverCell,

        handleMouseDown,

        handleMouseMove,

        handleMouseLeave,

        stopDrawing

    };

}