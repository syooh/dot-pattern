// ======================================================
// usePattern
// Version : v0.6
// Last Update : 2026-07-04
//
// 역할
// 1. React State 관리
// 2. PatternEngine 호출
// 3. Canvas와 Engine 연결
//
// 앞으로 추가될 기능
// - Undo / Redo
// - Tool 선택
// - 확대 / 축소
// ======================================================

import { useState } from "react";

import type { PatternData } from "../types/Pattern";

import {
    paintPixel as paintPixelEngine,
    removeColor as removeColorEngine
} from "../engine/PatternEngine";

export default function usePattern() {

    // ==================================================
    // 빈 도안 생성
    // ==================================================

    const createEmptyPattern = (
        width: number,
        height: number
    ): PatternData => {

        return {

            width,

            height,

            palette: [

                {
                    id: 0,
                    name: "White",
                    hex: "#FFFFFF"
                },

                {
                    id: 1,
                    name: "Black",
                    hex: "#000000"
                }

            ],

            pixels: Array.from(

                { length: height },

                () => Array(width).fill(0)

            )

        };

    };

    // ==================================================
    // State
    // ==================================================

    /**
     * 현재 작업 중인 도안
     */
    const [pattern, setPattern] =
        useState<PatternData | null>(null);

    /**
     * Undo 기록
     */
    const [history, setHistory] =
        useState<PatternData[]>([]);

    /**
     * Redo 기록
     */
    const [future, setFuture] =
        useState<PatternData[]>([]);

    /**
     * 현재 선택된 색상
     */
    const [selectedColor, setSelectedColor] =
        useState(1);

    // ==================================================
    // 새 도안 생성
    // ==================================================

    /**
     * 새로운 빈 도안을 생성한다.
     *
     * 새 프로젝트이므로
     * Undo / Redo 기록도 초기화한다.
     */
    const createPattern = (

        width: number,

        height: number

    ) => {

        const newPattern =

            createEmptyPattern(

                width,

                height

            );

        setPattern(newPattern);

        // 새로운 도안이므로 기록 초기화
        setHistory([]);

        setFuture([]);

    };

    // ==================================================
    // Undo 기록 저장
    // ==================================================

    /**
     * 현재 Pattern을 Undo 기록에 저장한다.
     *
     * 모든 편집 작업 전에 호출한다.
     */
    const saveHistory = (

        currentPattern: PatternData

    ) => {

        setHistory(prev => [

            ...prev,

            currentPattern

        ]);

        /**
         * 새로운 작업이 발생하면
         * Redo 기록은 모두 삭제한다.
         */
        setFuture([]);

    };

    // ==================================================
    // 한 칸 색칠
    // ==================================================

    /**
     * Canvas가 전달한 좌표를
     * PatternEngine에게 전달한다.
     */
    const paintPixel = (

        x: number,

        y: number

    ) => {

        if (!pattern)
            return;

        // 현재 상태 저장
        saveHistory(pattern);

        const nextPattern =

            paintPixelEngine(

                pattern,

                x,

                y,

                selectedColor

            );

        setPattern(nextPattern);

    };

    // ==================================================
    // Palette에 색 추가
    // ==================================================

    /**
     * 새로운 색상을 Palette에 추가한다.
     */
    const addColor = (

        hex: string

    ) => {

        if (!pattern)
            return;

        // 현재 상태 저장
        saveHistory(pattern);

        const nextId =

            Math.max(

                ...pattern.palette.map(

                    color => color.id

                )

            ) + 1;

        setPattern({

            ...pattern,

            palette: [

                ...pattern.palette,

                {

                    id: nextId,

                    name: hex,

                    hex

                }

            ]

        });

    };

    // ==================================================
    // Palette 색 삭제
    // ==================================================

    /**
     * Palette에서 선택한 색을 삭제한다.
     *
     * 실제 계산은 PatternEngine에서 수행한다.
     */
    const removeColor = (

        colorId: number

    ) => {

        if (!pattern)
            return;

        // 현재 상태 저장
        saveHistory(pattern);

        const nextPattern =

            removeColorEngine(

                pattern,

                colorId

            );

        setPattern(nextPattern);

        /**
         * 삭제한 색을 선택 중이었다면
         * 기본색(Black)으로 변경한다.
         */
        if (

            selectedColor === colorId

        ) {

            setSelectedColor(1);

        }

    };

    // ==================================================
    // Undo
    // ==================================================

    /**
     * 마지막 작업을 취소한다.
     */
    const undo = () => {

        if (!pattern)
            return;

        if (history.length === 0)
            return;

        // 가장 최근 Pattern
        const previousPattern =
            history[history.length - 1];

        // 현재 Pattern은 Redo를 위해 저장
        setFuture(prev => [

            pattern,

            ...prev

        ]);

        // History에서 제거
        setHistory(prev =>

            prev.slice(0, -1)

        );

        // 이전 Pattern으로 변경
        setPattern(previousPattern);

    };

    // ==================================================
    // Redo
    // ==================================================

    /**
     * Undo한 작업을 다시 실행한다.
     */
    const redo = () => {

        if (!pattern)
            return;

        if (future.length === 0)
            return;

        // Future의 가장 최근 Pattern
        const nextPattern = future[0];

        // 현재 Pattern을 History에 저장
        setHistory(prev => [

            ...prev,

            pattern

        ]);

        // Future에서 제거
        setFuture(prev =>

            prev.slice(1)

        );

        // Pattern 변경
        setPattern(nextPattern);

    };

    // ==================================================
    // 외부에서 사용하는 값
    // ==================================================

    return {

        // --------------------------
        // State
        // --------------------------

        pattern,

        selectedColor,

        // --------------------------
        // Setter
        // --------------------------

        setPattern,

        setSelectedColor,

        // --------------------------
        // 기능
        // --------------------------

        createPattern,

        paintPixel,

        addColor,

        removeColor,

        undo,

        redo

    };

}