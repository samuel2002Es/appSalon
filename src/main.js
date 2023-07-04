import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import { useToast } from 'vue-toast-notification'
//para que las notificaciones se vean bien 
import "vue-toast-notification/dist/theme-default.css"
//import "vue-toast-notification/dist/theme-sugar.css" and theme-boostrap

import config from '../formkit.config'

import App from './App.vue'
import router from './router'

import vueTailwindDatepicker from 'vue-tailwind-datepicker'

const $toast = useToast({
    duration: 5000,
    position: 'top-right'
})

//info, warning, error

const app = createApp(App)

app.provide('toast',$toast)

app.use(createPinia())
app.use(plugin,defaultConfig(config))
app.use(router)
app.use(vueTailwindDatepicker)
app.mount('#app')
