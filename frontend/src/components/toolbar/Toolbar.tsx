// ======================================================
// Toolbar
// Version : v1.0
// Last Update : 2026-07-16
//
// 역할
// 1. 편집 기능 버튼을 출력한다.
// 2. 버튼 클릭 이벤트를 부모에게 전달한다.
// 3. 실제 기능은 수행하지 않는다.
// ======================================================

import ToolbarButton from "./ToolbarButton";

import type {
    ToolType
} from "../../types/Pattern";

interface Props {

    onUndo?: () => void;

    onRedo?: () => void;

    selectedTool: ToolType;

    onToolChange: (
        tool: ToolType
    ) => void;

    canUndo?: boolean;

    canRedo?: boolean;

}

export default function Toolbar({

    onUndo,

    onRedo,

    canUndo,

    canRedo,

    selectedTool,

    onToolChange

}: Props) {

    return (

        <div

            style={{

                display: "flex",

                alignItems: "center",

                gap: 12,

                padding: 12,

                marginBottom: 20,

                border: "1px solid #D9D9D9",

                borderRadius: 8,

                background: "#F7F7F7",

                flexWrap: "wrap"

            }}

        >

            {/* ========================= */}
            {/* File */}
            {/* ========================= */}

            <ToolbarButton

                icon="🆕"

                label="New"

            />

            <ToolbarButton

                icon="💾"

                label="Save"

            />

            <ToolbarButton

                icon="📂"

                label="Open"

            />

            <div

                style={{

                    width: 1,

                    height: 40,

                    background: "#DDDDDD"

                }}

            />

            {/* ========================= */}
            {/* History */}
            {/* ========================= */}

            <ToolbarButton

                icon="↶"

                label="Undo"

                onClick={onUndo}

                disabled={!canUndo}

            />

            <ToolbarButton

                icon="↷"

                label="Redo"

                onClick={onRedo}

                disabled={!canRedo}

            />

            <div

                style={{

                    width: 1,

                    height: 40,

                    background: "#DDDDDD"

                }}

            />

            {/* ========================= */}
            {/* Tools */}
            {/* ========================= */}

            <ToolbarButton

                icon="🖌"

                label="Brush"

                selected={selectedTool === "brush"}

                onClick={() => onToolChange("brush")}

            />

            <ToolbarButton

                icon="🩹"

                label="Erase"

                selected={selectedTool === "eraser"}

                onClick={() => onToolChange("eraser")}

            />

            <ToolbarButton

                icon="🪣"

                label="Fill"

                selected={selectedTool === "fill"}

                onClick={() => onToolChange("fill")}

            />

        </div>

    );

}