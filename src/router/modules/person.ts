import type { RouteRecordRaw } from "vue-router";
import person from '@/views/person/index.vue'


// 偏好设置
export default {
    path: 'person/:id',
    name: 'person',
    component: person,
    meta: {
        title: '个人主页',
        icon: ''
    },
} as RouteRecordRaw;