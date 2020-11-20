import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home-view" */ '@/views/Home.vue')
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product-view" */ '@/views/Product.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart-view" */ '@/views/Cart.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login-view" */ '@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register-view" */ '@/views/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
