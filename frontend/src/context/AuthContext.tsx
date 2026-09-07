/**
 * AuthContext
 *
 * React 전체에서 로그인 상태를 관리하기 위한 Context입니다.
 *
 * 담당 기능
 * 1. 로그인
 * 2. 로그아웃
 * 3. 현재 사용자 정보 관리
 * 4. Access Token / Refresh Token 관리
 * 5. Access Token 만료 시 Refresh Token으로 갱신
 */

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    getMe,
    login as loginApi,
    refreshToken as refreshTokenApi,
    register as registerApi,
    type User,
} from "../api/djangoApi";


// ======================================================
// LocalStorage Key
// ======================================================

const ACCESS_TOKEN_KEY = "dot_pattern_access_token";
const REFRESH_TOKEN_KEY = "dot_pattern_refresh_token";


// ======================================================
// Context에서 제공할 데이터
// ======================================================

interface AuthContextValue {

    // 현재 로그인한 사용자
    user: User | null;

    // 로그인 여부
    isAuthenticated: boolean;

    // 인증 상태를 확인하는 중인지 여부
    isLoading: boolean;

    // 로그인
    login: (
        username: string,
        password: string
    ) => Promise<void>;

    // 회원가입
    register: (
        username: string,
        password: string,
        passwordConfirm: string
    ) => Promise<void>;

    // 로그아웃
    logout: () => void;

    // 현재 Access Token
    accessToken: string | null;

}


// ======================================================
// Context 생성
// ======================================================

const AuthContext = createContext<
    AuthContextValue | undefined
>(undefined);


// ======================================================
// AuthProvider
// ======================================================

interface Props {

    children: ReactNode;

}


export function AuthProvider({
    children,
}: Props) {

    const [user, setUser] =
        useState<User | null>(null);

    const [accessToken, setAccessToken] =
        useState<string | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);


    // ==================================================
    // 저장된 로그인 정보 확인
    // ==================================================

    useEffect(() => {

        async function restoreSession() {

            const savedAccessToken =
                localStorage.getItem(
                    ACCESS_TOKEN_KEY
                );

            const savedRefreshToken =
                localStorage.getItem(
                    REFRESH_TOKEN_KEY
                );


            // 저장된 토큰이 없다면
            // 로그인하지 않은 상태로 종료
            if (!savedAccessToken) {

                setIsLoading(false);

                return;

            }


            try {

                // 먼저 기존 Access Token으로
                // 사용자 정보를 확인한다.
                const currentUser =
                    await getMe(
                        savedAccessToken
                    );

                setAccessToken(
                    savedAccessToken
                );

                setUser(
                    currentUser
                );

            }
            catch {

                // Access Token이 만료된 경우
                // Refresh Token으로 갱신한다.

                if (!savedRefreshToken) {

                    logout();

                    setIsLoading(false);

                    return;

                }


                try {

                    const tokenResponse =
                        await refreshTokenApi(
                            savedRefreshToken
                        );


                    // 새 Access Token 저장
                    localStorage.setItem(
                        ACCESS_TOKEN_KEY,
                        tokenResponse.access
                    );

                    // Refresh Token도 응답에 있다면
                    // 최신 값으로 저장한다.
                    if (tokenResponse.refresh) {

                        localStorage.setItem(
                            REFRESH_TOKEN_KEY,
                            tokenResponse.refresh
                        );

                    }


                    setAccessToken(
                        tokenResponse.access
                    );


                    // 갱신된 Access Token으로
                    // 현재 사용자 정보 확인
                    const currentUser =
                        await getMe(
                            tokenResponse.access
                        );

                    setUser(
                        currentUser
                    );

                }
                catch {

                    // Refresh Token까지 사용할 수 없다면
                    // 로그인 상태를 제거한다.
                    logout();

                }

            }
            finally {

                setIsLoading(false);

            }

        }


        restoreSession();

    }, []);


    // ==================================================
    // 로그인
    // ==================================================

    async function login(
        username: string,
        password: string
    ) {

        const tokenResponse =
            await loginApi({
                username,
                password,
            });


        // 토큰 저장
        localStorage.setItem(
            ACCESS_TOKEN_KEY,
            tokenResponse.access
        );

        localStorage.setItem(
            REFRESH_TOKEN_KEY,
            tokenResponse.refresh
        );


        // React 상태에도 저장
        setAccessToken(
            tokenResponse.access
        );


        // 로그인한 사용자 정보 조회
        const currentUser =
            await getMe(
                tokenResponse.access
            );

        setUser(
            currentUser
        );

    }


    // ==================================================
    // 회원가입
    // ==================================================

    async function register(
        username: string,
        password: string,
        passwordConfirm: string
    ) {

        await registerApi({

            username,

            password,

            password_confirm:
                passwordConfirm,

        });

    }


    // ==================================================
    // 로그아웃
    // ==================================================

    function logout() {

        // 브라우저에 저장된 JWT 제거
        localStorage.removeItem(
            ACCESS_TOKEN_KEY
        );

        localStorage.removeItem(
            REFRESH_TOKEN_KEY
        );


        // React 상태 초기화
        setAccessToken(null);

        setUser(null);

    }


    return (

        <AuthContext.Provider
            value={{
                user,

                isAuthenticated:
                    user !== null,

                isLoading,

                login,

                register,

                logout,

                accessToken,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}


// ======================================================
// useAuth
// ======================================================

export function useAuth() {

    const context =
        useContext(
            AuthContext
        );


    if (!context) {

        throw new Error(
            "useAuth는 AuthProvider 안에서 사용해야 합니다."
        );

    }


    return context;

}