import type { PatternData } from "../types/Pattern";
/**
 * Django REST API와 통신하기 위한 함수들을 모아둔 파일입니다.
 *
 * 기존 patternApi.ts는 FastAPI의 이미지 → PatternData 변환을 담당하고,
 * 이 파일은 Django의 회원 인증 및 Pattern 저장/관리 API를 담당합니다.
 */

// Django 서버의 기본 주소
const DJANGO_API_URL = "http://127.0.0.1:8001/api";

/**
 * 회원가입 요청에 사용하는 데이터입니다.
 */
export interface RegisterRequest {
    username: string;
    password: string;
    password_confirm: string;
}

/**
 * 로그인 요청에 사용하는 데이터입니다.
 */
export interface LoginRequest {
    username: string;
    password: string;
}

/**
 * Django JWT 로그인 응답입니다.
 */
export interface TokenResponse {
    access: string;
    refresh: string;
}

/**
 * 현재 로그인한 사용자 정보입니다.
 */
export interface User {
    id: number;
    username: string;
}

/**
 * 서버에 저장된 Pattern의 기본 구조입니다.
 *
 * pattern_data의 실제 구조는 기존 React PatternData를
 * 그대로 전달할 수 있도록 나중에 연결합니다.
 */
export interface SavedPattern {
    id: number;
    title: string;
    width: number;
    height: number;
    is_public: boolean;
    pattern_data: PatternData;
    created_at: string;
    updated_at: string;
}

/**
 * 회원가입 API
 *
 * POST /api/auth/register/
 */
export async function register(
    data: RegisterRequest,
) {
    const response = await fetch(
        `${DJANGO_API_URL}/auth/register/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error(
            "회원가입에 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 로그인 API
 *
 * POST /api/auth/login/
 *
 * username과 password를 전달하면
 * Django Simple JWT가 access / refresh token을 반환합니다.
 */
export async function login(
    data: LoginRequest,
): Promise<TokenResponse> {
    const response = await fetch(
        `${DJANGO_API_URL}/auth/login/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error(
            "로그인에 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * Access Token 갱신 API
 *
 * POST /api/auth/token/refresh/
 */
export async function refreshToken(
    refresh: string,
): Promise<TokenResponse> {
    const response = await fetch(
        `${DJANGO_API_URL}/auth/token/refresh/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                refresh,
            }),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Access Token 갱신에 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 현재 로그인한 사용자 정보 조회
 *
 * GET /api/auth/me/
 */
export async function getMe(
    accessToken: string,
): Promise<User> {
    const response = await fetch(
        `${DJANGO_API_URL}/auth/me/`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            "사용자 정보를 가져오는데 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 내 Pattern 목록 조회
 *
 * GET /api/patterns/
 */
export async function getPatterns(
    accessToken: string,
): Promise<SavedPattern[]> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            "Pattern 목록을 가져오는데 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 특정 Pattern 상세 조회
 *
 * GET /api/patterns/{id}/
 */
export async function getPattern(
    accessToken: string,
    patternId: number,
): Promise<SavedPattern> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/${patternId}/`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            "Pattern을 가져오는데 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 공개된 Pattern 목록 조회
 *
 * GET /api/patterns/public/
 *
 * 로그인하지 않은 사용자도 사용할 수 있다.
 * Django에서 is_public=True인 Pattern만 반환한다.
 */
export async function getPublicPatterns(): Promise<SavedPattern[]> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/public/`,
        {
            method: "GET",
        },
    );

    if (!response.ok) {
        throw new Error(
            "Public Pattern 목록을 가져오는데 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 공개된 특정 Pattern 상세 조회
 *
 * GET /api/patterns/public/{id}/
 *
 * 로그인하지 않은 사용자도 사용할 수 있다.
 * 단, Django에서 공개된 Pattern만 조회할 수 있다.
 */
export async function getPublicPattern(
    patternId: number,
): Promise<SavedPattern> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/public/${patternId}/`,
        {
            method: "GET",
        },
    );

    if (!response.ok) {
        throw new Error(
            "Public Pattern을 가져오는데 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * 새로운 Pattern 저장
 *
 * POST /api/patterns/
 */
export async function createPattern(
    accessToken: string,
    data: {
        title: string;
        width: number;
        height: number;
        is_public: boolean;
        pattern_data: PatternData;
    },
): Promise<SavedPattern> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Pattern 저장에 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * Pattern 수정
 *
 * PATCH /api/patterns/{id}/
 */
export async function updatePattern(
    accessToken: string,
    patternId: number,
    data: Partial<{
        title: string;
        width: number;
        height: number;
        is_public: boolean;
        pattern_data: PatternData;
    }>,
): Promise<SavedPattern> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/${patternId}/`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify(data),
        },
    );

    if (!response.ok) {
        throw new Error(
            "Pattern 수정에 실패했습니다.",
        );
    }

    return response.json();
}

/**
 * Pattern 삭제
 *
 * DELETE /api/patterns/{id}/
 */
export async function deletePattern(
    accessToken: string,
    patternId: number,
): Promise<void> {
    const response = await fetch(
        `${DJANGO_API_URL}/patterns/${patternId}/`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error(
            "Pattern 삭제에 실패했습니다.",
        );
    }
}