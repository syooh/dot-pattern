// ======================================================
// ToolbarGroup
// Version : v1.0
// Last Update : 2026-07-17
//
// 역할
// 1. Toolbar 버튼들을 그룹으로 묶는다.
// ======================================================

import type { ReactNode } from "react";

interface Props {

    children: ReactNode;

}

export default function ToolbarGroup({

    children

}: Props) {

    return (

        <div

            style={{

                display: "flex",

                alignItems: "center",

                gap: 8

            }}

        >

            {children}

        </div>

    );

}