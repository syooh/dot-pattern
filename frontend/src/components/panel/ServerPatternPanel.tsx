/**
 * ======================================================
 * ServerPatternPanel
 *
 * Django 서버에 Pattern을 저장하고
 * 저장된 Pattern을 불러오거나 삭제하는 패널입니다.
 *
 * 로그인하지 않은 사용자는 기존 에디터를 그대로 사용할 수 있고,
 * 서버 저장 기능만 로그인 사용자에게 제공합니다.
 * ======================================================
 */

import { useEffect, useState } from "react";

import PanelCard from "../common/PanelCard";

import {
    createPattern as createPatternApi,
    deletePattern as deletePatternApi,
    getPatterns,
    type SavedPattern,
} from "../../api/djangoApi";

import { useAuth } from "../../context/AuthContext";

import type { PatternData } from "../../types/Pattern";


interface Props {

    // 현재 편집 중인 Pattern
    pattern: PatternData;

    // 서버에서 불러온 Pattern을
    // 현재 에디터에 적용하기 위한 함수
    onLoadPattern: (
        pattern: PatternData
    ) => void;

    // 현재 서버에 저장된 Pattern의 ID
    savedPatternId: number | null;

    // 저장된 Pattern ID 변경
    onSavedPatternIdChange: (
        id: number | null
    ) => void;

}


