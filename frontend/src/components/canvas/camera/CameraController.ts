import type { CameraState } from "./CameraState";

export function moveCamera(

    camera: CameraState,

    dx: number,

    dy: number

): CameraState {

    return {

        ...camera,

        offsetX: camera.offsetX + dx,

        offsetY: camera.offsetY + dy

    };

}