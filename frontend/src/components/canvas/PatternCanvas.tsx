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

import { drawCanvas } from "./CanvasDrawer";

import { useCanvasEvents } from "./CanvasEvents";

import { getCanvasWidth, getCanvasHeight } from "./CanvasUtils";

interface Props {

    pattern: PatternData;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export default function PatternCanvas({

    pattern,

    onPixelClick

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

        handleMouseDown,

        handleMouseMove,

        stopDrawing

    } = useCanvasEvents({

        onPixelClick

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

                pattern.width

            );

        canvas.height =

            getCanvasHeight(

                pattern.height

            );

        drawCanvas(

            ctx,

            pattern

        );

    }, [pattern]);

    // ==================================================
    // Render
    // ==================================================

    return (

        <canvas

            ref={canvasRef}

            onMouseDown={handleMouseDown}

            onMouseMove={handleMouseMove}

            onMouseUp={stopDrawing}

            onMouseLeave={stopDrawing}

            style={{
                display: "block"
            }}

        />

    );

}