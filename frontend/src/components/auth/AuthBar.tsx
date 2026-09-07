/**
 * AuthBar
 *
 * 현재 로그인 상태를 보여주고
 * 로그인 / 회원가입 / 로그아웃 버튼을 제공합니다.
 */

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";


export default function AuthBar() {

    const {
        user,
        isAuthenticated,
        isLoading,
        logout,
    } = useAuth();


    const [showLogin, setShowLogin] =
        useState(false);

    const [showRegister, setShowRegister] =
        useState(false);


    // 인증 상태를 확인하는 동안
    // 잠시 아무것도 표시하지 않는다.
    if (isLoading) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                    fontSize: 13,
                    color: "#777",
                }}
            >
                로그인 상태 확인 중...
            </div>

        );

    }


    return (

        <>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                }}
            >

                {isAuthenticated && user ? (

                    <>

                        <span
                            style={{
                                fontSize: 14,
                                color: "#555",
                            }}
                        >
                            👤 {user.username}
                        </span>


                        <button
                            type="button"
                            onClick={logout}
                            style={{
                                height: 34,
                                padding: "0 12px",
                                border:
                                    "1px solid #CCCCCC",
                                borderRadius: 6,
                                background:
                                    "#FFFFFF",
                                cursor: "pointer",
                            }}
                        >
                            로그아웃
                        </button>

                    </>

                ) : (

                    <>

                        <button
                            type="button"
                            onClick={() =>
                                setShowLogin(true)
                            }
                            style={{
                                height: 34,
                                padding: "0 12px",
                                border: "none",
                                borderRadius: 6,
                                background:
                                    "#4A90E2",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            로그인
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setShowRegister(true)
                            }
                            style={{
                                height: 34,
                                padding: "0 12px",
                                border:
                                    "1px solid #CCCCCC",
                                borderRadius: 6,
                                background:
                                    "#FFFFFF",
                                cursor: "pointer",
                            }}
                        >
                            회원가입
                        </button>

                    </>

                )}

            </div>


            {showLogin && (

                <LoginModal
                    onClose={() =>
                        setShowLogin(false)
                    }
                />

            )}


            {showRegister && (

                <RegisterModal
                    onClose={() =>
                        setShowRegister(false)
                    }
                />

            )}

        </>

    );

}