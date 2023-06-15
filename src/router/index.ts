import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import adminRouter from './admin'
import settingsRouter from './settings'
import api from '@/api'
import { ElMessage } from 'element-plus/lib/components/index.js'
import type { User } from '@/types/User'


// 群体导入~
const modules: any = import.meta.glob('./modules/*', {
  eager: true
})

const mainChildrenRouter = []

for (const path in modules) {
  mainChildrenRouter.push(modules[path].default)
}

const routes: Readonly<RouteRecordRaw[]> = [{
  path: '/test',
  name: 'test',
  component: () => import('@/views/test/Test.vue')
}, {
  path: '',
  name: 'main',
  redirect: 'chat',
  component: () => import('@/views/home/index.vue'),
  children: [...mainChildrenRouter, ...settingsRouter]
}, {
  path: '/test/chat',
  name: 'testChat',
  component: () => import('@/views/test/chat.vue')
}, {
  path: '/test/chatBox',
  name: 'testChatBox',
  component: () => import('@/views/test/chatBox.vue')
}, {
  path: '/test/audio',
  name: 'testAudio',
  component: () => import('@/views/test/audio.vue')
}, {
  path: '/test/upload',
  name: 'testUpload',
  component: () => import('@/views/test/upload.vue')
}, {
  path: '/test/videoChat',
  name: 'testVideoChat',
  component: () => import('@/views/test/videoChat.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/register/index.vue')
}, {
  path: '/video-chat/:id?',
  name: 'videoChat',
  component: () => import('@/views/videoChat/index.vue')
},
...adminRouter]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

const whitelist = ['/login', '/register', '/test/chat', '/test/chatBox', '/test/videoChat', "/test/audio"]

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && to.path == '/login' || localStorage.getItem('token') && to.path == '/register') {
    next({
      path: 'chat',
      replace: true
    });
  } else if (whitelist.includes(to.path)) {
    next();
  } else if (localStorage.getItem('token')) {
    api.user.isLogin().then((res: any) => {
      if (res.code == 200) {
        let userData: User = res.data;
        localStorage.setItem('user', JSON.stringify({
          id: userData.id,
          username: userData.username,
          nickname: userData.nickname,
          avatar: userData.avatar
        }));
        next();
      } else {
        localStorage.removeItem('token');
        next('/login');
      }
    }).catch(error => {
      console.log(error);
      
      ElMessage({
        type: 'error',
        message: '未连接服务器'
      })
      localStorage.removeItem('token');
      next('/login');
    })
  } else {
    next('/login');
  }
})

export default router
