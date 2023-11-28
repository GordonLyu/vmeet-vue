import type { LoginResponse } from "@/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageStore = defineStore('message',()=>{
    const messageList = ref<number[]>()

    return {
        messageList
    }
})()