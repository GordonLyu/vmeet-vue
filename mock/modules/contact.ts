// import { mock } from "mockjs";
// import { contactList } from "./userList"

// export const getContact = () => {
//     const t = (uid: number) => {
//         let list = contactList().filter((item) => {
//             if (item.uid == uid) {
//                 return list;
//             }
//         })
//         mock(/\/mock\/contact\/[0-9]+/, 'get', (option) => {
//             let uid = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
//             return t(uid);
//         })
//     }
// }