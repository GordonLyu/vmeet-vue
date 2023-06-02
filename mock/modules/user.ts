// import { mock } from "mockjs";
import { userList, getChatRecord, contactList } from './userList'
import Mock from 'mockjs'
Mock.setup({
    timeout: '200-800'
})

export const login = () => {
    Mock.mock('/mock/login', 'post', (options) => {
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
    Mock.mock('/mock/users', 'get', userList)
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
    Mock.mock(/\/mock\/users\/[0-9]/, 'get', (option) => {
        let uid = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
        return t(uid);
    })
}

export const getMessage = () => {
    const t = (receiveId: number) => {

        let list = getChatRecord().filter(item => {
            if (item.sendId == 1 && item.receiveId == receiveId || item.sendId == receiveId && item.receiveId == 1) {
                return item;
            }
        })
        return list;
    }

    Mock.mock(/\/mock\/message\/[0-9]+/, 'get', (option) => {
        let receiveId = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
        return t(receiveId);
    })
}

export const getContact = () => {
    const t = (uid: number) => {
        let list = contactList().filter((item) => {
            if (item.uid == uid) {
                return item;
            }
        })

        let tList: any[] = []
        list.forEach(item => {
            let user = getChatRecord().filter(item_ => {
                if (item_.sendId == 1 && item_.receiveId == item.cUid || item_.sendId == item.cUid && item_.receiveId == 1) {
                    return item;
                }
            }).pop();
            let lastMessage = user?.content;
            let date = user?.date
            for (let i = 0; i < userList.length; i++) {
                if (item.cUid == userList[i].id) {
                    tList.push({
                        id: item.cUid,
                        username: userList[i].username,
                        avatar: userList[i].avatar,
                        lastMessage: lastMessage,
                        date: date,
                        num: 0
                    })
                }
            }
        })
        return tList;
    }
    Mock.mock(/\/mock\/contact\/[0-9]+/, 'get', (option) => {
        let uid = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
        return t(uid);
    })
}