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
    
    // Cart
    {
        path: '/cart',
        name: 'Cart',
        component: () => import(/* webpackChunkName: "cart-view" */ '@/views/Cart/Cart.vue')
    },
    {
        path: '/shipping',
        name: 'Shipping',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "shipping-view" */ '@/views/Cart/Shipping.vue')
    },
    {
        path: '/payment',
        name: 'Payment',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "payment-view" */ '@/views/Cart/Payment.vue')
    },
    {
        path: '/placeorder',
        name: 'Place Order',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "place-order-view" */ '@/views/Cart/PlaceOrder.vue')
    },

    // Orders
    {
        path: '/order/:id',
        name: 'Order Details',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "order-details-view" */ '@/views/Orders/OrderDetails.vue')
    },

    // Users
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
    },

    // Admin
    {
        path: '/admin/users',
        name: 'Admin Users',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "admin-users" */ '@/views/Admin/Users.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
