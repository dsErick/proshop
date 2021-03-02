export default [
    {
        path: '/admin/users',
        name: 'Admin Users',
        meta: { requiresAuth: 'Admin', },
        component: () => import(/* webpackChunkName: "admin-users" */ '@/views/Admin/Users.vue')
    },
]