import { mock } from "mockjs";
import { userList } from './userList'

export const login = () => {
    mock('/mock/login', 'post', (options) => {
        const data = JSON.parse(options.body);
        for (let item of userList) {
            if (item.username == data.username && item.password == data.password) {
                return {
                    code: '200',
                    msg: '登陆成功',
                    data: item.token
                }
            }
        }
        return {
            code: '403',
            msg: '用户名或密码错误',
            data: null
        }
    })
}

export const getAll = () => {
    mock('/mock/users', 'get', userList)
}

export const getOne = () => {
    const t = (id: number) => {
        let user = {}
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id == id) {
                user = userList[i];
                break;
            }
        }
        return user;
    }
    mock(/\/mock\/users\/[0-9]/, 'get', (option) => {
        let uid = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
        return t(uid);
    })
}


