import type { RouteRecordRaw } from "vue-router";
import contact from '@/views/contact/index.vue'

// 偏好设置
export default {
    path: 'contact',
    name: 'contact',
    component: contact,
    meta: {
        title: '联系人',
        index: '2',
        icon: 'pajamas:preferences'
    }
} as RouteRecordRaw;