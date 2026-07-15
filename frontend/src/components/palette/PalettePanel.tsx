// ======================================================
// PalettePanel
// 역할
// 1. Palette 영역 UI
// ======================================================

import type { PatternData } from "../../types/Pattern";

import ColorPalette from "./ColorPalette";

interface Props {

    pattern: PatternData;

    selectedColor: number;

    onSelectColor: (id: number) => void;

    onAddColor: (hex: string) => void;

    onRemoveColor: (id: number) => void;

}

export default function PalettePanel({

    pattern,

    selectedColor,

    onSelectColor,

    onAddColor,

    onRemoveColor

}: Props) {

    return (

        <div

            style={{

                background: "#FFFFFF",

                border: "1px solid #D8D8D8",

                borderRadius: 8,

                padding: 16

            }}

        >

            <h3

                style={{

                    marginTop: 0,

                    marginBottom: 16

                }}

            >

                🎨 Palette

            </h3>

            <ColorPalette

                palette={pattern.palette}

                selectedColor={selectedColor}

                onSelect={onSelectColor}

                onAddColor={onAddColor}

                onRemoveColor={onRemoveColor}

            />

        </div>

    );

}