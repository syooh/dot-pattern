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

import useCamera from "../../hooks/useCamera";

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

        hoverCell,

        handleMouseDown,

        handleMouseMove,

        handleMouseLeave,

        stopDrawing

    } = useCanvasEvents({

        onPixelClick

    });

    const {

        camera

    } = useCamera();

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

        renderCanvas(

            ctx,

            {

                pattern,

                hoverCell,

                camera,

                showGrid: true

            }

        );

    }, [pattern, hoverCell]);

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