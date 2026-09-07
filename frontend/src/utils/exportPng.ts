import type { PatternData } from "../types/Pattern";

/**
 * PatternData를 PNG 이미지로 변환하여 다운로드한다.
 *
 * 처리 순서:
 * 1. Canvas 생성
 * 2. 패턴의 모든 픽셀 그리기
 * 3. 세로 Grid 그리기
 * 4. 가로 Grid 그리기
 * 5. PNG로 변환 후 다운로드
 */
export function exportPatternAsPNG(
    pattern: PatternData,
    cellSize: number = 20
) {
    // --------------------------------
    // 1. Canvas 생성
    // --------------------------------

    const canvas = document.createElement("canvas");

    canvas.width = pattern.width * cellSize;
    canvas.height = pattern.height * cellSize;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // --------------------------------
    // 2. 픽셀 그리기
    // --------------------------------

    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const colorId = pattern.pixels[y][x];

            const color = pattern.palette.find(
                (paletteColor) => paletteColor.id === colorId
            );

            ctx.fillStyle = color?.hex ?? "#FFFFFF";

            ctx.fillRect(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize
            );
        }
    }

    // --------------------------------
    // 3. 세로 Grid 그리기
    // --------------------------------

    for (let x = 0; x <= pattern.width; x++) {
        ctx.beginPath();

        // 10칸마다 굵은 Grid
        if (x % 10 === 0) {
            ctx.strokeStyle = "#7A7A7A";
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = "#CFCFCF";
            ctx.lineWidth = 1;
        }

        ctx.moveTo(
            x * cellSize,
            0
        );

        ctx.lineTo(
            x * cellSize,
            canvas.height
        );

        ctx.stroke();
    }

    // --------------------------------
    // 4. 가로 Grid 그리기
    // --------------------------------

    for (let y = 0; y <= pattern.height; y++) {
        ctx.beginPath();

        // 10칸마다 굵은 Grid
        if (y % 10 === 0) {
            ctx.strokeStyle = "#7A7A7A";
            ctx.lineWidth = 2;
        } else {
            ctx.strokeStyle = "#CFCFCF";
            ctx.lineWidth = 1;
        }

        ctx.moveTo(
            0,
            y * cellSize
        );

        ctx.lineTo(
            canvas.width,
            y * cellSize
        );

        ctx.stroke();
    }

    // --------------------------------
    // 5. PNG 다운로드
    // --------------------------------

    canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `pattern_${Date.now()}.png`;

        link.click();

        URL.revokeObjectURL(url);
    });
}