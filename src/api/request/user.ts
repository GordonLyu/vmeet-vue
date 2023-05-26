import type { Login, Register } from "@/types/User"
import request from "@/utils/request"

export const login = (userLogin: Login) => {
    return request.post('/login', JSON.stringify(userLogin), {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const register = (userRegister: Register) => {
    console.log(userRegister);
    return request.post('/register', JSON.stringify(userRegister), {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export const getContactList = () => {

}