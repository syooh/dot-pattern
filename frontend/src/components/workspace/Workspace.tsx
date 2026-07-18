// ======================================================
// Workspace
// 역할
// 1. Canvas 작업 영역
// ======================================================

import type { PatternData } from "../../types/Pattern";

import CanvasViewport from "./CanvasViewport";
import type { CameraState } from "../canvas/camera/CameraState";

interface Props {

    pattern: PatternData;

    showGrid: boolean;

    camera:CameraState;

    hoverCell: {

        x: number;

        y: number;

    } | null;

    onHoverChange: (

        cell: {

            x: number;

            y: number;

        } | null

    ) => void;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

}

export default function Workspace({

    pattern,

    showGrid,
    
    camera,

    hoverCell,

    onHoverChange,

    onPixelClick

}: Props) {

    return (

        <div>

            <CanvasViewport

                pattern={pattern}

                showGrid={showGrid}

                camera={camera}

                hoverCell={hoverCell}

                onHoverChange={onHoverChange}

                onPixelClick={onPixelClick}

            />

        </div>

    );

}