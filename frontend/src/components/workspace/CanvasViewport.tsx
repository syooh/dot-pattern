// ======================================================
// CanvasViewport
// Version : v1.0
// Last Update : 2026-07-15
//
// 역할
// 1. Canvas 작업 영역(Viewport)
// 2. Scroll 관리
// 3. Zoom 기능이 추가될 영역
// ======================================================

import type { PatternData } from "../../types/Pattern";

import CanvasContainer from "../canvas/CanvasContainer";

interface Props {

    pattern: PatternData;

    onPixelClick: (

        x: number,

        y: number

    ) => void;

    onHoverChange: (

        cell: {

            x: number;

            y: number;

        } | null

    ) => void;

}

export default function CanvasViewport({

    pattern,

    onPixelClick,

    onHoverChange

}: Props) {

    return (

        <div

            style={{

                marginTop: 25,

                display: "flex",

                justifyContent: "center"

            }}

        >

            <div

                style={{

                    maxWidth: "100%",

                    maxHeight: "70vh",

                    overflow: "auto",

                    padding: 20,

                    background: "#ECECEC",

                    border: "1px solid #CCCCCC",

                    borderRadius: 10

                }}

            >

                <CanvasContainer

                    pattern={pattern}

                    onPixelClick={onPixelClick}

                    onHoverChange={onHoverChange}

                />

            </div>

        </div>

    );

}