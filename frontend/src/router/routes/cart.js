export default [
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
]
