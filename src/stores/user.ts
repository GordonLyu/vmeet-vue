import type { LoginResponse } from "@/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserInfoStore = defineStore('userInfo', () => {
    const user = ref<LoginResponse>()
    const token = ref<string>();
    const updateAvatar = () => {

    }

    const setUser = (data: LoginResponse) => {
        user.value = data;
    }

    const setToken = (data: string) => {
        token.value = data;
    }

    return {
        user, token,
        updateAvatar,
        setUser, setToken
    }
}, {
    persist: {
        key: 'userInfo',
        //enabled：是是否开启持久化存储
        enabled: true,

        //strategies：是设置默认持久化存储的位置，默认在 sessionStorage 中存储，paths：为持久化存储的属性

        strategies: [{
            storage: localStorage,
            paths: ["user", 'token']
        }, {
            paths: ["user", 'token']
        }],
    }
})