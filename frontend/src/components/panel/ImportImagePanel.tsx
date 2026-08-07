import { useState } from "react";
import { useRef } from "react";

import PanelCard from "../common/PanelCard";

interface Props {

    onImport: (

        file: File,

        width: number,

        height: number | null,

        colors: number

    ) => void;

}

export default function ImportImagePanel({

    onImport

}: Props) {

    const [file, setFile] = useState<File | null>(null);

    const [width, setWidth] = useState(40);

    const [height, setHeight] = useState<number | "">("");

    const [colors, setColors] = useState(8);

    const fileInputRef =

        useRef<HTMLInputElement>(null);

    return (

        <PanelCard title="🖼️ Image Import">

            <div

                className="import-panel"

                style={{

                    display: "flex",

                    flexDirection: "column",

                    gap: 6

                }}

            >

                <input

                    ref={fileInputRef}

                    type="file"

                    accept="image/*"

                    style={{ display: "none" }}

                    onChange={(e) => {

                        if (!e.target.files) return;

                        setFile(e.target.files[0]);

                    }}

                />

                <button

                    className="import-file-button"

                    style={{

                        height: 36

                    }}

                    onClick={() =>

                        fileInputRef.current?.click()

                    }

                >

                    📂 Choose Image

                </button>

                <div

                    className="import-file-name"

                    style={{

                        fontSize: 12,

                        color: "#666",

                        textAlign: "center"

                    }}

                >

                    {file

                        ? file.name

                        : "No image selected"}

                </div>

                {/* Width / Height */}

                <div

                    style={{

                        display: "flex",

                        gap: 10

                    }}

                >

                    <div style={{ flex: 1 }}>

                        <label

                            style={{

                                fontSize: 13,

                                fontWeight: 500

                            }}

                        >

                            Width

                        </label>

                        <input

                            type="number"

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

                                boxSizing: "border-box"

                            }}

                        />

                    </div>

                    <div style={{ flex: 1 }}>

                        <label

                            style={{

                                fontSize: 13,

                                fontWeight: 500

                            }}

                        >

                            Height

                        </label>

                        <input

                            type="number"

                            placeholder="Auto"

                            value={height}

                            onChange={(e) =>

                                setHeight(

                                    e.target.value === ""

                                        ? ""

                                        : Number(e.target.value)

                                )

                            }

                            style={{

                                width: "100%",

                                height: 34,

                                padding: "4px 8px",

                                boxSizing: "border-box"

                            }}

                        />

                    </div>

                </div>

                {/* Colors */}

                <div>

                    <label

                        style={{

                            fontSize: 13,

                            fontWeight: 500

                        }}

                    >

                        Colors

                    </label>

                    <input

                        type="number"

                        value={colors}

                        min={2}

                        max={64}

                        onChange={(e) =>

                            setColors(

                                Number(e.target.value)

                            )

                        }

                        style={{

                            width: "100%",

                            height: 34,

                            padding: "4px 8px",

                            boxSizing: "border-box"

                        }}

                    />

                </div>

                <button

                    disabled={!file}

                    style={{

                        height: 36,

                        marginTop: 4

                    }}

                    onClick={() => {

                        if (!file)

                            return;

                        onImport(

                            file,

                            width,

                            height === ""

                                ? null

                                : height,

                            colors

                        );

                    }}

                >

                    Generate Pattern

                </button>

            </div>

        </PanelCard>

    );

}