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

import type { ToolType } from "../../types/Pattern";

interface Props {

    onNew?: () => void;

    onSave?: () => void;

    onExportPNG?: () => void;

    onOpen?: () => void;

    onImportImage?: () => void;

    onUndo?: () => void;

    onRedo?: () => void;

    selectedTool: ToolType;

    mode: "edit" | "view";

    onModeChange: (
        mode: "edit" | "view"
    ) => void;

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

    onRotate: () => void;

    onFlipHorizontal: () => void;

    onFlipVertical: () => void;

}

export default function Toolbar({

    onNew,

    onSave,

    onOpen,

    onExportPNG,

    onUndo,

    onRedo,

    canUndo,

    canRedo,

    selectedTool,

    mode,

    onModeChange,

    onToolChange,

    showGrid,

    onToggleGrid,

    zoom,

    onZoomIn,

    onZoomOut,

    onRotate,

    onFlipHorizontal,

    onFlipVertical,

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
            {/* Mode */}
            {/* ========================= */}

            <ToolbarGroup>

                <ToolbarButton

                    icon="✏️"

                    label="Edit"

                    selected={mode === "edit"}

                    onClick={() =>
                        onModeChange("edit")
                    }

                />

                <ToolbarButton

                    icon="💻​"

                    label="View"

                    selected={mode === "view"}

                    onClick={() =>
                        onModeChange("view")
                    }

                />

            </ToolbarGroup>

            <ToolbarDivider />

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

                    icon="🖼️"

                    label="Image"

                    onClick={onExportPNG}

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

                    disabled={

                        mode === "view" ||

                        !canUndo

                    }

                />

                <ToolbarButton

                    icon="↷"

                    label="Redo"

                    onClick={onRedo}

                    disabled={

                        mode === "view" ||

                        !canRedo

                    }

                />

            </ToolbarGroup>

            <ToolbarDivider />

            <ToolbarGroup>

                <ToolbarButton

                    icon="↻"

                    label="회전"

                    selected={false}

                    onClick={onRotate}

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="↔"

                    label="좌우반전"

                    selected={false}

                    onClick={onFlipHorizontal}

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="↕"

                    label="상하반전"

                    selected={false}

                    onClick={onFlipVertical}

                    disabled={mode === "view"}

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

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="🩹"

                    label="Erase"

                    selected={selectedTool === "eraser"}

                    onClick={() => onToolChange("eraser")}

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="🪣"

                    label="Fill"

                    selected={selectedTool === "fill"}

                    onClick={() => onToolChange("fill")}

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="⬚"

                    label="Select"

                    selected={selectedTool === "select"}

                    onClick={() => onToolChange("select")}

                    disabled={mode === "view"}

                />

                <ToolbarButton

                    icon="✋"

                    label="Move"

                    selected={selectedTool === "move"}

                    onClick={() => onToolChange("move")}

                    disabled={mode === "view"}

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