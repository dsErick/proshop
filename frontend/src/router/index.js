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
        component: () => import(/* webpackChunkName: "cart-view" */ '@/views/Order/Cart.vue')
    },
    {
        path: '/shipping',
        name: 'Shipping',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "shipping-view" */ '@/views/Order/Shipping.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login-view" */ '@/views/Users/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register-view" */ '@/views/Users/Register.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "profile-view" */ '@/views/Users/Profile.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
