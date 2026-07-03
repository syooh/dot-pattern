// ======================================================
// PatternEditor
// Version : v0.5
// Last Update : 2026-07-03
//
// 역할
// 1. 새 도안 생성
// 2. 색상 팔레트 출력
// 3. 도안(Canvas) 출력
//
// 앞으로 추가될 기능
// - Toolbar
// - Undo / Redo
// - 확대 / 축소
// - 저장
// ======================================================

import PatternCanvas from "../components/canvas/PatternCanvas";
import ColorPalette from "../components/palette/ColorPalette";
import NewPatternDialog from "../components/dialog/NewPatternDialog";

import usePattern from "../hooks/usePattern";

export default function PatternEditor() {

    const {

        // 현재 도안
        pattern,

        // 현재 선택된 색상
        selectedColor,

        // 색상 선택
        setSelectedColor,

        // 새 도안 생성
        createPattern,

        // 한 칸 색칠
        paintPixel,

        // 색상 추가
        addColor

    } = usePattern();

    return (

        <div
            style={{
                padding: 20
            }}
        >

            <h1>🧶 Dot Pattern Editor</h1>

            {/* ========================= */}
            {/* 새 도안 생성 */}
            {/* ========================= */}

            {

                !pattern && (

                    <NewPatternDialog

                        onCreate={createPattern}

                    />

                )

            }

            {/* ========================= */}
            {/* 도안 생성 후 */}
            {/* ========================= */}

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
                        {/* 도안(Canvas) */}
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