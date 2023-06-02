import request from "@/utils/request";

export const getMessage = (receiveId: number) => {
    return request.get(`/mock/message/${receiveId}`);
}