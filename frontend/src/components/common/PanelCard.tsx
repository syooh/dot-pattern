interface Props {

    title: string;

    children: React.ReactNode;

}

export default function PanelCard({

    title,

    children

}: Props) {

    return (

        <div

            style={{

                background: "#FFFFFF",

                border: "1px solid #D9D9D9",

                borderRadius: 8,

                padding: 12,

                display: "flex",

                flexDirection: "column",

                gap: 8,

                boxShadow: "none"

            }}

        >

            <div

                style={{

                    fontWeight: 700,

                    fontSize: 16,

                    textAlign: "center"

                }}

            >

                {title}

            </div>

            <div

                style={{

                    height: 1,

                    background: "#E6E6E6"

                }}

            />

            {children}

        </div>

    );

}