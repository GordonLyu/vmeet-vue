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
  component: () => import('@/views/home/index.vue'),
  redirect: 'chat',
  children: [{
    path: 'chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue')
  }, {
    path: 'contact',
    name: 'contact',
    component: () => import('@/views/contact/index.vue')
  }, {
    path: 'moments',
    name: 'moments',
    component: () => import('@/views/moments/index.vue')
  }, ...settingsRouter]
}, {
  path: '/test/chat',
  name: 'testChat',
  component: () => import('@/views/test/chat.vue')
}, {
  path: '/test/chatBox',
  name: 'testChatBox',
  component: () => import('@/views/test/chatBox.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/register/index.vue')
},
...adminRouter]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

const whitelist = ['/test/chat', '/test/chatBox']

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && to.path == '/login' || localStorage.getItem('token') && to.path == '/register') {
    next({
      path: 'chat',
      replace: true
    });
  } else if (to.path == '/login' || to.path == '/register' || localStorage.getItem('token')) {
    next();
  } else if (whitelist.includes(to.path)) {
    next();
  } else {
    next('/login');
  }
})

export default router
