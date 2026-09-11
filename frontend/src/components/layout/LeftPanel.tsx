// ======================================================
// LeftPanel
//
// 좌측 패널의 전체 배치를 담당한다.
//
// 배치 구조
//
// ┌──────────────┬──────────────┐
// │   Pattern    │   Palette    │
// ├──────────────┼──────────────┤
// │ Image Import │ My Patterns  │
// ├──────────────┴──────────────┤
// │       Public Patterns       │
// ├─────────────────────────────┤
// │            Status           │
// └─────────────────────────────┘
//
// 같은 행에 있는 패널은 Grid의 stretch를 이용해서
// 서로 같은 높이를 갖도록 한다.
// ======================================================

interface Props {
    // Pattern 패널
    pattern: React.ReactNode;

    // Image Import 패널
    imageImport: React.ReactNode;

    // Palette 패널
    palette: React.ReactNode;

    // 로그인한 사용자의 My Patterns 패널
    serverPattern: React.ReactNode;

    // 로그인하지 않아도 볼 수 있는 Public Patterns 패널
    publicPattern: React.ReactNode;

    // Status Bar
    statusBar: React.ReactNode;
}

export default function LeftPanel({
    pattern,
    imageImport,
    palette,
    serverPattern,
    publicPattern,
    statusBar,
}: Props) {
    return (
        <div
            style={{
                width: "100%",

                // 2열 Grid
                display: "grid",
                gridTemplateColumns: "1fr 1fr",

                // 패널 사이 간격
                gap: 10,

                // 같은 행의 아이템 높이를 맞춘다.
                alignItems: "stretch",
            }}
        >
            {/* ==========================================
                1행 왼쪽 : Pattern
            ========================================== */}
            <div
                style={{
                    // 내부 컴포넌트가 부모 높이를
                    // 자연스럽게 채우도록 Grid로 구성
                    display: "grid",
                }}
            >
                {pattern}
            </div>

            {/* ==========================================
                1행 오른쪽 : Palette
            ========================================== */}
            <div
                style={{
                    display: "grid",
                }}
            >
                {palette}
            </div>

            {/* ==========================================
                2행 왼쪽 : Image Import
            ========================================== */}
            <div
                style={{
                    display: "grid",
                }}
            >
                {imageImport}
            </div>

            {/* ==========================================
                2행 오른쪽 : My Patterns
            ========================================== */}
            <div
                style={{
                    display: "grid",
                }}
            >
                {serverPattern}
            </div>

            {/* ==========================================
                3행 : Public Patterns
                두 열을 모두 사용한다.
            ========================================== */}
            <div
                style={{
                    display: "grid",
                }}
            >
                {publicPattern}
            </div>

            {/* ==========================================
                4행 : Status
                두 열을 모두 사용한다.
            ========================================== */}
            <div
                style={{
                    display: "grid",
                }}
            >
                {statusBar}
            </div>
        </div>
    );
}