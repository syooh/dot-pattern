// =====================================================
// PatternEngine
// -----------------------------------------------------
// 역할
// 1. PatternData를 수정한다.
// 2. Canvas는 수정하지 않는다.
// 3. 모든 그리기 알고리즘을 담당한다.
//
// 앞으로 추가될 기능
// - 브러시
// - 지우개
// - 직선
// - 사각형
// - 원
// - 채우기(Fill)
// - Undo / Redo
// =====================================================

import type { PatternData } from "../types/Pattern";

/**
 * =====================================================
 * Pattern을 깊은 복사
 * -----------------------------------------------------
 * React에서는 기존 객체를 직접 수정하면
 * 화면이 다시 그려지지 않을 수 있다.
 *
 * 그래서 항상 복사본을 만든 후 수정한다.
 * =====================================================
 */
export function clonePattern(
    pattern: PatternData
): PatternData {

    return {

        ...pattern,

        palette: [...pattern.palette],

        pixels: pattern.pixels.map(
            row => [...row]
        )

    };

}

/**
 * =====================================================
 * 한 칸 색칠
 * -----------------------------------------------------
 * x,y 위치를 선택한 색으로 변경한다.
 * =====================================================
 */
export function paintPixel(

    pattern: PatternData,

    x: number,

    y: number,

    colorId: number

): PatternData {

    const next =
        clonePattern(pattern);

    // 범위를 벗어나면 무시
    if (
        x < 0 ||
        y < 0 ||
        x >= next.width ||
        y >= next.height
    ) {
        return next;
    }

    next.pixels[y][x] =
        colorId;

    return next;

}

/**
 * =====================================================
 * 한 칸 지우기
 * -----------------------------------------------------
 * 현재는 흰색(id=0)으로 변경한다.
 *
 * 나중에는 -1(투명)으로 변경할 예정이다.
 * =====================================================
 */
export function erasePixel(

    pattern: PatternData,

    x: number,

    y: number

): PatternData {

    return paintPixel(
        pattern,
        x,
        y,
        0
    );

}

/**
 * =====================================================
 * Palette에서 색상 삭제
 * -----------------------------------------------------
 * 역할
 * 1. Palette에서 색상을 제거한다.
 * 2. 해당 색을 사용하는 픽셀은 White(0)로 변경한다.
 * 3. 삭제된 색보다 큰 id를 가진 픽셀은 1 감소시킨다.
 * 4. Palette의 id도 다시 정렬한다.
 * =====================================================
 */
export function removeColor(

    pattern: PatternData,

    colorId: number

): PatternData {

    // ------------------------------------------
    // White와 Black은 삭제할 수 없다.
    // ------------------------------------------

    if (colorId === 0 || colorId === 1) {

        return pattern;

    }

    // ------------------------------------------
    // Pattern 복사
    // ------------------------------------------

    const next = clonePattern(pattern);

    // ------------------------------------------
    // Palette 삭제
    // ------------------------------------------

    next.palette = next.palette
        .filter(color => color.id !== colorId)
        .map((color, index) => ({

            ...color,

            // id를 다시 0부터 순서대로 부여
            id: index

        }));

    // ------------------------------------------
    // Pixels 수정
    // ------------------------------------------

    for (let y = 0; y < next.height; y++) {

        for (let x = 0; x < next.width; x++) {

            const current = next.pixels[y][x];

            // 삭제한 색은 White로 변경
            if (current === colorId) {

                next.pixels[y][x] = 0;

            }

            // 삭제한 색보다 큰 번호는 하나 감소
            else if (current > colorId) {

                next.pixels[y][x] = current - 1;

            }

        }

    }

    return next;

}