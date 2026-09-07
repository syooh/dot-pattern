/**
 * LoginModal
 *
 * Django JWT 로그인을 위한 모달입니다.
 */

import {
    useState,
    type FormEvent,
} from "react";

import { useAuth } from "../../context/AuthContext";


interface Props {

    onClose: () => void;

}


export default function LoginModal({
    onClose,
}: Props) {

    const {
        login,
    } = useAuth();


    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();

        setError("");

        setIsSubmitting(true);


        try {

            await login(
                username,
                password
            );

            onClose();

        }
        catch {

            setError(
                "아이디 또는 비밀번호를 확인해주세요."
            );

        }
        finally {

            setIsSubmitting(false);

        }

    }


    return (

        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background:
                    "rgba(0, 0, 0, 0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >

            <div
                onClick={(event) =>
                    event.stopPropagation()
                }
                style={{
                    width: 360,
                    padding: 24,
                    borderRadius: 12,
                    background: "#FFFFFF",
                    boxSizing: "border-box",
                    boxShadow:
                        "0 10px 40px rgba(0, 0, 0, 0.2)",
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: 20,
                    }}
                >
                    로그인
                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(event) =>
                            setUsername(
                                event.target.value
                            )
                        }
                        required
                        style={{
                            width: "100%",
                            height: 40,
                            marginBottom: 10,
                            padding: "0 10px",
                            boxSizing: "border-box",
                            border:
                                "1px solid #CCCCCC",
                            borderRadius: 6,
                        }}
                    />


                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        required
                        style={{
                            width: "100%",
                            height: 40,
                            marginBottom: 10,
                            padding: "0 10px",
                            boxSizing: "border-box",
                            border:
                                "1px solid #CCCCCC",
                            borderRadius: 6,
                        }}
                    />


                    {error && (

                        <div
                            style={{
                                marginBottom: 10,
                                color: "#D93025",
                                fontSize: 13,
                            }}
                        >
                            {error}
                        </div>

                    )}


                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                        }}
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                height: 40,
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                            }}
                        >
                            취소
                        </button>


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                flex: 1,
                                height: 40,
                                border: "none",
                                borderRadius: 6,
                                background:
                                    "#4A90E2",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                cursor:
                                    isSubmitting
                                        ? "default"
                                        : "pointer",
                            }}
                        >
                            {isSubmitting
                                ? "로그인 중..."
                                : "로그인"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}