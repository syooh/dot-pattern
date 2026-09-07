// ======================================================
// StatusBar
// Version : v2.1
// Last Update : 2026-07-16
//
// 역할
// 1. 현재 편집 상태 출력
// ======================================================

import PanelCard from "../common/PanelCard";

interface Props {

    tool: string;

    selectedColorHex: string;

    patternWidth: number;

    patternHeight: number;

    showGrid: boolean;

    hoverCell: {

        x: number;

        y: number;

    } | null;

    currentRow: number;

    mode: "edit" | "view";

    onPreviousRow: () => void;

    onNextRow: () => void;

}

export default function StatusBar({

    tool,

    selectedColorHex,

    patternWidth,

    patternHeight,

    hoverCell,

    currentRow,

    mode,

    onPreviousRow,

    onNextRow

}: Props) {

    // ==========================================
    // 화면에 표시할 열 / 행 번호
    // ==========================================

    const displayColumn = hoverCell
        ? patternWidth - hoverCell.x
        : null;

    const displayRow = hoverCell
        ? patternHeight - hoverCell.y
        : null;


    // ==========================================
    // 현재 작업 진행률
    // ==========================================

    const progress = Math.round(
        (currentRow / patternHeight) * 100
    );

    return (

        <PanelCard title="📊 Status">

            {/* Tool */}

            <StatusItem

                icon="🖌"

                title="Tool"

            >

                {tool}

            </StatusItem>


            {/* Color */}

            <StatusItem

                icon="🎨"

                title="Color"

            >

                <div

                    style={{

                        display: "flex",

                        alignItems: "center",

                        gap: 6

                    }}

                >

                    <div

                        style={{

                            width: 14,

                            height: 14,

                            borderRadius: 3,

                            background: selectedColorHex,

                            border: "1px solid #AAA" 

                        }}

                    />

                    {selectedColorHex}

                </div>

            </StatusItem>


            {/* Pattern */}

            <StatusItem

                icon="📐"

                title="Pattern"

            >

                {patternWidth} × {patternHeight}

            </StatusItem>

            {/* Current Row */}

            <StatusItem

                icon="🧶"

                title="Row"

            >

                {currentRow} / {patternHeight}

            </StatusItem>

            <div
                style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 6
                }}
            >
                {/* 이전 행 */}
                <button
                    type="button"
                    onClick={onPreviousRow}
                    disabled={
                        mode === "edit" ||
                        currentRow <= 1
                    }
                    style={{
                        flex: 1,
                        height: 36,
                        padding: "0 12px",
                        borderRadius: 6,
                        border: "none",

                        background:
                            mode === "edit" || currentRow <= 1
                                ? "#D9D9D9"
                                : "#4A90E2",

                        color:
                            mode === "edit" || currentRow <= 1
                                ? "#999"
                                : "#FFF",

                        fontWeight: 600,

                        cursor:
                            mode === "edit" || currentRow <= 1
                                ? "default"
                                : "pointer",

                        boxSizing: "border-box"
                    }}
                >
                    ◀ 이전
                </button>

                {/* 다음 행 */}
                <button
                    type="button"
                    onClick={onNextRow}
                    disabled={
                        mode === "edit" ||
                        currentRow >= patternHeight
                    }
                    style={{
                        flex: 1,
                        height: 36,
                        padding: "0 12px",
                        borderRadius: 6,
                        border: "none",

                        background:
                            mode === "edit" || currentRow >= patternHeight
                                ? "#D9D9D9"
                                : "#4A90E2",

                        color:
                            mode === "edit" || currentRow >= patternHeight
                                ? "#999"
                                : "#FFF",

                        fontWeight: 600,

                        cursor:
                            mode === "edit" || currentRow >= patternHeight
                                ? "default"
                                : "pointer",

                        boxSizing: "border-box"
                    }}
                >
                    다음 ▶
                </button>
            </div>

            {/* Progress */}

            <StatusItem

                icon="📈"

                title="Progress"

            >

                {progress}%

            </StatusItem>

            {/* Cursor */}

            <StatusItem

                icon="📍"

                title="Cursor"

            >

                {

                    hoverCell
                        ? `(${displayColumn}, ${displayRow})`
                        : "-"

                }

            </StatusItem>

        </PanelCard>

    );

}


interface StatusItemProps {

    icon: string;

    title: string;

    children: React.ReactNode;

}


function StatusItem({

    icon,

    title,

    children

}: StatusItemProps) {

    return (

        <div

            style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                padding: "5px 0"

            }}

        >

            <div

                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: 5,

                    color: "#666",

                    fontSize: 13

                }}

            >

                <span>{icon}</span>

                <span>{title}</span>

            </div>


            <div

                style={{

                    fontWeight: 600,

                    color: "#333",

                    fontSize: 13

                }}

            >

                {children}

            </div>

        </div>

    );

}