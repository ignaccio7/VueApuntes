import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import { Icon } from '@iconify/vue';
import { main } from '@/core/auth.js'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component("Icon", Icon)

// aqui haremos uso de pinia en js y se ve que antes esta definido pinia solo es esa regla con que este definido antes de usar suficiente
main()

app.mount('#app')
