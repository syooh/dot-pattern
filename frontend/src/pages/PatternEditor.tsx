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

export default function PatternEditor() {

    const {

        pattern,

        createPattern,

        selectedColor,

        setSelectedColor,

        paintPixel

    } = usePattern();

    // 아직 도안이 없으면
    // 새 도안 생성 화면을 보여준다.
    if (!pattern) {

        return (

            <NewPatternDialog

                onCreate={createPattern}

            />

        );

    }

    return (

        <div>

            <h1>뜨개질 도안 에디터</h1>

            <div

                style={{

                    display: "flex",

                    alignItems: "flex-start"

                }}

            >

                <ColorPalette

                    palette={pattern.palette}

                    selectedColor={selectedColor}

                    onSelectColor={setSelectedColor}

                />

                <PatternCanvas

                    pattern={pattern}
                    onPixelClick={paintPixel}

                />

            </div>

        </div>

    );

}