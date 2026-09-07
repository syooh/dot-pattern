// ======================================================
// EditorLayout
//
// 역할
// 1. Palette와 Workspace를 좌우 배치한다.
// 2. LeftPanel과 Workspace의 높이를 동일하게 유지한다.
// ======================================================

interface Props {

    leftPanel: React.ReactNode;

    workspace: React.ReactNode;

}

export default function EditorLayout({

    leftPanel,

    workspace

}: Props) {

    return (

        <div

            style={{

                display: "flex",

                gap: 24,

                alignItems: "stretch",

                marginTop: 20,

                width: "100%"

            }}

        >

            {/* Left Panel */}

            <aside

                style={{

                    width: 360,

                    flexShrink: 0,

                    position: "sticky",

                    top: 20

                }}

            >

                {leftPanel}

            </aside>


            {/* Workspace */}

            <main

                style={{

                    flex: 1,

                    minWidth: 0,

                    minHeight: 0,

                    display: "flex"

                }}

            >

                {workspace}

            </main>

        </div>

    );

}