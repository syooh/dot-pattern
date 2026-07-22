// ======================================================
// PaintEvents
// Version : v1.0
//
// 역할
// 1. Brush / Eraser / Fill 공통 Paint 처리
// ======================================================

import { useRef } from "react";

interface Props {

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export function usePaintEvents({

    onPixelClick

}: Props) {

    const lastCell =

        useRef<{

            x: number;

            y: number;

        } | null>(null);

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

    function resetPaint() {

        lastCell.current = null;

    }

    return {

        paint,

        resetPaint

    };

}