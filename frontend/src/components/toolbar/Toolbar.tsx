// ======================================================
// Toolbar
// Version : v0.7
// Last Update : 2026-07-06
//
// 역할
// 1. 편집 기능 버튼을 출력한다.
// 2. 버튼 클릭 이벤트를 부모에게 전달한다.
// 3. 실제 기능은 수행하지 않는다.
//
// 앞으로 추가될 기능
// - Undo
// - Redo
// - Brush
// - Eraser
// - Fill
// - Save
// - Open
// ======================================================

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

                gap: 10,

                padding: 12,

                marginBottom: 20,

                border: "1px solid #cccccc",

                borderRadius: 8,

                background: "#f5f5f5",

                flexWrap: "wrap"

            }}

        >

            <button>

                🆕 새 도안

            </button>

            <button>

                💾 저장

            </button>

            <button>

                📂 열기

            </button>

            <div style={{ width: 20 }} />

            <button

                onClick={onUndo}

                disabled={!canUndo}

                style={{
                    opacity: canUndo ? 1 : 0.5,
                    
                }}

            >

                ↶ Undo

            </button>

            <button

                onClick={onRedo}

                disabled={!canRedo}

                style={{
                    opacity: canRedo ? 1 : 0.5,

                }}

            >

                ↷ Redo

            </button>

            <div style={{ width: 20 }} />

            <button

                onClick={() =>

                    onToolChange("brush")

                }

                style={{

                    background:

                        selectedTool === "brush"

                            ? "#4CAF50"

                            : "#ffffff"

                }}

            >

                🖌 Brush

            </button>

            <button

                onClick={() =>

                    onToolChange("eraser")

                }

                style={{

                    background:

                        selectedTool === "eraser"

                            ? "#4CAF50"

                            : "#ffffff"

                }}

            >

                🩹 Eraser

            </button>

            <button

                onClick={() =>

                    onToolChange("fill")

                }

                style={{

                    background:

                        selectedTool === "fill"

                            ? "#4CAF50"

                            : "#ffffff"

                }}

            >

                🪣 Fill

            </button>

        </div>

    );

}