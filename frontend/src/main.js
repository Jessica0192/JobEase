import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// To have access to icons for our UI
import '@fortawesome/fontawesome-free/js/all'
// Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/css/common.css'

createApp(App).use(store).use(router).mount('#app')
