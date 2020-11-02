<template>
<div id="product" class="container-lg container-fluid">
    <router-link :to="{ name: 'Home' }" class="btn btn-dark mb-3">Go back</router-link>

    <div class="row">
        <div class="col-lg-6 text-center">
            <img :src="product.image" :alt="`${product.name} image`" class="img-fluid">
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
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Price:
                        <strong>${{ product.price }}</strong>
                    </li>
                    <li class="list-group-item">
                        Status:
                        <strong>{{ product.countInStock ? 'In Stock' : 'Out of Stock' }}</strong>
                    </li>
                    <li class="list-group-item">
                        <button
                            class="btn btn-block btn-dark"
                            type="button"
                            :disabled="product.countInStock === 0"
                        >
                            ADD TO CART
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import productsArray from '@/products.js'
import VRating from '@/components/products/VRating'

export default {
    name: 'Product',
    components: {
        VRating
    },
    setup() {
        const $route = useRoute()
        const product = computed(() => productsArray.find(product => product._id === $route.params.productId) ?? {})
        
        return{
            product
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
