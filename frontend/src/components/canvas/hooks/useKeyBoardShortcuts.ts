// ======================================================
// useKeyboardShortcuts
//
// 역할
// 1. Editor 단축키 관리
// ======================================================

import { useEffect } from "react";

interface Props {

    onEscape?: () => void;

    onDelete?: () => void;

}

export function useKeyboardShortcuts({

    onEscape,

    onDelete

}: Props) {

    useEffect(() => {

        function handleKeyDown(

            event: KeyboardEvent

        ) {

            if (

                event.key === "Escape"

            ) {

                event.preventDefault();

                onEscape?.();

            }

            if (

                event.key === "Delete"

            ) {

                event.preventDefault();

                onDelete?.();

            }

        }

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

    }, [

        onEscape,

        onDelete

    ]);

}