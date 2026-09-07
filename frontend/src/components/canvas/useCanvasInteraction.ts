// ======================================================
// useCanvasInteraction
// Version : v1.1
// Last Update : 2026-09-07
//
// 역할
// 1. Canvas의 마우스 상태 관리
// 2. Hover Cell 관리
// 3. Drag 상태 관리
// 4. 클릭 좌표 계산
// 5. Zoom을 고려한 Cell 좌표 계산
// ======================================================

import { useRef, useState } from "react";

import { pixelToCell } from "./CanvasUtils";


interface Props {

    // 셀을 클릭했을 때 실행할 함수
    onPixelClick: (

        x: number,

        y: number

    ) => void;

    // 현재 Canvas 확대/축소 비율
    zoom: number;

}


export function useCanvasInteraction({

    onPixelClick,

    zoom

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

            // 화면상의 X 좌표를
            // 현재 zoom 기준의 Cell 좌표로 변환
            x: pixelToCell(

                event.clientX - rect.left,

                zoom

            ),

            // 화면상의 Y 좌표를
            // 현재 zoom 기준의 Cell 좌표로 변환
            y: pixelToCell(

                event.clientY - rect.top,

                zoom

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