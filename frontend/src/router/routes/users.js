export default [
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
]