import { createApp } from 'vue'
import App from './App.vue'
import "amfe-flexible/index.js"
import sa from '@/utils/saTrack';
import Vconsole from 'vconsole';
if (import.meta.env.VITE_MODE != 'release' ){
    new Vconsole()
}
createApp(App).mount('#app')
