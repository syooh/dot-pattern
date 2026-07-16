// ======================================================
// LeftPanel
// Version : v1.0
// Last Update : 2026-07-16
//
// 역할
// 1. 좌측 편집 패널
// 2. Palette와 StatusBar를 관리
// ======================================================

interface Props {

    palette: React.ReactNode;

    statusBar: React.ReactNode;

}

export default function LeftPanel({

    palette,

    statusBar

}: Props) {

    return (

        <div

            style={{

                width: 280,

                display: "flex",

                flexDirection: "column",

                gap: 16,

                flexShrink: 0

            }}

        >

            {palette}

            {statusBar}

        </div>

    );

}