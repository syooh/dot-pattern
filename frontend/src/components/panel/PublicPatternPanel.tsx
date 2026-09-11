import { useEffect, useState } from "react";

import PanelCard from "../common/PanelCard";

import {
    getPublicPatterns,
    getPublicPattern,
    type SavedPattern,
} from "../../api/djangoApi";

import type { PatternData } from "../../types/Pattern";

interface Props {
    // Public Pattern을 현재 Editor에 적용하는 함수
    onLoadPattern: (pattern: PatternData) => void;

    // 서버 Pattern 저장 성공 시
    // Public Pattern 목록을 다시 가져오기 위한 값
    refreshKey: number;
}

export default function PublicPatternPanel({
    onLoadPattern,
    refreshKey,
}: Props) {
    // 공개된 Pattern 목록
    const [patterns, setPatterns] = useState<SavedPattern[]>([]);

    // 현재 선택한 Pattern ID
    const [selectedPatternId, setSelectedPatternId] =
        useState<number | null>(null);

    // 서버 요청 처리 중인지 여부
    const [isLoading, setIsLoading] = useState(false);

    // 사용자에게 보여줄 메시지
    const [message, setMessage] = useState("");

    /**
     * Public Pattern 목록을 가져온다.
     *
     * Public API이므로 로그인이나 Access Token이 필요하지 않다.
     */
    async function loadPublicPatterns() {
        try {
            setIsLoading(true);
            setMessage("");

            const result = await getPublicPatterns();

            setPatterns(result);

            // 목록을 처음 가져왔을 때
            // 첫 번째 Pattern을 기본 선택한다.
            if (result.length > 0 && selectedPatternId === null) {
                setSelectedPatternId(result[0].id);
            }

            // 공개된 Pattern이 없으면 선택도 초기화한다.
            if (result.length === 0) {
                setSelectedPatternId(null);
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "공개된 도안 목록을 가져오지 못했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * Panel이 처음 표시될 때
     * Public Pattern 목록을 가져온다.
     */
    useEffect(() => {
        loadPublicPatterns();
    }, [refreshKey]);

    /**
     * 선택한 Public Pattern을 가져온다.
     */
    async function handleLoad() {
        if (!selectedPatternId) {
            setMessage("불러올 도안을 선택해주세요.");
            return;
        }

        try {
            setIsLoading(true);
            setMessage("");

            const pattern = await getPublicPattern(
                selectedPatternId
            );

            /**
             * 서버에서 가져온 PatternData를
             * 현재 Editor에 적용한다.
             */
            onLoadPattern(pattern.pattern_data);

            setMessage("공개 도안을 불러왔습니다.");
        } catch (error) {
            console.error(error);

            setMessage(
                "공개 도안을 가져오지 못했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PanelCard title="🌎 Public Patterns">

            {/* 공개 Pattern 안내 */}
            <div
                style={{
                    fontSize: 13,
                    color: "#555",
                    lineHeight: 1.5,
                }}
            >
                다른 사용자가
                <br/>
                공개한 도안을
                <br />
                불러올 수 있습니다.
            </div>

            {/* 공개 Pattern 목록 */}
            <div
                style={{
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 600,
                }}
            >
                공개된 도안
            </div>

            {patterns.length === 0 ? (
                /* 공개된 Pattern이 없는 경우 */
                <div
                    style={{
                        fontSize: 12,
                        color: "#777",
                        lineHeight: 1.4,
                    }}
                >
                    공개된 도안이 없습니다.
                </div>
            ) : (
                <select
                    value={selectedPatternId ?? ""}
                    onChange={(event) => {
                        const value = event.target.value;

                        setSelectedPatternId(
                            value ? Number(value) : null
                        );

                        // 새로운 도안을 선택하면
                        // 이전 메시지는 제거한다.
                        setMessage("");
                    }}
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        height: 34,
                        padding: "0 8px",
                        border: "1px solid #CCC",
                        borderRadius: 6,
                        background: "#FFF",
                        boxSizing: "border-box",
                    }}
                >
                    <option value="">
                        도안을 선택하세요
                    </option>

                    {patterns.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.title}
                        </option>
                    ))}
                </select>
            )}

            {/* 불러오기 버튼 */}
            <button
                type="button"
                onClick={handleLoad}
                disabled={
                    !selectedPatternId ||
                    isLoading ||
                    patterns.length === 0
                }
                style={{
                    width: "100%",
                    height: 36,
                    border: "none",
                    borderRadius: 6,
                    background: "#4A90E2",
                    color: "#FFF",
                    fontWeight: 600,
                    cursor:
                        !selectedPatternId ||
                            isLoading ||
                            patterns.length === 0
                            ? "default"
                            : "pointer",
                }}
            >
                {isLoading
                    ? "불러오는 중..."
                    : "공개 도안 불러오기"}
            </button>

            {/* 상태 메시지 */}
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