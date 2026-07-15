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

import NewPatternDialog from "../components/dialog/NewPatternDialog";
import Toolbar from "../components/toolbar/Toolbar";
import Workspace from "../components/workspace/Workspace";
import EditorLayout from "../components/layout/EditorLayout";
import PalettePanel from "../components/palette/PalettePanel";

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

                width: "100%",

                minHeight: "100vh",

                padding: 20,

                boxSizing: "border-box",

                background: "#F5F5F5"

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

                        <EditorLayout

                            palette={

                                <PalettePanel

                                    pattern={pattern}

                                    selectedColor={selectedColor}

                                    onSelectColor={setSelectedColor}

                                    onAddColor={(hex) => {

                                        const newId = addColor(hex);

                                        if (newId !== undefined) {

                                            setSelectedColor(newId);

                                        }

                                    }}

                                    onRemoveColor={removeColor}

                                />

                            }

                            workspace={

                                <Workspace

                                    pattern={pattern}

                                    onPixelClick={paintPixel}

                                />

                            }

                        />

                    </>

                )

            }

        </div>

    );

}