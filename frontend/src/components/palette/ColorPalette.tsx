// ======================================================
// ColorPalette
// Version : v2.0
// Last Update : 2026-07-09
//
// 역할
// 1. 팔레트 출력
// 2. 색 선택
// 3. 색 추가 패널
// 4. 색 삭제
// ======================================================

import { useState } from "react";

import type {

    PaletteColor

} from "../../types/Pattern";

import AddColorPanel from "./AddColorPanel";

import "./Palette.css";

interface Props {

    palette: PaletteColor[];

    selectedColor: number;

    onSelect: (id: number) => void;

    onAddColor: (hex: string) => void;

    onRemoveColor?: (id: number) => void;

}

export default function ColorPalette({

    palette,

    selectedColor,

    onSelect,

    onAddColor,

    onRemoveColor

}: Props) {

    //--------------------------------------------------

    const [showPanel, setShowPanel] =

        useState(false);

    //--------------------------------------------------

    return (

        <div className="palette">

            <h3 className="palette-title">

                🎨 Palette

            </h3>

            <div className="palette-list">

                {/* Add Button */}

                <button

                    className="add-color-button"

                    onClick={() =>

                        setShowPanel(

                            prev => !prev

                        )

                    }

                >

                    +

                </button>

                {/* Palette */}

                {

                    palette.map(color => (

                        <div

                            key={color.id}

                            className="palette-color"

                        >

                            <button

                                className={

                                    selectedColor === color.id

                                        ? "color-button selected"

                                        : "color-button"

                                }

                                style={{

                                    background:

                                        color.hex

                                }}

                                onClick={() =>

                                    onSelect(

                                        color.id

                                    )

                                }

                            />

                            {

                                color.id > 1 &&

                                onRemoveColor && (

                                    <button

                                        className="delete-color-button"

                                        onClick={() =>

                                            onRemoveColor(

                                                color.id

                                            )

                                        }

                                    >

                                        ❌

                                    </button>

                                )

                            }

                        </div>

                    ))

                }

            </div>

            {/* Add Color Panel */}

            {

                showPanel && (

                    <AddColorPanel

                        palette={

                            palette.map(

                                color =>

                                    color.hex

                            )

                        }

                        onAddColor={

                            onAddColor

                        }

                        onClose={() =>

                            setShowPanel(false)

                        }

                    />

                )

            }

        </div>

    );

}