import type { RouteRecordRaw } from "vue-router";
import preference from '@/views/settings/account/index.vue'

// 账号和密码设置
export default {
    path: 'account',
    name: 'settingAccount',
    component: preference,
    meta: {
        title: '账号和密码',
        index: '1',
        icon: 'icons8:home'
    }
} as RouteRecordRaw;