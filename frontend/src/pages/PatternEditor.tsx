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
import type { Selection } from "../types/Selection";
import { fillSelection } from "../engine/PatternEngine";
import { useKeyboardShortcuts } from "../components/canvas/hooks/useKeyBoardShortcuts";
import { generatePattern } from "../api/patternApi";
import { exportPatternAsPNG } from "../utils/exportPng";

import NewPatternDialog from "../components/dialog/NewPatternDialog";
import PatternPanel from "../components/panel/PatternPanel";
import Toolbar from "../components/toolbar/Toolbar";
import Workspace from "../components/workspace/Workspace";
import EditorLayout from "../components/layout/EditorLayout";
import PalettePanel from "../components/palette/PalettePanel";
import StatusBar from "../components/workspace/StatusBar";
import usePattern from "../hooks/usePattern";
import LeftPanel from "../components/layout/LeftPanel";
import useCamera from "../hooks/useCamera";
import ImportImagePanel from "../components/panel/ImportImagePanel";


export default function PatternEditor() {

    const {

        pattern,

        setPattern,

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

        loadPattern,

        copySelection,

        clipboard,

        isPasteMode,

        setIsPasteMode,

        paste,

        moveCurrentSelection,

        rotateCurrentSelection,

        flipCurrentSelection,

        flipCurrentSelectionVertical,

    } = usePattern();

    const [selection, setSelection] =

        useState<Selection | null>(null);

    const [pastePreview, setPastePreview] =

        useState<{

            x: number;

            y: number;

        } | null>(null);

    function handleDeleteSelection() {

        if (!pattern || !selection) {

            return;

        }

        setPattern(

            fillSelection(

                pattern,

                selection,

                0

            )

        );

    }

    function handleCanvasClick(

        x: number,

        y: number

    ) {

        if (

            isPasteMode &&

            clipboard

        ) {

            paste(

                clipboard,

                x,

                y

            );

            setPastePreview(null);

            setIsPasteMode(false);

            return;

        }

        paintPixel(

            x,

            y

        );

    }

    useKeyboardShortcuts({

        onEscape: () => {

            // ==========================
            // Paste Mode 취소
            // ==========================

            if (isPasteMode) {

                setIsPasteMode(false);

                setPastePreview(null);

                return;

            }

            // ==========================
            // Selection 해제
            // ==========================

            setSelection(null);

        },

        onDelete: handleDeleteSelection,

        onCopy: () => {

            if (!selection) {

                return;

            }

            copySelection(selection);

        },

        onCut: () => {

            if (!selection) {

                return;

            }

            copySelection(selection);

            handleDeleteSelection();

        },

        onPaste: () => {

            if (!clipboard) {

                return;

            }

            console.log("Paste Mode");

            setIsPasteMode(true);

        },

        onUndo: undo,

        onRedo: redo

    });

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

    function handleMoveSelection() {

        if (!selection) {

            return;

        }

        moveCurrentSelection(selection);

        setSelection(null);

    }

    // ==================================================
    // TODO
    // Rotate / Flip / Mirror 이후 Selection 갱신은
    // SelectionUtils로 분리 예정
    // ==================================================

    function handleRotateSelection() {

        if (!selection) {

            return;

        }

        rotateCurrentSelection(selection);

        const left = Math.min(selection.startX, selection.endX);
        const top = Math.min(selection.startY, selection.endY);

        const width =
            Math.abs(selection.endX - selection.startX) + 1;

        const height =
            Math.abs(selection.endY - selection.startY) + 1;

        setSelection({

            startX: left,
            startY: top,

            endX: left + height - 1,
            endY: top + width - 1,

            offsetX: 0,
            offsetY: 0

        });

    }

    function handleFlipHorizontal() {

        if (!selection) {

            return;

        }

        flipCurrentSelection(selection);

    }

    function handleFlipVertical() {

        if (!selection) {

            return;

        }

        flipCurrentSelectionVertical(selection);

    }

    async function handleImportImage(

        file: File,

        width: number,

        height: number | null,

        colors: number

    ) {

        try {

            const newPattern = await generatePattern(

                file,

                width,

                height,

                colors

            );

            setPattern(newPattern);

        }

        catch (err) {

            console.error(err);

            alert("도안 생성에 실패했습니다.");

        }

    }

    const handleExportPNG = () => {

        if (!pattern) return;

        exportPatternAsPNG(pattern);

    };

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

                🧶 도안 편집기

            </h1>

            {/* -------------------------------- */}
            {/* 새 도안 생성 */}
            {/* -------------------------------- */}

            {/* {

                !pattern && (

                    <NewPatternDialog

                        onCreate={createPattern}

                    />

                )

            } */}

            {/* -------------------------------- */}
            {/* 도안이 생성된 이후 */}
            {/* -------------------------------- */}

                        {/* ========================= */}
                        {/* Toolbar */}
                        {/* ========================= */}

                        <Toolbar

                            onNew={handleNewPattern}

                            onSave={handleSavePattern}

                            onExportPNG={handleExportPNG}

                            onOpen={handleOpenPattern}

                            onUndo={undo}

                            onRedo={redo}

                            canUndo={canUndo}

                            canRedo={canRedo}

                            onRotate={handleRotateSelection}

                            onFlipHorizontal={handleFlipHorizontal}

                            onFlipVertical={handleFlipVertical}

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

                                    pattern={
                                        <PatternPanel
                                            onCreate={createPattern}
                                        />
                                    }

                                    imageImport={
                                        <ImportImagePanel
                                            onImport={handleImportImage}
                                        />
                                    }

                                    palette={

                                        <>

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

                                        </>

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

                                    selection={selection}

                                    selectedTool={selectedTool}

                                    onSelectionChange={setSelection}

                                    onMoveSelection={handleMoveSelection}

                                    onHoverChange={setHoverCell}

                                    camera={camera}

                                    onPixelClick={handleCanvasClick}

                                    isPasteMode={isPasteMode}
                                    
                                    clipboard={clipboard}

                                    pastePreview={pastePreview}

                                    onPastePreviewChange={setPastePreview}

                                />

                            }

                        />

        </div>

    );

}