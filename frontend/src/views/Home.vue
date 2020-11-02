<template>
<div id="home" class="container-lg container-fluid">
    <h2>Latest Products</h2>

    <div class="row" v-if="products.length">
        <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
            v-for="product in products"
            :key="product._id"
        >
            <v-product
                class="h-100"
                :product="product"
            />
        </div>
    </div>
</div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import productsArray from '@/products.js'

export default {
    name: 'Home',
    components: {
        VProduct: defineAsyncComponent(() => import(/* webpackChunkName: "product-component" */ '@/components/products/VProduct'))
    },
    setup() {
        const products = ref(productsArray)

        return {
            products
        }
    }
}
</script>

<style scoped lang="scss">
#home {
    > .row {
        margin: 0 -.5rem;

        > div.col-xl-3 {
            padding: 0 .5rem;
        }
    }
}
</style>
