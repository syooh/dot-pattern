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

    mode: "edit" | "view";

    patternHeight: number;

    onCurrentRowChange: (row: number) => void;

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

    onMoveSelection: () => void;

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
    
    mode,

    patternHeight,

    onCurrentRowChange,

    onHoverChange,

    camera,

    selectedTool,

    selection,

    onSelectionChange,

    onMoveSelection,

    isPasteMode,

    onPastePreviewChange

}: Props) {

    const [isDrawing, setIsDrawing] =

        useState(false);

    const [isDraggingSelection, setIsDraggingSelection] =

        useState(false);

    const [dragStart, setDragStart] =

        useState<{

            x: number;

            y: number;

        } | null>(null);

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

        // ===================================
        // 클릭한 Canvas 셀 위치
        // ===================================

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
        // View Mode
        //
        // 편집하지 않고
        // 클릭한 행을 현재 작업 행으로 변경한다.
        // ===================================

        if (mode === "view") {

            const row = patternHeight - y;

            onCurrentRowChange(row);

            return;

        }


        setIsDrawing(true);


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

        // ===================================
        // Select
        // ===================================

        if (

            selectedTool === "select"

        ) {

            console.log(selectedTool);

            startSelection(

                x,

                y

            );

            return;

        }


        if (

            selectedTool === "move" &&

            selection

        ) {

            setIsDraggingSelection(true);

            setDragStart({

                x,

                y

            });

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

        // ===================================
        // View Mode에서는 Hover만 처리한다.
        // ===================================

        if (mode === "view") {

            return;

        }

        if (

            isDraggingSelection &&

            selection &&

            dragStart

        ) {

            onSelectionChange({

                ...selection,

                offsetX: x - dragStart.x,

                offsetY: y - dragStart.y,

                isDragging: true

            });

        }

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

        // ===================================
        // View Mode에서는 편집 동작을 수행하지 않는다.
        // ===================================

        if (mode === "view") {

            setIsDrawing(false);

            setIsDraggingSelection(false);

            setDragStart(null);

            resetPaint();

            return;

        }

        if (isDraggingSelection) {

            onMoveSelection();

        }

        setIsDrawing(false);

        setIsDraggingSelection(false);

        setDragStart(null);

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