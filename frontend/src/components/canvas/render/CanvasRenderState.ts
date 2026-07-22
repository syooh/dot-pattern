// ======================================================
// CanvasRenderState
// Version : v1.0
//
// 역할
// Canvas를 렌더링하기 위한 모든 상태를 관리한다.
// ======================================================

import type { PatternData } from "../../../types/Pattern";
import type { CameraState } from "../camera/CameraState";
import type { Selection } from "../../../types/Selection";

export interface CanvasRenderState {

    pattern: PatternData;

    camera: CameraState;

    hoverCell?: {

        x: number;

        y: number;

    } | null;

    selection?: Selection | null;

    showGrid?: boolean;

}