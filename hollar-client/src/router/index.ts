import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Feed from '@/views/Feed.vue'
import { routes } from './routes'
// import Trendbar from '../components/Trendbar.vue'
// import CouTrendbar from '../components/CouTrendbar.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes

})

export default router
