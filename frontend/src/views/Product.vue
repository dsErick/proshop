<template>
<div id="product" class="container-lg container-fluid">
    <router-link :to="{ name: 'Home' }" class="btn btn-dark mb-3">Go back</router-link>

    <v-loader v-if="isLoading" />

    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>
    
    <div class="row" v-else>
        <div class="col-lg-6 text-center">
            <img
                class="img-fluid"
                :src="product.image"
                :alt="`${product.name} image`"
            >
        </div>
        <div class="col-lg-3 col-md-6 col-sm-7">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <h2 class="h4 mb-0">{{ product.name }}</h2>
                </li>
                <li class="list-group-item">
                    <v-rating
                        :value="product.rating"
                        :text="` ${product.numReviews} reviews`"
                    />
                </li>
                <li class="list-group-item">
                    <span class="badge badge-dark">Price</span> ${{ product.price }}
                </li>
                <li class="list-group-item">
                    <span class="badge badge-dark">Description</span> {{ product.description }}
                </li>
            </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-5">
            <ul class="list-group">
                <li class="list-group-item">
                    Price:
                    <strong>${{ product.price }}</strong>
                </li>
                <li class="list-group-item">
                    Status:
                    <strong>{{ product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }}</strong>
                </li>
                <li
                    class="list-group-item"
                    v-if="product.countInStock > 0"
                >
                    Quantity:
                    <select class="form-control w-50" v-model="quantity">
                        <option v-for="value in product.countInStock" :key="value">
                            {{ value}}
                        </option>
                    </select>
                </li>
                <li class="list-group-item">
                    <button
                        class="btn btn-block btn-dark"
                        type="button"
                        :disabled="product.countInStock === 0"
                        @click="addToCart(product._id, quantity)"
                    >
                        ADD TO CART
                    </button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import useProducts from '@/composables/useProducts.js'
import VRating from '@/components/products/VRating'

export default {
    name: 'Product',
    components: {
        VRating,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const quantity = ref(1)
        const { product, setProduct, isLoading, error, addToCart } = useProducts()
        onMounted(() => setProduct())

        return {
            product,
            isLoading,
            error,
            quantity,
            addToCart
        }
    }
}
</script>

<style scoped lang="scss">
#product {
    .row {
        margin: 0 -.5rem;

        > div[class^=col-] {
            padding: 0 .5rem;
            margin-bottom: 1rem;

            &:nth-child(2) {
                .list-group .list-group-item {
                    padding: .9rem .5rem;
                }
            }

            &:nth-child(3) {
                .list-group .list-group-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>
