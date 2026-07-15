// ======================================================
// Workspace
// 역할
// 1. Canvas 작업 영역
// ======================================================

import type { PatternData } from "../../types/Pattern";

import CanvasViewport from "./CanvasViewport";

interface Props {

    pattern: PatternData;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export default function Workspace({

    pattern,

    onPixelClick

}: Props) {

    return (

        <CanvasViewport

            pattern={pattern}

            onPixelClick={onPixelClick}

        />

    );

}