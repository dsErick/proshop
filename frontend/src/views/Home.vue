<template>
<div id="home" class="container-lg container-fluid">
    <h2>Latest Products</h2>

    <h4 v-if="isLoading">
        Loading...
    </h4>
    <div v-else-if="error">
        <h4>{{ error }}</h4>
    </div>

    <div
        class="row"
        v-else-if="products.length"
    >
        <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
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
import { onMounted, defineAsyncComponent } from 'vue'
import useProducts from '@/composables/useProducts.js'

export default {
    name: 'Home',
    components: {
        VProduct: defineAsyncComponent(() => import(/* webpackChunkName: "product-component" */ '@/components/products/VProduct'))
    },
    setup() {
        const { products, setProducts, isLoading, error } = useProducts()
        onMounted(setProducts())
        
        return {
            products,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
#home {
    > .row {
        margin: 0 -.25rem;

        > div.col-xl-3 {
            padding: 0 .25rem;
            margin-bottom: .5rem;
        }
    }
}
</style>
