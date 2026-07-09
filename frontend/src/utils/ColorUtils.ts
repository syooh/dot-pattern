// ======================================================
// ColorUtils
// Version : v1.0
// Last Update : 2026-07-09
//
// 역할
// 1. HEX ↔ RGB 변환
// 2. HEX 유효성 검사
// 3. RGB 범위 제한
// ======================================================

export interface RGB {

    r: number;

    g: number;

    b: number;

}

// ======================================================
// HEX → RGB
// ======================================================

export function hexToRgb(
    hex: string
): RGB {

    const value =
        hex.replace("#", "");

    if (value.length !== 6) {

        return {

            r: 0,

            g: 0,

            b: 0

        };

    }

    return {

        r: parseInt(

            value.substring(0, 2),

            16

        ),

        g: parseInt(

            value.substring(2, 4),

            16

        ),

        b: parseInt(

            value.substring(4, 6),

            16

        )

    };

}

// ======================================================
// RGB → HEX
// ======================================================

export function rgbToHex(

    r: number,

    g: number,

    b: number

): string {

    return (

        "#" +

        [r, g, b]

            .map(value =>

                clamp(value)

                    .toString(16)

                    .padStart(2, "0")

            )

            .join("")

            .toUpperCase()

    );

}

// ======================================================
// RGB 범위 제한
// ======================================================

export function clamp(

    value: number

): number {

    return Math.max(

        0,

        Math.min(

            255,

            value

        )

    );

}

// ======================================================
// HEX 유효성 검사
// ======================================================

export function isValidHex(

    hex: string

): boolean {

    return /^#[0-9A-Fa-f]{6}$/.test(hex);

}