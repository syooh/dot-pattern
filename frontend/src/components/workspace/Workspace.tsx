// ======================================================
// Workspace
// 역할
// 1. Canvas 작업 영역
// ======================================================

import { useState } from "react";
import type { PatternData } from "../../types/Pattern";

import CanvasViewport from "./CanvasViewport";

interface Props {

    pattern: PatternData;

    hoverCell: {

        x: number;

        y: number;

    } | null;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export default function Workspace({

    pattern,

    onPixelClick,

}: Props) {

    const [hoverCell, setHoverCell] =

        useState<{

            x: number;

            y: number;

        } | null>(null);

    return (

        <div>

            <CanvasViewport

                pattern={pattern}

                onPixelClick={onPixelClick}

                onHoverChange={setHoverCell}

            />

        </div>

    );

}