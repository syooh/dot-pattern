// ======================================================
// ToolbarButton
// Version : v1.0
// Last Update : 2026-07-16
//
// 역할
// 1. Toolbar의 공통 버튼
// ======================================================

interface Props {

    icon: string;

    label: string;

    selected?: boolean;

    disabled?: boolean;

    onClick?: () => void;

}

export default function ToolbarButton({

    icon,

    label,

    selected = false,

    disabled = false,

    onClick

}: Props) {

    return (

        <button

            type="button"

            onClick={onClick}

            disabled={disabled}

            style={{

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",

                gap: 4,

                width: 56,

                height: 56,

                border: "1px solid #D9D9D9",

                borderRadius: 8,

                background:

                    selected

                        ? "#4F8EF7"

                        : "#FFFFFF",

                color:

                    selected

                        ? "#FFFFFF"

                        : "#333333",

                cursor:

                    disabled

                        ? "not-allowed"

                        : "pointer",

                opacity:

                    disabled

                        ? 0.5

                        : 1,

                transition: "0.2s"

            }}

        >

            <span

                style={{

                    fontSize: 20,

                    lineHeight: 1

                }}

            >

                {icon}

            </span>

            <span

                style={{

                    fontSize: 11

                }}

            >

                {label}

            </span>

        </button>

    );

}