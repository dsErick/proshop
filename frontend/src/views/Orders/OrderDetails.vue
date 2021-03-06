<template>
<div id="order" class="container-lg container-fluid">
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">
            <!-- <router-link :to="{ name: user.isAdmin ? 'Admin - Orders' : 'Profile' }" class="text-secondary"> -->
            <router-link :to="user.isAdmin ? '/admin/orders' : { name: 'Profile' }" class="text-secondary">
                Orders
            </router-link>
            <span class="text-secondary">/</span>
            {{ order._id }}
        </h2>
    </div>

    <v-loader v-if="isLoading || !isSdkReady" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <div class="row mt-3" v-else>
        <div class="col-md-8 col-12">
            <ul id="order-details-wrapper" class="list-group list-group-flush">
                <li class="list-group-item">
                    <h3>Shipping</h3>
                    <p class="mb-1" v-if="user.isAdmin">
                        <strong>User: </strong> 
                        <router-link :to="{ name: 'Admin - User Details', params: { id: order.user._id }}">
                            {{ order.user._id }}
                        </router-link>
                    </p>
                    <p class="mb-1">
                        <strong>Name: </strong> {{ order.user.name }}
                    </p>
                    <p class="mb-1">
                        <strong>Email: </strong> {{ order.user.email }}
                    </p>
                    <p class="mb-1">
                        <strong>Address: </strong>
                        {{ order.shippingAddress.address }}, {{ order.shippingAddress.city }}.
                        {{ order.shippingAddress.postalCode }}, {{ order.shippingAddress.country }}.
                    </p>

                    <v-alert :type="order.isDelivered ? 'alert-success' : 'alert-danger'" class="mb-0">
                        {{
                            order.isDelivered ? `Delivered on ${dayjs(order.deliveredAt).format('LLL')}` : `Not delivered`
                        }}
                    </v-alert>
                </li>

                <li class="list-group-item">
                    <h3>Payment Method</h3>
                    <p class="mb-1">
                        <strong>Method: </strong>
                        {{ order.paymentMethod }}
                    </p>

                    <v-alert :type="order.isPaid ? 'alert-success' : 'alert-danger'" class="mb-0">
                        {{
                            order.isPaid ? `Paid on ${dayjs(order.paidAt).format('LLL')}` : `Not paid`
                        }}
                    </v-alert>
                </li>

                <li class="list-group-item">
                    <h3>Order Items</h3>

                    <ul id="cart-items-wrapper" class="list-group list-group-flush">
                        <li
                            class="list-group-item"
                            v-for="item in order.orderItems"
                            :key="item.product"
                        >
                            <div class="row font-weight-bold">
                                <div class="col-2">
                                    <img :src="item.image" :alt="item.name" class="img-fluid">
                                </div>
                                <div class="col">
                                    <router-link :to="{ name: 'Product', params: { id: item.product }}" class="text-wrap text-dark">
                                        {{ item.name }}
                                    </router-link>
                                </div>
                                <div class="col-auto">
                                    {{ item.quantity }} * {{ item.price }} = 
                                    {{
                                        new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(item.quantity * item.price)
                                    }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col-md-4 col-12 mt-md-0 mt-3">
            <ul id="checkout-wrapper" class="list-group">
                <li class="list-group-item">
                    <h3 class="mb-0">Order Summary</h3>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Items</div>
                        <div class="col">
                            {{
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(order.itemsPrice)
                            }}
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Shipping</div>
                        <div class="col">
                            {{
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(order.shippingPrice)
                            }}
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Tax</div>
                        <div class="col">
                            {{
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(order.taxPrice)
                            }}
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col">Total</div>
                        <div class="col">
                            {{
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(order.totalPrice)
                            }}
                        </div>
                    </div>
                </li>
                <li id="paypal-button-container" class="list-group-item" v-if="!order.isPaid"></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useUsersAuthentication from '@/composables/useUsersAuthentication'
import useOrders from '@/composables/useOrders'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export default {
    name: 'OrderDetails',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { order, fetchSingleOrder, payOrder, fetchPaypalClientId, isLoading, error } = useOrders()
        const { user } = useUsersAuthentication()
        const route = useRoute()
        const router = useRouter()
        const isSdkReady = ref(false)

        fetchSingleOrder(route.params.id)

        const addPayPalScript = async () => {
            const clientId = await fetchPaypalClientId()

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            
            script.onload = () => {
                isSdkReady.value = true

                $(document).ready(() => {
                    window.paypal.Buttons({
                        createOrder: function(_, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        currency_code: 'USD',
                                        value: order.value.totalPrice
                                    }
                                }]
                            })
                        },
                        onApprove: function(_, actions) {
                            return actions.order.capture().then(details => payOrder(order.value._id, details))
                        }
                    }).render('#paypal-button-container')
                })
            }

            document.body.appendChild(script)
        }

        watch(order.value, order => {
            if (order._id) {
                order.isPaid
                    ? isSdkReady.value = true
                    : addPayPalScript()
            }
        })

        watch(error, error => {
            if (error.status === 403) router.replace({ name: 'Home' })
        })

        return {
            user,
            order,
            isSdkReady,
            dayjs,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
#order-details-wrapper {
    li { padding: .75rem 0 }
}

#cart-items-wrapper {
    li {
        padding: .25rem .5rem;

        > .row {
            margin: 0 -.75rem;

            > div {
                padding: 0 .75rem;
                margin: auto 0;
            }
        }
    }
}

@media (max-width: 767px) {
    #order {
        > .row {
            margin: 0;

            > div { padding: 0 }
        }
    }
}

@media (max-width: 575px) {
    #order {
        h2 {
            font-size: 1.9rem;
        }
    }
}
</style>
