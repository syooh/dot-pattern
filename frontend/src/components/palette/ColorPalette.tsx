// ======================================================
// ColorPalette
// Version : v0.5
// Last Update : 2026-07-03
//
// 역할
// 1. 팔레트 출력
// 2. 색 선택
// 3. 색 추가
// 4. 색 삭제
// ======================================================

import type { PaletteColor } from "../../types/Pattern";

interface Props {

    palette: PaletteColor[];

    selectedColor: number;

    onSelect: (id: number) => void;

    onAddColor: (hex: string) => void;

    onRemoveColor?: (id: number) => void;

}

export default function ColorPalette({

    palette,

    selectedColor,

    onSelect,

    onAddColor,

    onRemoveColor

}: Props) {

    return (

        <div>

            <h3>🎨 Palette</h3>

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 15
                }}
            >

                <input

                    type="color"

                    onChange={(event) =>

                        onAddColor(

                            event.target.value

                        )

                    }

                />

                {
                    palette.map(color => (

                        <div
                            key={color.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                        >

                            <button

                                onClick={() => onSelect(color.id)}

                                style={{

                                    width: 40,

                                    height: 40,

                                    background: color.hex,

                                    border:

                                        selectedColor === color.id

                                            ? "3px solid #ff6600"

                                            : "1px solid #999",

                                    cursor: "pointer"

                                }}

                            />

                            {/* 기본색은 삭제 불가 */}
                            {

                                color.id > 1 && onRemoveColor && (

                                    <button

                                        style={{
                                            marginTop: 5
                                        }}

                                        onClick={() =>

                                            onRemoveColor(color.id)

                                        }

                                    >

                                        ❌

                                    </button>

                                )

                            }

                        </div>

                    ))

                }

                

            </div>

            

        </div>

    );

}