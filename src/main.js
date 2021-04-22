import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import 'bootstrap/dist/css/bootstrap.min.css'
import 'normalize.css'
import './global.css'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'primeflex/primeflex.css';

import PrimeVue from 'primevue/config';

const app = createApp(App).use(router).use(PrimeVue)
app.mount('#app')


