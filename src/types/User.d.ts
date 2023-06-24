export interface User {
    id: number,
    nickname: string,
    username: string,
    avatar: string,
    token?: string
}

export interface Login {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    email?: string,
    token: string;
}

export interface Register {
    username: string;
    nickname: string;
    password: string;
}