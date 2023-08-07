import type { RouteRecordRaw, Router } from 'vue-router';

import Reply from '@/views/Reply.vue'
export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        components: {
            default: () => import('@/views/Home.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        }
    },
    {
        path: '/feed',
        name: 'feed',
        components: {
            default: () => import('@/views/Feed.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        }
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
    },
    {
        path: '/verifyaccount',
        name: 'verifyacc',
        components: {
            default: () => import('../views/VerifyAcc.vue'),
        }
    },
    {
        path: '/profile',
        redirect: '/profile/@me'
    },
    {
        path: '/profile/:username',
        name: 'profile',
        components: {
            default: () => import('@/views/Profile.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/rooms',
        name: 'rooms',
        components: {
            default: () => import('@/views/Rooms.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        }
    },
    {
        path: '/channel/:name/:id',
        // name: 'rooms',
        components: {
            default: () => import('@/views/Room.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        }
    },
    {
        path: '/post/:name/:id',
        // name: 'rooms',
        components: {
            default: () => import('@/views/Post.vue'),
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        }
    },
    {
        path: '/replies/:name/:id',
        // name: 'rooms',
        props: true,
        components: {
            default: Reply,
            navbar: () => import('@/components/bars/Navbar.vue'),
            trendbar: () => import('@/components/bars/Trendbar.vue'),
            couTrendbar: () => import('@/components/bars/CouTrendbar.vue'),
        },
        meta: {
            isReply: true
        }

    },
    {
        path: '/:catchAll(.*)*',
        redirect: { name: 'home' }
    }
]