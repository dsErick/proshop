<template>
<div id="cart" class="container-lg container-fluid">
    <v-loader v-if="isLoading" />

    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>
    
    <div class="row" v-else>
        <div class="col-md-8 col-12">
            <h2 class="mb-3">Shopping cart</h2>

            <v-alert
                v-if="cartItems.length === 0"
                type="alert-info"
            >
                Your cart is empty
                <router-link :to="{ name: 'Home' }" class="btn btn-info btn-sm">Go back</router-link>
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
                            <router-link :to="{ name: 'Product', params: { id: item.product }}" class="text-wrap text-dark">
                                {{ item.name }}
                            </router-link>
                        </div>
                        <div class="col-auto">
                            {{
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(item.price)
                            }}
                        </div>
                        <div class="col-2">
                            <select
                                class="form-control"
                                :value="item.quantity"
                                @change="addToCart(item.product, $event.target.value)"
                            >
                                <option v-for="value in item.countInStock" :key="value">
                                    {{ value }}
                                </option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button
                                class="btn btn-outline-dark btn-sm"
                                type="button"
                                @click="removeFromCart(item.product)"
                            >
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-md-4 col-12 mt-md-0 mt-3">
            <ul id="checkout-wrapper" class="list-group">
                <li class="list-group-item">
                    <h3 class="h5 mb-1">Subtotal ({{ cartItems.reduce((acc, item) => acc + item.quantity, 0) }}) items</h3>
                    {{
                        new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0))
                    }}
                </li>
                <li class="list-group-item">
                    <button
                        type="button"
                        class="btn btn-dark btn-block"
                        :disabled="cartItems.length === 0"
                        @click="checkout"
                    >
                        Proceed To Chekout
                    </button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useProducts from '@/composables/useProducts'

export default {
    name: 'Cart',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()

        const cartItems = computed(() => store.getters['getCartItems'])
        const { addToCart, removeFromCart } = useProducts()
        const checkout = () => router.push({ name: 'Shipping' })
        
        return {
            cartItems,
            addToCart,
            removeFromCart,
            checkout,
            isLoading: computed(() => store.getters['utils/isLoading']),
            error: computed(() => store.getters['utils/getError'])
        }
    }
}
</script>

<style scoped lang="scss">
#cart {
    #cart-items-wrapper {
        li {
            padding: .25rem .5rem;
    
            > .row {
                margin: 0 -.5rem;
    
                > div {
                    padding: 0 .5rem;
                    margin: auto 0;
                }
            }
        }
    }
    // #checkout-wrapper {}
}

@media (max-width: 767px) {
    #cart {
        > .row {
            margin: 0;

            > div { padding: 0 }
        }
    }
}
@media (max-width: 575px) {
    #cart-items-wrapper {
        select { padding: .125rem .25rem }
    }
}
</style>
