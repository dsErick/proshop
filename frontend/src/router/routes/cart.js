export default [
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart-view" */ '@/views/Cart/Cart.vue')
    },
    {
        path: '/shipping',
        name: 'shipping',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "shipping-view" */ '@/views/Cart/Shipping.vue')
    },
    {
        path: '/payment',
        name: 'payment',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "payment-view" */ '@/views/Cart/Payment.vue')
    },
    {
        path: '/placeorder',
        name: 'place_order',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "place-order-view" */ '@/views/Cart/PlaceOrder.vue')
    },
]
