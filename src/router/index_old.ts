import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import adminRouter from './admin'
import settingsRouter from './settings'

const routes: Readonly<RouteRecordRaw[]> = [{
  path: '/test',
  name: 'test',
  component: () => import('@/views/test/Test.vue')
}, {
  path: '',
  name: 'home',
  component: () => import('@/views/home/index.vue')
}, {
  path: '/test/chat',
  name: 'testChat',
  component: () => import('@/views/test/chat.vue')
}, {
  path: '/chat',
  name: 'chat',
  component: () => import('@/views/chat/index.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/register/index.vue')
},
...adminRouter, ...settingsRouter]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && to.path == '/login' || localStorage.getItem('token') && to.path == '/register') {
    next({
      path: 'chat',
      replace: true
    });
  } else if (to.path == '/login' || to.path == '/register' || localStorage.getItem('token')) {
    next();
  } else {
    next('/login');
  }
})

export default router
