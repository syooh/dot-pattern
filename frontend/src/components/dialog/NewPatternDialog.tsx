import { useState } from "react";

interface Props {

    onCreate: (
        width: number,
        height: number
    ) => void;

}

export default function NewPatternDialog({

    onCreate

}: Props) {

    const [width, setWidth] = useState(0);

    const [height, setHeight] = useState(0);

    return (

        <div
            style={{
                padding: 30
            }}
        >

            <h2>새 도안 만들기</h2>

            <div>

                <label>

                    가로

                    <input
                        type="number"
                        value={width}
                        onChange={(e) =>
                            setWidth(
                                Number(e.target.value)
                            )
                        }
                    />

                </label>

            </div>

            <br />

            <div>

                <label>

                    세로

                    <input
                        type="number"
                        value={height}
                        onChange={(e) =>
                            setHeight(
                                Number(e.target.value)
                            )
                        }
                    />

                </label>

            </div>

            <br />

            <button

                onClick={() =>

                    onCreate(
                        width,
                        height
                    )

                }

            >

                생성

            </button>

        </div>

    );

}