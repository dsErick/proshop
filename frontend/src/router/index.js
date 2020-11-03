import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product" */ '@/views/Product.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
})

export default router
