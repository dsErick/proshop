<template>
<div id="place-order" class="container-lg container-fluid">
    <v-loader v-if="isLoading" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <v-checkout-steps step2 step3="active" />

    <div class="row mt-3">
        <div class="col-md-8 col-12">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <h3>Shipping</h3>
                    <p class="mb-0">
                        <strong>Address: </strong>
                        {{ shippingAddress.address }}, {{ shippingAddress.city }}.
                        {{ shippingAddress.postalCode }}, {{ shippingAddress.country }}.
                    </p>
                </li>
                <li class="list-group-item">
                    <h3>Payment Method</h3>
                    <p class="mb-0">
                        <strong>Method: </strong>
                        {{ paymentMethod }}
                    </p>
                </li>

                <li class="list-group-item">
                    <h3>Order Items</h3>

                    <v-alert v-if="cartItems.length === 0" type="alert-info">
                        Your cart is empty
                    </v-alert>

                    <ul id="cart-items-wrapper" class="list-group list-group-flush" v-else>
                        <li
                            class="list-group-item"
                            v-for="item in cartItems"
                            :key="item.product"
                        >
                            <div class="row font-weight-bold">
                                <div class="col-2">
                                    <img :src="item.image" :alt="item.name" class="img-fluid">
                                </div>
                                <div class="col">
                                    <router-link :to="{ name: 'products.show', params: { id: item.product }}" class="text-wrap text-dark">
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
                                }).format(cartSummary.itemsPrice)
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
                                }).format(cartSummary.shippingPrice)
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
                                }).format(cartSummary.taxPrice)
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
                                }).format(cartSummary.totalPrice)
                            }}
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <button
                        type="button"
                        class="btn btn-dark btn-block"
                        :disabled="cartItems.length === 0"
                        @click="placeOrder(cartSummary)"
                    >
                        Place Order
                    </button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

import VCheckoutSteps from '@/components/VCheckoutSteps'

import useCart from '@/composables/useCart'
import useOrders from '@/composables/useOrders'

export default {
    name: 'Place Order',
    components: {
        VCheckoutSteps,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { cartItems, shippingAddress, paymentMethod, cartSummary, isLoading, error } = useCart()
        const { placeOrder } = useOrders()

        if (Object.keys(cartItems.value).length === 0 ) {
            const router = useRouter()
            router.push({ name: 'cart' })
        }

        return {
            cartItems,
            shippingAddress,
            paymentMethod,
            cartSummary,
            placeOrder,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
h3 { font-weight: bold }

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
    #place-order {
        > .row {
            margin: 0;

            > div { padding: 0 }
        }
    }
}
</style>
