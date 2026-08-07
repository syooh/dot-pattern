import type { PatternData } from "../types/Pattern";

export function exportPatternAsPNG(

    pattern: PatternData,

    cellSize: number = 20

) {

    const canvas = document.createElement("canvas");

    canvas.width = pattern.width * cellSize;

    canvas.height = pattern.height * cellSize;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    for (let y = 0; y < pattern.height; y++) {

        for (let x = 0; x < pattern.width; x++) {

            const colorId = pattern.pixels[y][x];

            const color = pattern.palette.find(

                (p) => p.id === colorId

            );

            ctx.fillStyle = color?.hex ?? "#FFFFFF";

            ctx.fillRect(

                x * cellSize,

                y * cellSize,

                cellSize,

                cellSize

            );

            ctx.strokeStyle = "#B0B0B0";
            ctx.lineWidth = 1;

            for (let x = 0; x <= pattern.width; x++) {

                ctx.beginPath();

                if (x % 5 === 0) {

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

            for (let y = 0; y <= pattern.height; y++) {

                ctx.beginPath();

                if (y % 5 === 0) {

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
        }
    }

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