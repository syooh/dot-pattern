// ======================================================
// useCanvasInteraction
// Version : v1.0
// Last Update : 2026-07-16
//
// 역할
// 1. Canvas의 마우스 상태 관리
// 2. Hover Cell 관리
// 3. Drag 상태 관리
// 4. 클릭 좌표 계산
// ======================================================

import { useRef, useState } from "react";
import { pixelToCell } from "./CanvasUtils";

interface Props {

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export function useCanvasInteraction({

    onPixelClick

}: Props) {

    const [isDrawing, setIsDrawing] =

        useState(false);

    const [hoverCell, setHoverCell] =

        useState<{

            x: number;

            y: number;

        } | null>(null);

    const lastCell =

        useRef<{

            x: number;

            y: number;

        } | null>(null);

    // =============================
    // Mouse → Cell
    // =============================

    function getCellPosition(

        event: React.MouseEvent<HTMLCanvasElement>

    ) {

        const rect =

            event.currentTarget.getBoundingClientRect();

        return {

            x: pixelToCell(

                event.clientX - rect.left

            ),

            y: pixelToCell(

                event.clientY - rect.top

            )

        };

    }

    // =============================
    // Paint
    // =============================

    function paint(

        x: number,

        y: number

    ) {

        if (

            lastCell.current?.x === x &&

            lastCell.current?.y === y

        ) {

            return;

        }

        lastCell.current = {

            x,

            y

        };

        onPixelClick(

            x,

            y

        );

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

        setHoverCell({

            x,

            y

        });

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

        setHoverCell({

            x,

            y

        });

        if (!isDrawing)

            return;

        paint(

            x,

            y

        );

    }

    // =============================
    // Mouse Leave
    // =============================

    function handleMouseLeave() {

        stopDrawing();

        setHoverCell(null);

    }

    // =============================
    // Mouse Up
    // =============================

    function stopDrawing() {

        setIsDrawing(false);

        lastCell.current = null;

    }

    return {

        hoverCell,

        handleMouseDown,

        handleMouseMove,

        handleMouseLeave,

        stopDrawing

    };

}