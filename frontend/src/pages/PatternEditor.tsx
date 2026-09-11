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
import ServerPatternPanel from "../components/panel/ServerPatternPanel";
import PublicPatternPanel from "../components/panel/PublicPatternPanel";
import AuthBar from "../components/auth/AuthBar";




export default function PatternEditor() {

    const {

        pattern,

        setPattern,

        replacePattern,

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

    const [selection, setSelection] = useState<Selection | null>(null);

    const [mode, setMode] = useState<"edit" | "view">("edit");

    const [currentRow, setCurrentRow] = useState<number>(1);

    // ==================================================
    // 서버에 저장된 현재 Pattern의 ID
    //
    // null:
    // 아직 서버에 저장되지 않은 도안
    //
    // 숫자:
    // Django에 저장된 Pattern
    // ==================================================

    const [savedPatternId, setSavedPatternId] =
        useState<number | null>(null);

    // Public Pattern 목록 새로고침을 위한 상태
    const [publicPatternRefreshKey, setPublicPatternRefreshKey] =
        useState(0);

    useEffect(() => {

        if (mode === "view") {

            setCurrentRow(1);

        }

    }, [mode]);

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

        // View Mode에서는 패턴을 수정하지 않는다.
        if (mode === "view") {
            return;
        }

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

            if (mode === "view") {
                return;
            }

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

        onDelete: () => {

            if (mode === "view") {
                return;
            }

            handleDeleteSelection();
        },

        onCopy: () => {

            if (mode === "view") {
                return;
            }

            if (!selection) {

                return;

            }

            copySelection(selection);

        },

        onCut: () => {

            if (!selection) {
                return;
            }

            if (!selection) {

                return;

            }

            copySelection(selection);

            handleDeleteSelection();

        },

        onPaste: () => {

            if (!selection) {
                return;
            }

            if (!clipboard) {

                return;

            }

            console.log("Paste Mode");

            setIsPasteMode(true);

        },

        onUndo: () => {

            if (mode === "view") {
                return;
            }

            undo();
        },

        onRedo: () => {

            if (mode === "view") {
                return;
            }

            redo();
        }

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


        // 새로운 도안이므로
        // 기존 서버 Pattern과 연결을 끊는다.
        setSavedPatternId(null);

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
            
            // ==========================
            // View Mode에서는
            // 편집 도구 단축키를 막는다.
            // ==========================
            if (mode === "view") {
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

    }, [mode, setSelectedTool]);

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

                    setSavedPatternId(null);

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

            // 새로운 Pattern으로 교체한다.
            // selectedColor도 새로운 Palette에 맞춰진다.
            replacePattern(newPattern);

            // 이미지에서 새로 생성한 도안이므로
            // 기존 서버 Pattern과 연결하지 않는다.
            setSavedPatternId(null);

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

            <AuthBar />

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

                            mode={mode}
                            
                            onModeChange={setMode}

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
                                            onCreate={(width, height) => {

                                                createPattern(
                                                    width,
                                                    height
                                                );

                                                // 새로운 도안이므로
                                                // 기존 서버 Pattern 연결을 제거한다.
                                                setSavedPatternId(null);

                                            }}
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

                                    serverPattern={

                                        <ServerPatternPanel

                                            pattern={pattern}

                                            onLoadPattern={loadPattern}

                                            savedPatternId={savedPatternId}

                                            onSavedPatternIdChange={
                                                setSavedPatternId
                                            }

                                            onSaveSuccess={() => {
                                                setPublicPatternRefreshKey(
                                                    prev => prev + 1
                                                );
                                            }}

                                        />

                                    }

                                    publicPattern={
                                        <PublicPatternPanel
                                            onLoadPattern={(publicPattern) => {
                                                /**
                                                 * Public Pattern은 다른 사용자의 서버 Pattern이므로
                                                 * 현재 사용자의 저장 Pattern과 연결하지 않는다.
                                                 *
                                                 * replacePattern()을 사용하면
                                                 * 새로운 Palette에 맞게 selectedColor도 동기화된다.
                                                 */
                                                replacePattern(publicPattern);

                                                // Public Pattern을 불러오면
                                                // 현재 저장된 Pattern과의 연결을 끊는다.
                                                setSavedPatternId(null);
                                            }}
                                            // 서버 저장 성공 시 Public 목록을 새로 조회한다.
                                            refreshKey={publicPatternRefreshKey}
                                        />
                                    }

                                    statusBar={

                                        <StatusBar

                                            tool={selectedTool}

                                            selectedColorHex={
                                                pattern.palette[selectedColor]?.hex ??
                                                pattern.palette[0]?.hex ??
                                                "#000000"
                                            }

                                            patternWidth={pattern.width}

                                            patternHeight={pattern.height}

                                            showGrid={showGrid}

                                            hoverCell={hoverCell}

                                            currentRow={currentRow}

                                            mode={mode}

                                            onPreviousRow={() => {
                                                setCurrentRow(prev =>
                                                    Math.max(1, prev - 1)
                                                );
                                            }}

                                            onNextRow={() => {
                                                setCurrentRow(prev =>
                                                    Math.min(
                                                        pattern.height,
                                                        prev + 1
                                                    )
                                                );
                                            }}

                                        />

                                    }
                                
                                />

                            }

                            workspace={

                                <Workspace

                                    pattern={pattern}

                                    showGrid={showGrid}

                                    mode={mode}

                                    currentRow={currentRow}

                                    onCurrentRowChange={setCurrentRow}

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