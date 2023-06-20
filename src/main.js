import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vueTailwindDatepicker from 'vue-tailwind-datepicker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vueTailwindDatepicker)
app.mount('#app')
