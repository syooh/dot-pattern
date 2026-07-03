// ======================================================
// ColorPalette
// ------------------------------------------------------
// 역할
// 1. 사용할 수 있는 색상을 보여준다.
// 2. 사용자가 색을 선택할 수 있다.
// 3. 선택된 색은 파란 테두리로 표시한다.
//
// 주의!
// 실제 색칠은 하지 않는다.
// 색 선택만 담당하는 컴포넌트이다.
// ======================================================

import { useRef } from "react";
import type { PaletteColor } from "../../types/Pattern";

/**
 * ==========================================
 * Props
 * ==========================================
 */
interface Props {

    /** 팔레트 목록 */
    palette: PaletteColor[];

    /** 현재 선택된 색상 */
    selectedColor: number;

    /** 색 선택 */
    onSelect: (id: number) => void;

    /** 새로운 색 추가 */
    onAddColor: (hex: string) => void;
}

/**
 * ==========================================
 * ColorPalette
 * ==========================================
 */
export default function ColorPalette({

    palette,

    selectedColor,

    onSelect,

    onAddColor

}: Props) {

    /**
     * 숨겨진 color input
     */
    const colorInputRef =
        useRef<HTMLInputElement>(null);

    return (

        <div>

            {/* -------------------------- */}
            {/* 색상 목록 */}
            {/* -------------------------- */}

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 15
                }}
            >

                {palette.map((color) => (

                    <div

                        key={color.id}

                        onClick={() => onSelect(color.id)}

                        style={{

                            width: 35,

                            height: 35,

                            background: color.hex,

                            cursor: "pointer",

                            border:

                                selectedColor === color.id

                                    ? "3px solid black"

                                    : "1px solid gray"

                        }}

                    />

                ))}

            </div>

            {/* -------------------------- */}
            {/* + 색 추가 버튼 */}
            {/* -------------------------- */}

            <button

                onClick={() =>

                    colorInputRef.current?.click()

                }

            >

                + 색 추가

            </button>

            {/* -------------------------- */}
            {/* 숨겨진 Color Picker */}
            {/* -------------------------- */}

            <input

                ref={colorInputRef}

                type="color"

                style={{ display: "none" }}

                onChange={(e) => {

                    onAddColor(e.target.value);

                }}

            />

        </div>

    );

}