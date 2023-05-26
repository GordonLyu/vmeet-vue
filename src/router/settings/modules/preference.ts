import type { RouteRecordRaw } from "vue-router";
import preference from '@/views/settings/preference/index.vue'

// 偏好设置
export default {
    path: 'preference',
    name: 'settingPreference',
    component: preference,
    meta: {
        title: '偏好设置',
        index: '2',
        icon: 'icons8:home'
    }
} as RouteRecordRaw;