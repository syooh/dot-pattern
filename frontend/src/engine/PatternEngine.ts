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
 * 1. Palette에서 해당 색상을 제거한다.
 * 2. White(id=0)는 삭제할 수 없다.
 * 3. Black(id=1)도 삭제하지 못하도록 한다.
 *
 * ※ 아직 pixels[][]는 수정하지 않는다.
 * 다음 단계에서 구현한다.
 * =====================================================
 */
export function removeColor(

    pattern: PatternData,

    colorId: number

): PatternData {

    // 흰색과 검정은 삭제 금지
    if (colorId === 0 || colorId === 1) {

        return pattern;

    }

    // 기존 Pattern 복사
    const next = clonePattern(pattern);

    // Palette에서 해당 색상 제거
    next.palette = next.palette.filter(

        color => color.id !== colorId

    );

    return next;

}