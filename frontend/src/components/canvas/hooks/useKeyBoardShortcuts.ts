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

    onCopy?: () => void;

    onCut?: () => void;

    onPaste?: () => void;

}

export function useKeyboardShortcuts({

    onEscape,

    onDelete,

    onCopy,

    onCut,

    onPaste

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

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "c"

            ) {

                event.preventDefault();

                onCopy?.();

            }

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "x"

            ) {

                event.preventDefault();

                onCut?.();

            }

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "v"

            ) {

                event.preventDefault();

                onPaste?.();

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