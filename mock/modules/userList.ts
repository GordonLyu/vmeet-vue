export const userList = [{
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: '/public/imgs/test.jpg',
    token: '12345-45678-78945-abcde'
}, {
    id: 2,
    username: 'admin1',
    password: '654321',
    avatar: '/public/imgs/test.jpg',
    token: '78945-45678-abcde-12345'
}, {
    id: 3,
    username: 'admin2',
    password: '123456',
    avatar: '/public/imgs/test.jpg',
    token: 'abcde-45678-78945-abcde'
}, {
    id: 4,
    username: 'admin3',
    password: '123456',
    avatar: '/public/imgs/test.jpg',
    token: '45678-abcde-78945-45678'
}]

export const getChatRecord = () => {
    let list = [{
        id: 1,
        sendId: 1,
        receiveId: 2,
        content: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        date: new Date('2023.5.29 10:30').getTime(),
    }]
    for (let i = 0; i < 3; i++) {
        list.push({
            id: i + 2,
            sendId: 2,
            receiveId: 1,
            content: "tttt" + i,
            date: new Date('2023.5.29 10:' + (34 + i)).getTime(),
        })
    }
    for (let i = 0; i < 3; i++) {
        list.push({
            id: i + 5,
            sendId: 1,
            receiveId: 3,
            content: "tttt" + i,
            date: new Date('2023.5.29 10:' + (39 + i)).getTime(),
        })
    }
    return list;
}

export const contactList = () => {
    let list = [{
        id: 1,
        uid: 1,
        cUid: 2
    }, {
        id: 2,
        uid: 2,
        cUid: 1
    }, {
        id: 3,
        uid: 1,
        cUid: 3
    }, {
        id: 4,
        uid: 1,
        cUid: 4
    },]
    return list;
}