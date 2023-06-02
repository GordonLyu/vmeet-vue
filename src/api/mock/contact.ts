import request from "@/utils/request";

export const getContacts = (uid:number) => {
    return request.get(`/mock/contact/${uid}`);
}