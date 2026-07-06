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

interface Props {

    onUndo?: () => void;

    onRedo?: () => void;

    canUndo?: boolean;

    canRedo?: boolean;

}

export default function Toolbar({

    onUndo,

    onRedo,

    canUndo,

    canRedo

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

            <button>

                🖌 Brush

            </button>

            <button>

                🩹 Eraser

            </button>

            <button>

                🪣 Fill

            </button>

        </div>

    );

}