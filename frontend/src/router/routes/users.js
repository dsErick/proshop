export default [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login-view" */ '@/views/Users/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register-view" */ '@/views/Users/Register.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "profile-view" */ '@/views/Users/Profile.vue')
    },
]