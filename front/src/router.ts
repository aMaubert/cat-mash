import {createRouter, createWebHistory} from 'vue-router';
import Mach from "./cat/views/mach.vue";
import Scores from "./cat/views/scores.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'mash',
            path: '/',
            component: Mach
        },
        {
            name: 'scores',
            path: '/scores',
            component: Scores
        }
    ]
});


export default router;
