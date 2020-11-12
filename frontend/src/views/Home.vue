<template>
<div id="home" class="container-lg container-fluid">
    <h2 class="mb-3">Latest Products</h2>

    <v-loader v-if="isLoading" />

    <v-alert v-else-if="error">
        {{ error }}
    </v-alert>
    
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
        VProduct: defineAsyncComponent(() => import(/* webpackChunkName: "product-component" */ '@/components/products/VProduct')),
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { products, setProducts, isLoading, error } = useProducts()
        onMounted(() => setProducts())
        
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
