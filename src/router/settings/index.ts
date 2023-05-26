import settings from '@/views/settings/index.vue'

import type { RouteRecordRaw } from 'vue-router'

// 群体导入~
const modules: any = import.meta.glob('./modules/*', {
    eager: true
})

const route = []

for (const path in modules) {
    route.push(modules[path].default)
}

export default [{
    path: '/settings',
    name: 'settings',
    redirect: 'settings/account',
    component: settings,
    children: route
}] as Readonly<RouteRecordRaw[]>