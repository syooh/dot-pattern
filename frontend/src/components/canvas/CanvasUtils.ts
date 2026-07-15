// ======================================================
// CanvasUtils
// Version : v1.1
// Last Update : 2026-07-15
//
// Canvas 공통 계산 함수
// ======================================================

import { CELL_SIZE } from "./CanvasConstants";

// Canvas Width

export function getCanvasWidth(

    width: number

) {

    return width * CELL_SIZE;

}

// Canvas Height

export function getCanvasHeight(

    height: number

) {

    return height * CELL_SIZE;

}

// Cell → Pixel

export function cellToPixel(

    value: number

) {

    return value * CELL_SIZE;

}

// Pixel → Cell

export function pixelToCell(

    value: number

) {

    return Math.floor(

        value / CELL_SIZE

    );

}