// ======================================================
// useSelectionEvents
// Version : v1.0
//
// 역할
// 1. Selection 상태를 관리한다.
// 2. Drag Selection을 생성한다.
// ======================================================

import type { Selection } from "../../../types/Selection";

interface Props {

    selection: Selection | null;

    onSelectionChange: (

        selection: Selection | null

    ) => void;

}

export function useSelectionEvents({

    selection,

    onSelectionChange

}: Props) {

    // ==========================================
    // Selection 시작
    // ==========================================

    function startSelection(

        x: number,

        y: number

    ) {

        onSelectionChange({

            startX: x,

            startY: y,

            endX: x,

            endY: y

        });

    }

    // ==========================================
    // Selection Drag
    // ==========================================

    function updateSelection(

        x: number,

        y: number

    ) {

        if (!selection) {

            return;

        }

        onSelectionChange({

            ...selection,

            endX: x,

            endY: y

        });

    }

    // ==========================================
    // Selection 제거
    // ==========================================

    function clearSelection() {

        onSelectionChange(null);

    }

    return {

        startSelection,

        updateSelection,

        clearSelection

    };

}