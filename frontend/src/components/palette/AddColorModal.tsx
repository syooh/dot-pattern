// ======================================================
// AddColorModal
// Version : v1.0
// Last Update : 2026-09-02
//
// 역할
// 1. react-colorful Color Picker
// 2. HEX 입력
// 3. RGB 입력
// 4. Preview
// 5. Palette에 색 추가
// 6. Modal UI 제공
// ======================================================

import { useEffect, useState } from "react";

import { HexColorPicker } from "react-colorful";

import {
    hexToRgb,
    rgbToHex,
    clamp,
    isValidHex
} from "../../utils/ColorUtils";

import "./Palette.css";

interface Props {

    palette: string[];

    onAddColor: (hex: string) => void;

    onClose: () => void;

}

export default function AddColorModal({

    palette,

    onAddColor,

    onClose

}: Props) {

    // ==================================================
    // State
    // ==================================================

    const [hex, setHex] =
        useState("#000000");

    const rgb =
        hexToRgb(hex);

    // ==================================================
    // RGB 입력
    // ==================================================

    const updateRgb = (

        key: "r" | "g" | "b",

        value: number

    ) => {

        const next = {

            ...rgb,

            [key]: clamp(value)

        };

        setHex(

            rgbToHex(

                next.r,
                next.g,
                next.b

            )

        );

    };

    // ==================================================
    // 중복 검사
    // ==================================================

    const duplicated =

        palette.some(

            color =>

                color.toUpperCase() ===
                hex.toUpperCase()

        );

    // ==================================================
    // Enter
    // ==================================================

    useEffect(() => {

        const handleKeyDown = (

            event: KeyboardEvent

        ) => {

            if (

                event.key === "Escape"

            ) {

                onClose();

                return;

            }

            if (

                event.key === "Enter" &&
                !duplicated &&
                isValidHex(hex)

            ) {

                onAddColor(hex);

                onClose();

            }

        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

    }, [

        hex,
        duplicated,
        onAddColor,
        onClose

    ]);

    // ==================================================
    // Modal
    // ==================================================

    return (

        <div

            className="add-color-modal-overlay"

            onMouseDown={(e) => {

                if (

                    e.target === e.currentTarget

                ) {

                    onClose();

                }

            }}

        >

            <div

                className="add-color-modal"

                onMouseDown={(e) =>
                    e.stopPropagation()
                }

            >

                {/* ============================== */}
                {/* Header */}
                {/* ============================== */}

                <div className="add-color-modal-header">

                    <h3>

                        🎨 Add Color

                    </h3>

                    <button

                        className="add-color-modal-close"

                        onClick={onClose}

                    >

                        ×

                    </button>

                </div>

                {/* ============================== */}
                {/* Content */}
                {/* ============================== */}

                <div className="add-color-modal-content">

                    {/* Picker */}

                    <HexColorPicker

                        color={hex}

                        onChange={setHex}

                    />

                    {/* HEX */}

                    <label>

                        HEX

                    </label>

                    <input

                        className="hex-input"

                        value={hex}

                        onChange={(e) =>

                            setHex(
                                e.target.value
                            )

                        }

                    />

                    {/* RGB */}

                    <label>

                        RGB

                    </label>

                    <div className="rgb-input-group">

                        <div className="rgb-input-item">

                            <span>R</span>

                            <input

                                type="number"

                                value={rgb.r}

                                min={0}

                                max={255}

                                onChange={(e) =>

                                    updateRgb(
                                        "r",
                                        Number(e.target.value)
                                    )

                                }

                            />

                        </div>

                        <div className="rgb-input-item">

                            <span>G</span>

                            <input

                                type="number"

                                value={rgb.g}

                                min={0}

                                max={255}

                                onChange={(e) =>

                                    updateRgb(
                                        "g",
                                        Number(e.target.value)
                                    )

                                }

                            />

                        </div>

                        <div className="rgb-input-item">

                            <span>B</span>

                            <input

                                type="number"

                                value={rgb.b}

                                min={0}

                                max={255}

                                onChange={(e) =>

                                    updateRgb(
                                        "b",
                                        Number(e.target.value)
                                    )

                                }

                            />

                        </div>

                    </div>

                    {/* Preview */}

                    <label>

                        Preview

                    </label>

                    <div

                        className="color-preview"

                        style={{

                            background: hex

                        }}

                    />

                    {/* Error */}

                    {

                        !isValidHex(hex) && (

                            <p className="color-error">

                                HEX 형식이 올바르지 않습니다.

                            </p>

                        )

                    }

                    {

                        duplicated && (

                            <p className="color-error">

                                이미 존재하는 색상입니다.

                            </p>

                        )

                    }

                </div>

                {/* ============================== */}
                {/* Footer */}
                {/* ============================== */}

                <div className="add-color-modal-footer">

                    <button

                        className="cancel-color-button"

                        onClick={onClose}

                    >

                        취소

                    </button>

                    <button

                        className="submit-color-button"

                        disabled={

                            duplicated ||
                            !isValidHex(hex)

                        }

                        onClick={() => {

                            onAddColor(hex);

                            onClose();

                        }}

                    >

                        색 추가

                    </button>

                </div>

            </div>

        </div>

    );

}