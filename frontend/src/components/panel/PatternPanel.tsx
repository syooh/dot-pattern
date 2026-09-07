import { useState } from "react";
import PanelCard from "../common/PanelCard";

interface Props {

    onCreate: (

        width: number,

        height: number

    ) => void;

}

export default function PatternPanel({

    onCreate

}: Props) {

    const [width, setWidth] = useState(40);

    const [height, setHeight] = useState(40);

    return (

        <PanelCard title="📏 Pattern">

            <div

                style={{

                    display: "flex",

                    gap: 10

                }}

            >

                {/* Width */}

                <div

                    style={{

                        flex: 1

                    }}

                >

                    <div

                        style={{

                            marginBottom: 4,

                            fontWeight: 500,

                            fontSize: 13

                        }}

                    >

                        Width

                    </div>

                    <input

                        type="number"

                        min={1}

                        value={width}

                        onChange={(e) =>

                            setWidth(

                                Number(e.target.value)

                            )

                        }

                        style={{

                            width: "100%",

                            height: 34,

                            padding: "4px 8px",

                            borderRadius: 6,

                            border: "1px solid #CCC",

                            boxSizing: "border-box"

                        }}

                    />

                </div>

                {/* Height */}

                <div

                    style={{

                        flex: 1

                    }}

                >

                    <div

                        style={{

                            marginBottom: 4,

                            fontWeight: 500,

                            fontSize: 13

                        }}

                    >

                        Height

                    </div>

                    <input

                        type="number"

                        min={1}

                        value={height}

                        onChange={(e) =>

                            setHeight(

                                Number(e.target.value)

                            )

                        }

                        style={{

                            width: "100%",

                            height: 34,

                            padding: "4px 8px",

                            borderRadius: 6,

                            border: "1px solid #CCC",

                            boxSizing: "border-box"

                        }}

                    />

                </div>

            </div>

            <button

                onClick={() =>
                    onCreate(width, height)
                }

                style={{

                    width: "100%",

                    height: 36,

                    marginTop: 6,

                    padding: "0 12px",

                    borderRadius: 6,

                    border: "none",

                    background: "#4A90E2",

                    color: "#FFF",

                    fontWeight: 600,

                    cursor: "pointer",

                    boxSizing: "border-box"

                }}

            >

                Create

            </button>

        </PanelCard>

    );
}