export default [
    // Users
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
    },

    // Products
    {
        path: '/admin/products',
        name: 'Admin - Products',
        meta: { requiresAuth: 'Admin' },
        component: () => import(/* webpackChunkName: "admin-products" */ '@/views/Admin/Products.vue')
    },
]