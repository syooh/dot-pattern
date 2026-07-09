// ======================================================
// AddColorPanel
// Version : v2.0
// Last Update : 2026-07-09
//
// 역할
// 1. react-colorful Color Picker
// 2. HEX 입력
// 3. RGB 입력
// 4. Preview
// 5. Palette에 색 추가
// ======================================================

import { useEffect, useState } from "react";

import {

    HexColorPicker

} from "react-colorful";

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

export default function AddColorPanel({

    palette,

    onAddColor,

    onClose

}: Props) {

    //--------------------------------------------------
    // State
    //--------------------------------------------------

    const [hex, setHex] =
        useState("#000000");

    const rgb =
        hexToRgb(hex);

    //--------------------------------------------------
    // RGB 입력
    //--------------------------------------------------

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

    //--------------------------------------------------
    // 중복 검사
    //--------------------------------------------------

    const duplicated =

        palette.some(

            color =>

                color.toUpperCase()

                ===

                hex.toUpperCase()

        );

    //--------------------------------------------------
    // Enter
    //--------------------------------------------------

    useEffect(() => {

        const handleKeyDown = (

            event: KeyboardEvent

        ) => {

            if (

                event.key === "Enter" &&

                !duplicated

            ) {

                onAddColor(hex);

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

        onAddColor

    ]);

    //--------------------------------------------------

    return (

        <div className="add-color-panel">

            <h4>

                Add Color

            </h4>

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

            <div className="rgb-row">

                <span>

                    R

                </span>

                <input

                    type="number"

                    value={rgb.r}

                    onChange={(e) =>

                        updateRgb(

                            "r",

                            Number(

                                e.target.value

                            )

                        )

                    }

                />

            </div>

            <div className="rgb-row">

                <span>

                    G

                </span>

                <input

                    type="number"

                    value={rgb.g}

                    onChange={(e) =>

                        updateRgb(

                            "g",

                            Number(

                                e.target.value

                            )

                        )

                    }

                />

            </div>

            <div className="rgb-row">

                <span>

                    B

                </span>

                <input

                    type="number"

                    value={rgb.b}

                    onChange={(e) =>

                        updateRgb(

                            "b",

                            Number(

                                e.target.value

                            )

                        )

                    }

                />

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

            {

                duplicated && (

                    <p

                        style={{

                            color: "red",

                            marginTop: 10

                        }}

                    >

                    </p>

                )

            }

            {

                !isValidHex(hex) && (

                    <p

                        style={{

                            color: "red",

                            marginTop: 10

                        }}

                    >

                        HEX 형식이 올바르지 않습니다.

                    </p>

                )

            }

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

    );

}