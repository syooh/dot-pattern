// ======================================================
// EditorLayout
//
// 역할
// 1. Palette와 Workspace를 좌우 배치한다.
// ======================================================

import type { ReactNode } from "react";

interface Props {

    palette: ReactNode;

    workspace: ReactNode;

}

export default function EditorLayout({

    palette,

    workspace

}: Props) {

    return (

        <div

            style={{

                display: "flex",

                gap: 24,

                alignItems: "flex-start",

                marginTop: 20

            }}

        >

            <aside

                style={{

                    width: 260,

                    flexShrink: 0,

                    position: "sticky",

                    top: 20

                }}

            >

                {palette}

            </aside>

            <main

                style={{

                    flex: 1,

                    minWidth: 0

                }}

            >

                {workspace}

            </main>

        </div>

    );

}