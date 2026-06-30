// ======================================================
// PatternCanvas
// ------------------------------------------------------
// 역할
// 1. 도안을 Canvas에 그린다.
// 2. 클릭 또는 드래그한 위치를 계산한다.
// 3. 부모(usePattern)에 좌표를 전달한다.
//
// 이번 버전(v0.4)
// - 드래그 색칠 기능 추가
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

    // =============================
    // Canvas 참조
    // =============================

    const canvasRef =
        useRef<HTMLCanvasElement>(null);

    // =============================
    // 현재 마우스를 누르고 있는지 저장
    // true  : 드래그 중
    // false : 드래그 아님
    // =============================

    const [isDrawing, setIsDrawing] =
        useState(false);

    // =============================
    // Canvas 다시 그리기
    // pattern이 변경될 때마다 실행된다.
    // =============================

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

                const colorIndex =
                    pattern.pixels[y][x];

                const color =
                    pattern.palette[colorIndex];

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

    /**
     * 마우스 위치를 셀 좌표로 변환하는 함수
     */
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

    /**
     * 마우스를 누른 순간
     * 첫 칸도 바로 색칠한다.
     */
    const handleMouseDown = (
        event: React.MouseEvent<HTMLCanvasElement>
    ) => {

        setIsDrawing(true);

        const { x, y } =
            getCellPosition(event);

        onPixelClick(x, y);

    };

    /**
     * 드래그 중
     */
    const handleMouseMove = (
        event: React.MouseEvent<HTMLCanvasElement>
    ) => {

        if (!isDrawing)
            return;

        const { x, y } =
            getCellPosition(event);

        onPixelClick(x, y);

    };

    /**
     * 마우스를 떼면 드래그 종료
     */
    const stopDrawing = () => {

        setIsDrawing(false);

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