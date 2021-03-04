import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import admin from './routes/admin'
import cart from './routes/cart'
import users from './routes/users'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home-view" */ '@/views/Home.vue')
    },
    {
        path: '/products/:id',
        name: 'Product',
        component: () => import(/* webpackChunkName: "product-view" */ '@/views/Product.vue')
    },
    
    // Orders
    {
        path: '/orders/:id',
        name: 'Order Details',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "order-details-view" */ '@/views/Orders/OrderDetails.vue')
    },

    ...cart,
    ...users,
    ...admin,
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// Checking for logged user and for admin user
router.beforeEach((to, _, next) => {
    const user = (store.getters['getLoggedUser'])
    
    if (to.matched.some(route => route.meta.requiresAuth === true) && !user._id)
        next({ name: 'Login', query: { redirect: to.fullPath.slice(1) } })
    
    else if (to.matched.some(route => route.meta.requiresAuth === 'Admin') && !user.isAdmin) next({ name: 'Home' })

    else next()
})

export default router
