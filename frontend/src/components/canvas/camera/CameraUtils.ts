// ======================================================
// CameraUtils
// ======================================================

import type { CameraState } from "./CameraState";

export function zoomIn(

    camera: CameraState

): CameraState {

    return {

        ...camera,

        zoom: Math.min(

            camera.zoom + 0.25,

            8

        )

    };

}

export function zoomOut(

    camera: CameraState

): CameraState {

    return {

        ...camera,

        zoom: Math.max(

            camera.zoom - 0.25,

            0.25

        )

    };

}