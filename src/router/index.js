import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/DemoOne',
        name: 'DemoOne',
        component: () => import('../views/DemoOne.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(), //  Hash
    routes
})

export default router
