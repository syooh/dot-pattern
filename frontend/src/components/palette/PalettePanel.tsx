// ======================================================
// PalettePanel
// 역할
// 1. Palette 영역 UI
// ======================================================

import type { PatternData } from "../../types/Pattern";

import ColorPalette from "./ColorPalette";
import PanelCard from "../common/PanelCard";

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

        <PanelCard title="🎨 Palette">

            <ColorPalette

                palette={pattern.palette}

                selectedColor={selectedColor}

                onSelect={onSelectColor}

                onAddColor={onAddColor}

                onRemoveColor={onRemoveColor}

            />

        </PanelCard>

    );

}