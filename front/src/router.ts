import {createRouter, createWebHistory} from 'vue-router';
import Mach from "./cat/views/mach.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'mash',
            path: '/',
            component: Mach
        }
    ]
});


export default router;
