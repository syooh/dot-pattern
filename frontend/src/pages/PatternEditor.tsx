// ======================================================
// PatternEditor
// Version : v0.7
// Last Update : 2026-07-06
//
// 역할
// 1. 새 도안 생성
// 2. Toolbar 출력
// 3. Palette 출력
// 4. Canvas 출력
// ======================================================

import PatternCanvas from "../components/canvas/PatternCanvas";
import ColorPalette from "../components/palette/ColorPalette";
import NewPatternDialog from "../components/dialog/NewPatternDialog";
import Toolbar from "../components/toolbar/Toolbar";

import usePattern from "../hooks/usePattern";

import { useEffect } from "react";

export default function PatternEditor() {

    const {

        pattern,

        createPattern,

        selectedColor,

        setSelectedColor,

        selectedTool,

        setSelectedTool,

        addColor,

        removeColor,

        paintPixel,

        undo,

        redo,

        canUndo,

        canRedo

    } = usePattern();

    useEffect(() => {

        const handleKeyDown = (

            event: KeyboardEvent

        ) => {

            const target = event.target as HTMLElement;

            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA"
            ) {
                return;
            }

            switch (

            event.key.toLowerCase()

            ) {

                case "b":

                    setSelectedTool("brush");

                    break;

                case "e":

                    setSelectedTool("eraser");

                    break;

                case "f":

                    setSelectedTool("fill");

                    break;

            }

        };

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () => {

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

        };

    }, [setSelectedTool]);

    return (

        <div
            style={{
                padding: 20
            }}
        >

            <h1>

                🧶 Dot Pattern Editor

            </h1>

            {/* -------------------------------- */}
            {/* 새 도안 생성 */}
            {/* -------------------------------- */}

            {

                !pattern && (

                    <NewPatternDialog

                        onCreate={createPattern}

                    />

                )

            }

            {/* -------------------------------- */}
            {/* 도안이 생성된 이후 */}
            {/* -------------------------------- */}

            {

                pattern && (

                    <>

                        {/* ========================= */}
                        {/* Toolbar */}
                        {/* ========================= */}

                        <Toolbar

                            onUndo={undo}

                            onRedo={redo}

                            canUndo={canUndo}

                            canRedo={canRedo}

                            selectedTool={selectedTool}

                            onToolChange={setSelectedTool}

                        />

                        {/* ========================= */}
                        {/* Palette */}
                        {/* ========================= */}

                        <ColorPalette

                            palette={pattern.palette}

                            selectedColor={selectedColor}

                            onSelect={setSelectedColor}

                            onAddColor={(hex) => {

                                const newId = addColor(hex);

                                if (newId !== undefined) {

                                    setSelectedColor(newId);

                                }

                            }}

                            onRemoveColor={removeColor}

                        />

                        {/* ========================= */}
                        {/* Canvas */}
                        {/* ========================= */}

                        <PatternCanvas

                            pattern={pattern}

                            onPixelClick={paintPixel}

                        />

                    </>

                )

            }

        </div>

    );

}