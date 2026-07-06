// ======================================================
// usePattern
// Version : v0.5
// Last Update : 2026-07-03
//
// 역할
// 1. React State 관리
// 2. PatternEngine 호출
// 3. Canvas와 Engine 연결
//
// 앞으로 추가될 기능
// - Undo / Redo
// - Tool 선택
// - 확대 / 축소
// ======================================================

import { useState } from "react";

import type { PatternData } from "../types/Pattern";

import {

    paintPixel as paintPixelEngine,

    removeColor as removeColorEngine

} from "../engine/PatternEngine";

export default function usePattern() {

    // ==================================================
    // 빈 도안 생성
    // ==================================================

    const createEmptyPattern = (

        width: number,

        height: number

    ): PatternData => {

        return {

            width,

            height,

            palette: [

                {
                    id: 0,
                    name: "White",
                    hex: "#FFFFFF"
                },

                {
                    id: 1,
                    name: "Black",
                    hex: "#000000"
                }

            ],

            pixels: Array.from(

                { length: height },

                () => Array(width).fill(0)

            )

        };

    };

    // ==================================================
    // State
    // ==================================================

    // 현재 도안
    const [pattern, setPattern] =
        useState<PatternData | null>(null);

    // 현재 선택된 색상
    const [selectedColor, setSelectedColor] =
        useState(1);

    // ==================================================
    // 새 도안 생성
    // ==================================================

    const createPattern = (

        width: number,

        height: number

    ) => {

        setPattern(
            createEmptyPattern(
                width,
                height
            )
        );

    };

    // ==================================================
    // 한 칸 색칠
    // ==================================================

    /**
     * Canvas가 전달한 좌표를
     * PatternEngine에게 넘긴다.
     */
    const paintPixel = (

        x: number,

        y: number

    ) => {

        if (!pattern)
            return;

        const nextPattern =
            paintPixelEngine(

                pattern,

                x,

                y,

                selectedColor

            );

        setPattern(nextPattern);

    };

    // ==================================================
    // Palette에 색 추가
    // ==================================================

    const addColor = (

        hex: string

    ) => {

        if (!pattern)
            return;

        const nextId =

            Math.max(

                ...pattern.palette.map(

                    color => color.id

                )

            ) + 1;

        setPattern({

            ...pattern,

            palette: [

                ...pattern.palette,

                {

                    id: nextId,

                    name: hex,

                    hex

                }

            ]

        });

    };

    /**
 * ==========================================
 * Palette에서 색상 삭제
 * ==========================================
 *
 * 선택한 색상을 Palette에서 삭제한다.
 *
 * 실제 삭제는 PatternEngine에서 수행한다.
 */
    const removeColor = (

        colorId: number

    ) => {

        // 아직 도안이 없으면 종료
        if (!pattern) return;

        // Engine에게 삭제 요청
        const nextPattern =

            removeColorEngine(

                pattern,

                colorId

            );

        // React 상태 변경
        setPattern(

            nextPattern

        );

        /**
         * 만약 삭제한 색상이 현재 선택되어 있다면
         * 기본색(검정)으로 변경한다.
         */
        if (

            selectedColor === colorId

        ) {

            setSelectedColor(1);

        }

    };

    // ==================================================
    // 외부에서 사용하는 함수
    // ==================================================

    return {

        // 상태
        pattern,

        selectedColor,

        // Setter
        setSelectedColor,

        // 기능
        createPattern,

        paintPixel,

        addColor,

        removeColor

    };

}