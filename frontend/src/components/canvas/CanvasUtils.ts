// ======================================================
// CanvasUtils
// Version : v1.1
// Last Update : 2026-07-15
//
// Canvas 공통 계산 함수
// ======================================================

import { CELL_SIZE } from "./CanvasConstants";

// ======================================================
// Cell Size
// ======================================================

export function getCellSize(

    zoom: number

) {

    return CELL_SIZE * zoom;

}

// Canvas Width

export function getCanvasWidth(

    width: number,

    zoom: number

) {

    return width * getCellSize(zoom);

}

// Canvas Height

export function getCanvasHeight(

    height: number,

    zoom: number

) {

    return height * getCellSize(zoom);

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