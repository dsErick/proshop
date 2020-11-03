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
import { ref, onMounted, defineAsyncComponent } from 'vue'
import axios from 'axios'

export default {
    name: 'Home',
    components: {
        VProduct: defineAsyncComponent(() => import(/* webpackChunkName: "product-component" */ '@/components/products/VProduct'))
    },
    setup() {
        const products = ref([])
        const setProducts = data => products.value = data

        onMounted(async () => {
            try {
                const { data } = await axios.get('/api/products')

                if (data.success) setProducts(data.data)

            } catch (err) {
                console.log(err, err.response)
            }
        })
        
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
