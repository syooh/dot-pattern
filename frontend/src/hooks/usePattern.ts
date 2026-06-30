// ======================================================
// usePattern
// ------------------------------------------------------
// 역할
// 1. React State를 관리한다.
// 2. PatternEngine을 호출한다.
// 3. 화면과 엔진을 연결하는 역할만 한다.
//
// 주의!
// 실제 도안 계산은 PatternEngine에서 수행한다.
// ======================================================

import { useState } from "react";

import type { PatternData } from "../types/Pattern";

// PatternEngine에서 paintPixel 함수를 가져온다.
import { paintPixel as paintPixelEngine } from "../engine/PatternEngine";

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

    const [pattern, setPattern] =

        useState<PatternData | null>(null);

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
    // 픽셀 색칠
    // ==================================================

    /**
     * 클릭된 위치를 선택한 색으로 변경한다.
     *
     * 실제 계산은 PatternEngine에서 수행한다.
     */
    const paintPixel = (

        x: number,

        y: number

    ) => {

        if (!pattern)

            return;

        const newPattern =

            paintPixelEngine(

                pattern,

                x,

                y,

                selectedColor

            );

        setPattern(

            newPattern

        );

    };

    return {

        pattern,

        selectedColor,

        setSelectedColor,

        createPattern,

        paintPixel

    };

}