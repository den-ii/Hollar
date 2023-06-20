import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '@/views/Feed.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/feed',
            name: 'feed',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Feed
        }
    ]
})

export default router
