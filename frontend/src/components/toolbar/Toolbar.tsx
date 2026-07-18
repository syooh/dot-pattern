// ======================================================
// Toolbar
// Version : v1.1
// Last Update : 2026-07-17
//
// 역할
// 1. 편집 기능 버튼을 출력한다.
// 2. 버튼 클릭 이벤트를 부모에게 전달한다.
// 3. 실제 기능은 수행하지 않는다.
// ======================================================

import ToolbarButton from "./ToolbarButton";
import ToolbarGroup from "./ToolbarGroup";
import ToolbarDivider from "./ToolbarDivider";

import type {
    ToolType
} from "../../types/Pattern";

interface Props {

    onNew?: () => void;

    onSave?: () => void;

    onOpen?: () => void;

    onUndo?: () => void;

    onRedo?: () => void;

    selectedTool: ToolType;

    zoom: number;

    onZoomIn: () => void;

    onZoomOut: () => void;

    onToolChange: (
        tool: ToolType
    ) => void;

    canUndo?: boolean;

    canRedo?: boolean;

    showGrid: boolean;

    onToggleGrid: () => void;

}

export default function Toolbar({

    onNew,

    onSave,

    onOpen,

    onUndo,

    onRedo,

    canUndo,

    canRedo,

    selectedTool,

    onToolChange,

    showGrid,

    onToggleGrid,

    zoom,

    onZoomIn,

    onZoomOut

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

            <ToolbarGroup>

                <ToolbarButton

                    icon="🆕"

                    label="New"

                    onClick={onNew}

                />

                <ToolbarButton

                    icon="💾"

                    label="Save"

                    onClick={onSave}

                />

                <ToolbarButton

                    icon="📂"

                    label="Open"

                    onClick={onOpen}

                />

            </ToolbarGroup>

            <ToolbarDivider />

            {/* ========================= */}
            {/* History */}
            {/* ========================= */}

            <ToolbarGroup>

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

            </ToolbarGroup>

            <ToolbarDivider />

            {/* ========================= */}
            {/* Tools */}
            {/* ========================= */}

            <ToolbarGroup>

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

            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup>

                <ToolbarButton

                    icon="⊞"

                    label="Grid"

                    selected={showGrid}

                    onClick={onToggleGrid}

                />

            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup>

                <ToolbarButton

                    icon="➖"

                    label="Zoom Out"

                    onClick={onZoomOut}

                />

                <div

                    style={{

                        width: 70,

                        textAlign: "center",

                        fontWeight: 600,

                        fontSize: 14

                    }}

                >

                    {Math.round(zoom * 100)}%

                </div>

                <ToolbarButton

                    icon="➕"

                    label="Zoom In"

                    onClick={onZoomIn}

                />

            </ToolbarGroup>

        </div>

    );

}