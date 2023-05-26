import type { Login } from "@/types/User";
import request from "@/utils/request"

export const getAll = () => {
    return request.get('/mock/users');
}

export const getOne = (uid: number) => {
    return request.get(`/mock/users/${uid}`);
}

export const login = (userLogin: Login) => {
    return request.post('/mock/login', JSON.stringify(userLogin), {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const register = () => {

}