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

import type { ColorInfo } from "../../types/Pattern";

interface Props {

    palette: ColorInfo[];

    selectedColor: number;

    onSelectColor: (id: number) => void;

}

export default function ColorPalette({

    palette,

    selectedColor,

    onSelectColor

}: Props) {

    return (

        <div
            style={{
                width: 220,
                borderRight: "1px solid #ddd",
                padding: 20
            }}
        >

            <h3>색상 팔레트</h3>

            {

                palette.map(color => (

                    <div

                        key={color.id}

                        onClick={() =>

                            onSelectColor(color.id)

                        }

                        style={{

                            display: "flex",

                            alignItems: "center",

                            gap: 10,

                            marginBottom: 10,

                            cursor: "pointer",

                            padding: 8,

                            border:

                                selectedColor === color.id

                                    ? "2px solid #0078ff"

                                    : "2px solid transparent",

                            borderRadius: 8

                        }}

                    >

                        <div

                            style={{

                                width: 25,

                                height: 25,

                                backgroundColor: color.hex,

                                border: "1px solid black"

                            }}

                        />

                        <span>

                            {color.name}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}