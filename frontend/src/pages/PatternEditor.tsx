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

import { useEffect, useState } from "react";

import NewPatternDialog from "../components/dialog/NewPatternDialog";
import Toolbar from "../components/toolbar/Toolbar";
import Workspace from "../components/workspace/Workspace";
import EditorLayout from "../components/layout/EditorLayout";
import PalettePanel from "../components/palette/PalettePanel";
import StatusBar from "../components/workspace/StatusBar";
import usePattern from "../hooks/usePattern";
import LeftPanel from "../components/layout/LeftPanel";
import useCamera from "../hooks/useCamera";

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

        canRedo,

        showGrid,

        setShowGrid,

        clearPattern,

        loadPattern

    } = usePattern();

    const {

        camera,

        setCamera

    } = useCamera();

    function handleZoomIn() {

        setCamera(prev => ({

            ...prev,

            zoom: Math.min(prev.zoom + 0.1, 4)

        }));

    }

    function handleZoomOut() {

        setCamera(prev => ({

            ...prev,

            zoom: Math.max(prev.zoom - 0.1, 0.2)

        }));

    }

    function handleNewPattern() {

        const ok = window.confirm(

            "현재 작업을 종료하고 새 도안을 만드시겠습니까?"

        );

        if (!ok) return;

        clearPattern();

    }

    const [hoverCell, setHoverCell] = useState<{

        x: number;

        y: number;

    } | null>(null);

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

    function handleSavePattern() {

        if (!pattern) return;

        const now = new Date();

        const yyyy = now.getFullYear();

        const mm = String(now.getMonth() + 1).padStart(2, "0");

        const dd = String(now.getDate()).padStart(2, "0");

        const hh = String(now.getHours()).padStart(2, "0");

        const min = String(now.getMinutes()).padStart(2, "0");

        const ss = String(now.getSeconds()).padStart(2, "0");

        const fileName =

            `dot-pattern_${yyyy}-${mm}-${dd}_${hh}${min}${ss}.json`;

        const json = JSON.stringify(

            pattern,

            null,

            2

        );

        const blob = new Blob(

            [json],

            {

                type: "application/json"

            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = fileName;

        link.click();

        URL.revokeObjectURL(url);

    }

    function handleOpenPattern() {

        console.log("open");

        const input = document.createElement("input");

        input.type = "file";

        input.accept = ".json";

        input.onchange = (event) => {

            const file =

                (event.target as HTMLInputElement)

                    .files?.[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = () => {

                try {

                    const json =

                        JSON.parse(

                            reader.result as string

                        );

                    loadPattern(json);

                }

                catch {

                    alert(

                        "올바른 Pattern 파일이 아닙니다."

                    );

                }

            };

            reader.readAsText(file);

        };

        input.click();

    }



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

                            onNew={handleNewPattern}

                            onSave={handleSavePattern}

                            onOpen={handleOpenPattern}

                            onUndo={undo}

                            onRedo={redo}

                            canUndo={canUndo}

                            canRedo={canRedo}

                            selectedTool={selectedTool}

                            onToolChange={setSelectedTool}

                            showGrid={showGrid}

                            zoom={camera.zoom}

                            onZoomIn={handleZoomIn}

                            onZoomOut={handleZoomOut}

                            onToggleGrid={() =>

                                setShowGrid(prev => !prev)

                            }

                        />

                        {/* ========================= */}
                        {/* Palette */}
                        {/* ========================= */}

                        <EditorLayout

                            leftPanel={
                                
                                <LeftPanel

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

                                    statusBar={

                                        <StatusBar

                                            tool={selectedTool}

                                            selectedColorHex={
                                                pattern.palette[selectedColor].hex
                                            }

                                            patternWidth={pattern.width}

                                            patternHeight={pattern.height}

                                            showGrid={showGrid}

                                            hoverCell={hoverCell}

                                        />

                                    }
                                
                                />

                            }

                            workspace={

                                <Workspace

                                    pattern={pattern}

                                    showGrid={showGrid}

                                    hoverCell={hoverCell}

                                    onHoverChange={setHoverCell}

                                    camera={camera}

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