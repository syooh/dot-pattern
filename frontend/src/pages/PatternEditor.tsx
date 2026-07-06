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

export default function PatternEditor() {

    const {

        pattern,

        createPattern,

        selectedColor,

        setSelectedColor,

        addColor,

        removeColor,

        paintPixel,

        undo

    } = usePattern();

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

                            onRedo={() => { }}

                        />

                        {/* ========================= */}
                        {/* Palette */}
                        {/* ========================= */}

                        <ColorPalette

                            palette={pattern.palette}

                            selectedColor={selectedColor}

                            onSelect={setSelectedColor}

                            onAddColor={addColor}

                            onRemoveColor={removeColor}

                        />

                        <div
                            style={{
                                height: 20
                            }}
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