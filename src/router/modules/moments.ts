import type { RouteRecordRaw } from "vue-router";
import moments from '@/views/moments/index.vue'

// 偏好设置
export default {
    path: 'moments',
    name: 'moments',
    component: moments,
    meta: {
        title: '朋友圈',
        index: '3',
        icon: ''
    }
} as RouteRecordRaw;