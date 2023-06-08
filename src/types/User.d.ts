export interface User {
    id: number,
    nickname: string,
    username: string,
    avatar: string
}

export interface Login {
    username: string;
    password: string;
}

export interface Register {
    username: string;
    nickname: string;
    password: string;
}