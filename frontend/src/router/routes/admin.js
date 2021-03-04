export default [
    {
        path: '/admin/users',
        name: 'Admin - Users',
        meta: { requiresAuth: 'Admin' },
        component: () => import(/* webpackChunkName: "admin-users" */ '@/views/Admin/Users.vue')
    },
    {
        path: '/admin/users/:id',
        name: 'Admin - User Details',
        meta: { requiresAuth: 'Admin' },
        component: () => import(/* webpackChunkName: "admin-user-details" */ '@/views/Admin/UserDetails.vue')
    }
]