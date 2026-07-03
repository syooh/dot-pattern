// ======================================================
// PatternCanvas
// Version : v0.5
// Last Update : 2026-07-03
//
// 역할
// 1. Canvas에 도안을 그린다.
// 2. 클릭한 셀 좌표를 계산한다.
// 3. 드래그를 감지한다.
// 4. 부모(usePattern)에게 좌표만 전달한다.
//
// 실제 도안 수정은 PatternEngine이 담당한다.
// ======================================================

import { useEffect, useRef, useState } from "react";
import type { PatternData } from "../../types/Pattern";

interface Props {

    pattern: PatternData;

    onPixelClick: (
        x: number,
        y: number
    ) => void;

}

const CELL_SIZE = 20;

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
    // 드래그 여부
    // ==================================================

    const [isDrawing, setIsDrawing] =
        useState(false);

    // ==================================================
    // 마지막으로 칠한 칸
    // 같은 칸을 계속 칠하는 것을 방지한다.
    // ==================================================

    const lastCell =
        useRef<{ x: number; y: number } | null>(null);

    // ==================================================
    // Canvas 다시 그리기
    // ==================================================

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width =
            pattern.width * CELL_SIZE;

        canvas.height =
            pattern.height * CELL_SIZE;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (let y = 0; y < pattern.height; y++) {

            for (let x = 0; x < pattern.width; x++) {

                const color =
                    pattern.palette[
                    pattern.pixels[y][x]
                    ];

                ctx.fillStyle =
                    color.hex;

                ctx.fillRect(

                    x * CELL_SIZE,

                    y * CELL_SIZE,

                    CELL_SIZE,

                    CELL_SIZE

                );

                ctx.strokeStyle =
                    "#cccccc";

                ctx.strokeRect(

                    x * CELL_SIZE,

                    y * CELL_SIZE,

                    CELL_SIZE,

                    CELL_SIZE

                );

            }

        }

    }, [pattern]);

    // ==================================================
    // 마우스 좌표 → 셀 좌표
    // ==================================================

    const getCellPosition = (

        event: React.MouseEvent<HTMLCanvasElement>

    ) => {

        const rect =
            event.currentTarget.getBoundingClientRect();

        return {

            x: Math.floor(
                (event.clientX - rect.left)
                / CELL_SIZE
            ),

            y: Math.floor(
                (event.clientY - rect.top)
                / CELL_SIZE
            )

        };

    };

    // ==================================================
    // 실제 색칠 요청
    // ==================================================

    const paint = (

        x: number,

        y: number

    ) => {

        // 같은 칸이면 다시 칠하지 않는다.
        if (

            lastCell.current?.x === x &&

            lastCell.current?.y === y

        ) {

            return;

        }

        lastCell.current = { x, y };

        onPixelClick(x, y);

    };

    // ==================================================
    // 마우스를 누름
    // ==================================================

    const handleMouseDown = (

        event: React.MouseEvent<HTMLCanvasElement>

    ) => {

        setIsDrawing(true);

        const { x, y } =
            getCellPosition(event);

        paint(x, y);

    };

    // ==================================================
    // 드래그
    // ==================================================

    const handleMouseMove = (

        event: React.MouseEvent<HTMLCanvasElement>

    ) => {

        if (!isDrawing)
            return;

        const { x, y } =
            getCellPosition(event);

        paint(x, y);

    };

    // ==================================================
    // 드래그 종료
    // ==================================================

    const stopDrawing = () => {

        setIsDrawing(false);

        lastCell.current = null;

    };

    return (

        <canvas

            ref={canvasRef}

            onMouseDown={handleMouseDown}

            onMouseMove={handleMouseMove}

            onMouseUp={stopDrawing}

            onMouseLeave={stopDrawing}

        />

    );

}