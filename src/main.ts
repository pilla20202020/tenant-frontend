import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Vuetify from './plugins/vuetify'

import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Vuetify)
app.use(toast)
app.mount('#app')
