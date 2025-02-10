import { createApp } from 'vue'
import './style.css'
import 'notyf/notyf.min.css';
import App from './App.vue'
import router from './router.ts';

createApp(App)
    .use(router)
    .mount('#app')