export default function ServerPatternPanel({

    pattern,

    onLoadPattern,

    savedPatternId,

    onSavedPatternIdChange,

}: Props) {

    const {

        user,

        accessToken,

        isAuthenticated,

    } = useAuth();


    // 서버 저장 시 사용할 제목
    const [title, setTitle] =

        useState("새 도안");


    // 공개 여부
    const [isPublic, setIsPublic] =

        useState(false);


    // 사용자의 서버 저장 Pattern 목록
    const [patterns, setPatterns] =

        useState<SavedPattern[]>([]);


    // 현재 선택한 서버 Pattern
    const [selectedPatternId, setSelectedPatternId] =

        useState<number | null>(null);


    // 처리 중 상태
    const [isLoading, setIsLoading] =

        useState(false);


    // 메시지
    const [message, setMessage] =

        useState("");


    // ==================================================
    // Pattern 목록 조회
    // ==================================================

    async function loadPatternList() {

        if (!accessToken) {

            return;

        }


        try {

            setIsLoading(true);

            const result =

                await getPatterns(
                    accessToken
                );


            setPatterns(result);

        }
        catch (error) {

            console.error(error);

            setMessage(
                "저장된 도안 목록을 가져오지 못했습니다."
            );

        }
        finally {

            setIsLoading(false);

        }

    }


    // 로그인 상태가 되면
    // 서버에 저장된 Pattern 목록을 가져온다.
    useEffect(() => {

        if (!isAuthenticated) {

            setPatterns([]);

            return;

        }


        loadPatternList();

    }, [
        isAuthenticated,
        accessToken,
    ]);


    // ==================================================
    // 서버 저장
    // ==================================================

    async function handleSave() {

        if (!accessToken) {

            setMessage(
                "로그인이 필요합니다."
            );

            return;

        }


        if (!title.trim()) {

            setMessage(
                "도안 제목을 입력해주세요."
            );

            return;

        }


        try {

            setIsLoading(true);

            setMessage("");


            // 현재 PatternData 전체를
            // Django JSONField에 저장한다.
            const savedPattern =

                await createPatternApi(
                    accessToken,
                    {
                        title: title.trim(),

                        width: pattern.width,

                        height: pattern.height,

                        is_public: isPublic,

                        pattern_data: pattern,

                    }
                );


            // 방금 저장한 Pattern ID를 기억한다.
            onSavedPatternIdChange(
                savedPattern.id
            );


            // 목록 새로고침
            await loadPatternList();


            setSelectedPatternId(
                savedPattern.id
            );


            setMessage(
                "도안이 서버에 저장되었습니다."
            );

        }
        catch (error) {

            console.error(error);

            setMessage(
                "도안 저장에 실패했습니다."
            );

        }
        finally {

            setIsLoading(false);

        }

    }


    // ==================================================
    // Pattern 불러오기
    // ==================================================

    function handleLoad() {

        if (!selectedPatternId) {

            setMessage(
                "불러올 도안을 선택해주세요."
            );

            return;

        }


        const selectedPattern =

            patterns.find(
                item =>
                    item.id ===
                    selectedPatternId
            );


        if (!selectedPattern) {

            return;

        }


        // 서버의 PatternData를
        // 현재 에디터에 적용한다.
        onLoadPattern(
            selectedPattern.pattern_data
        );


        // 현재 서버 Pattern ID 기억
        onSavedPatternIdChange(
            selectedPattern.id
        );


        // 제목과 공개 여부도 복원
        setTitle(
            selectedPattern.title
        );

        setIsPublic(
            selectedPattern.is_public
        );


        setMessage(
            "도안을 불러왔습니다."
        );

    }


    // ==================================================
    // Pattern 삭제
    // ==================================================

    async function handleDelete() {

        if (!accessToken) {

            return;

        }


        if (!selectedPatternId) {

            setMessage(
                "삭제할 도안을 선택해주세요."
            );

            return;

        }


        const selectedPattern =

            patterns.find(
                item =>
                    item.id ===
                    selectedPatternId
            );


        if (!selectedPattern) {

            return;

        }


        const ok = window.confirm(

            `"${selectedPattern.title}" 도안을 삭제하시겠습니까?`

        );


        if (!ok) {

            return;

        }


        try {

            setIsLoading(true);

            setMessage("");


            await deletePatternApi(

                accessToken,

                selectedPatternId

            );


            // 목록에서 삭제된 Pattern 제거
            setPatterns(prev =>

                prev.filter(
                    item =>
                        item.id !==
                        selectedPatternId
                )

            );


            // 현재 선택 초기화
            setSelectedPatternId(null);


            // 현재 편집 Pattern이 삭제한 Pattern이었다면
            // 서버 Pattern ID도 초기화한다.
            if (
                savedPatternId ===
                selectedPatternId
            ) {

                onSavedPatternIdChange(
                    null
                );

            }


            setMessage(
                "도안을 삭제했습니다."
            );

        }
        catch (error) {

            console.error(error);

            setMessage(
                "도안 삭제에 실패했습니다."
            );

        }
        finally {

            setIsLoading(false);

        }

    }


    // ==================================================
    // 비로그인 상태
    // ==================================================

    if (!isAuthenticated) {

        return (

            <PanelCard title="💾 My Patterns">

                <div
                    style={{
                        fontSize: 13,
                        color: "#777",
                        lineHeight: 1.5,
                        textAlign: "center",
                    }}
                >
                    서버에 도안을 저장하려면
                    <br />
                    로그인이 필요합니다.
                </div>

            </PanelCard>

        );

    }


    // ==================================================
    // 로그인 상태
    // ==================================================

    return (

        <PanelCard title="💾 Pattern Save">

            <div
                style={{
                    fontSize: 13,
                    color: "#555",
                }}
            >
                👤 {user?.username}
            </div>


            {/* 제목 */}

            <input

                type="text"

                value={title}

                onChange={event =>
                    setTitle(
                        event.target.value
                    )
                }

                placeholder="도안 제목"

                maxLength={100}

                style={{
                    width: "100%",
                    height: 34,
                    padding: "4px 8px",
                    boxSizing: "border-box",
                    border:
                        "1px solid #CCC",
                    borderRadius: 6,
                }}

            />


            {/* 공개 여부 */}

            <label
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    cursor: "pointer",
                }}
            >

                <input

                    type="checkbox"

                    checked={isPublic}

                    onChange={event =>
                        setIsPublic(
                            event.target.checked
                        )
                    }

                />

                공개 도안

            </label>


            {/* 저장 */}

            <button

                type="button"

                onClick={handleSave}

                disabled={isLoading}

                style={{
                    width: "100%",
                    height: 36,
                    border: "none",
                    borderRadius: 6,
                    background: "#4A90E2",
                    color: "#FFF",
                    fontWeight: 600,
                    cursor: isLoading
                        ? "default"
                        : "pointer",
                }}

            >

                {isLoading
                    ? "저장 중..."
                    : "서버에 저장"}

            </button>


            {/* 저장된 Pattern 목록 */}

            <div
                style={{
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 600,
                }}
            >
                저장된 도안
            </div>


            <select

                value={
                    selectedPatternId ?? ""
                }

                onChange={event => {

                    const value =
                        event.target.value;

                    setSelectedPatternId(
                        value
                            ? Number(value)
                            : null
                    );

                }}

                style={{
                    width: "100%",
                    height: 34,
                    padding: "0 8px",
                    border:
                        "1px solid #CCC",
                    borderRadius: 6,
                    background: "#FFF",
                }}

            >

                <option value="">

                    도안을 선택하세요

                </option>


                {patterns.map(item => (

                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {item.title}
                    </option>

                ))}

            </select>


            {/* 불러오기 / 삭제 */}

            <div
                style={{
                    display: "flex",
                    gap: 6,
                }}
            >

                <button

                    type="button"

                    onClick={handleLoad}

                    disabled={
                        !selectedPatternId ||
                        isLoading
                    }

                    style={{
                        flex: 1,
                        height: 34,
                        border:
                            "1px solid #CCC",
                        borderRadius: 6,
                        background:
                            "#FFF",
                        cursor: "pointer",
                    }}

                >
                    불러오기

                </button>


                <button

                    type="button"

                    onClick={handleDelete}

                    disabled={
                        !selectedPatternId ||
                        isLoading
                    }

                    style={{
                        flex: 1,
                        height: 34,
                        border:
                            "1px solid #CCC",
                        borderRadius: 6,
                        background:
                            "#FFF",
                        color: "#D93025",
                        cursor: "pointer",
                    }}

                >
                    삭제

                </button>

            </div>


            {message && (

                <div
                    style={{
                        fontSize: 12,
                        color: "#555",
                        lineHeight: 1.4,
                    }}
                >
                    {message}
                </div>

            )}

        </PanelCard>

    );

}