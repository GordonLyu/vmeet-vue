import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import AxiosVue from 'vue-axios'
import piniaPluginPersist from "pinia-plugin-persist"

import 'vue3-emoji/dist/style.css'
import 'element-plus/dist/index.css'
import './assets/main.css'

import axios from 'axios'


// 执行mock 不用mock可以删掉
import MockAPI from '../mock/index'
MockAPI();
// ---

const app = createApp(App)

const store = createPinia();
store.use(piniaPluginPersist)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.use(AxiosVue, axios)

app.mount('#app')
