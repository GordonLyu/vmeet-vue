import type { RouteRecordRaw } from "vue-router";
import chat from '@/views/chat/index.vue'

// 账号和密码设置
export default {
    path: 'chat',
    name: 'chat',
    component: chat,
    meta: {
      index: '1',
      title: '聊天',
      icon: ''
    }
} as RouteRecordRaw;