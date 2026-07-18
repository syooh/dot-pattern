// ======================================================
// StatusBar
// Version : v2.1
// Last Update : 2026-07-16
//
// 역할
// 1. 현재 편집 상태 출력
// ======================================================

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

}

export default function StatusBar({

    tool,

    selectedColorHex,

    patternWidth,

    patternHeight,

    showGrid,

    hoverCell

}: Props) {

    return (

        <div

            style={{

                background: "#FFFFFF",

                border: "1px solid #D9D9D9",

                borderRadius: 8,

                padding: 16,

                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"

            }}

        >

            <h3

                style={{

                    margin: "0 0 16px 0",

                    fontSize: 16,

                    fontWeight: 600,

                    color: "#444"

                }}

            >

                📊 Status

            </h3>

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

                        gap: 8

                    }}

                >

                    <div

                        style={{

                            width: 16,

                            height: 16,

                            borderRadius: 4,

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

            {/* Cursor */}

            <StatusItem

                icon="📍"

                title="Cursor"

            >

                {

                    hoverCell

                        ? `(${hoverCell.x}, ${hoverCell.y})`

                        : "-"

                }

            </StatusItem>

        </div>

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

                padding: "10px 0",

            }}

        >

            <div

                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: 6,

                    color: "#666",

                    fontSize: 14

                }}

            >

                <span>{icon}</span>

                <span>{title}</span>

            </div>

            <div

                style={{

                    fontWeight: 600,

                    color: "#333",

                    fontSize: 16

                }}

            >

                {children}

            </div>

        </div>

    );

}