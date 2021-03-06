import {createApp} from 'vue'
import App from './App.vue'
import "amfe-flexible/index.js"
import sa from '@/utils/saTrack';
import service from "@/service/entry"
import Vconsole from 'vconsole';
import VueRouter from "./router"
if (import.meta.env.VITE_MODE != 'release') {
    new Vconsole()
}
const app = createApp(App)
app.provide("$service",service)
app.provide("$sa",sa)
app.use(VueRouter)
app.mount('#app');
