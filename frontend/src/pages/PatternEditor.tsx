// ======================================================
// PatternEditor
// ------------------------------------------------------
// 역할
// 1. 새 도안 생성 화면 출력
// 2. 도안 생성 후 Palette와 Canvas 출력
// ======================================================

import PatternCanvas from "../components/canvas/PatternCanvas";
import ColorPalette from "../components/palette/ColorPalette";
import NewPatternDialog from "../components/dialog/NewPatternDialog";

import usePattern from "../hooks/usePattern";

/**
 * ==========================================
 * Pattern Editor
 * ==========================================
 *
 * 도안을 수정하는 메인 화면이다.
 *
 * 앞으로
 * - Toolbar
 * - Undo / Redo
 * - 확대 / 축소
 * - 저장
 * 등이 모두 여기에 추가된다.
 */
export default function PatternEditor() {

    const {

        pattern,

        setPattern,

        selectedColor,

        setSelectedColor,

        addColor

    } = usePattern();

    return (

        <div
            style={{
                padding: 20
            }}
        >

            <h1>🧶 Dot Pattern Editor</h1>

            {/* -------------------------------- */}
            {/* 새 도안 생성 */}
            {/* -------------------------------- */}

            {
                !pattern && (

                    <NewPatternDialog
                        onCreate={setPattern}
                    />

                )
            }

            {/* -------------------------------- */}
            {/* 도안이 만들어졌을 때 */}
            {/* -------------------------------- */}

            {
                pattern && (

                    <>

                        {/* ========================= */}
                        {/* 색상 팔레트 */}
                        {/* ========================= */}

                        <ColorPalette

                            palette={pattern.palette}

                            selectedColor={selectedColor}

                            onSelect={setSelectedColor}

                            onAddColor={addColor}

                        />

                        <div style={{ height: 20 }} />

                        {/* ========================= */}
                        {/* 도안 */}
                        {/* ========================= */}

                        <PatternCanvas

                            pattern={pattern}

                            selectedColor={selectedColor}

                            onChange={setPattern}

                        />

                    </>

                )
            }

        </div>

    );

}