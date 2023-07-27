import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Feed from '@/views/Feed.vue'
import { routes } from './routes'
import { useAuthStore } from '@/stores/auth'
// import Trendbar from '../components/Trendbar.vue'
// import CouTrendbar from '../components/CouTrendbar.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes

})
router.beforeEach((to, from, next) => {
    console.log(to.meta)
    if (!to.meta.requiresAuth) {
        next()
        return;
    }
    const auth = useAuthStore()
    if (auth.isAuth) {
        next()
    }
    else {
        next({ name: "home" })
        auth.authModal = true
    }
})
export default router
