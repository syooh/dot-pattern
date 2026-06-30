// ======================================================
// PatternEngine
// ------------------------------------------------------
// 역할
// 1. 도안 데이터를 수정한다.
// 2. React와 독립적으로 동작한다.
// 3. 모든 편집 기능의 핵심 엔진이다.
//
// 앞으로 추가될 기능
// - paintPixel()
// - erasePixel()
// - fill()
// - drawLine()
// - drawRectangle()
// - rotate()
// - flip()
// ======================================================

import type { PatternData } from "../types/Pattern";

/**
 * 하나의 픽셀을 지정한 색으로 변경한다.
 *
 * @param pattern 기존 도안
 * @param x 가로 위치
 * @param y 세로 위치
 * @param colorId 사용할 색 번호
 *
 * @returns 변경된 새로운 PatternData
 */
export function paintPixel(

    pattern: PatternData,

    x: number,

    y: number,

    colorId: number

): PatternData {

    // =============================
    // 범위를 벗어나면 아무것도 하지 않는다.
    // =============================

    if (

        x < 0 ||

        y < 0 ||

        x >= pattern.width ||

        y >= pattern.height

    ) {

        return pattern;

    }

    // =============================
    // 기존 pixels를 복사한다.
    // React State는 직접 수정하면 안 된다.
    // =============================

    const newPixels =

        pattern.pixels.map(

            row => [...row]

        );

    // =============================
    // 색 변경
    // =============================

    newPixels[y][x] = colorId;

    // =============================
    // 새로운 Pattern 반환
    // =============================

    return {

        ...pattern,

        pixels: newPixels

    };

}