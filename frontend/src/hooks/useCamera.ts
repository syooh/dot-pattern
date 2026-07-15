// ======================================================
// useCamera
// Version : v1.0
//
// 역할
// 1. Camera 상태를 관리한다.
// ======================================================

import { useState } from "react";

import type { CameraState } from "../components/canvas/camera/CameraState";

export default function useCamera() {

    const [camera, setCamera] = useState<CameraState>({

        zoom: 1,

        offsetX: 0,

        offsetY: 0

    });

    return {

        camera,

        setCamera

    };

}