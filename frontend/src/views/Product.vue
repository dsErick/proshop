<template>
<div id="product" class="container-lg container-fluid">
    <router-link :to="{ name: 'Home' }" class="btn btn-dark mb-3">Go back</router-link>

    <div class="row" v-if="product._id">
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

    <div
        class="alert alert-danger"
        role="alert"
        v-if="error"
    >
        {{ error }}
    </div>
</div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import VRating from '@/components/products/VRating'
import axios from 'axios'

export default {
    name: 'Product',
    components: {
        VRating
    },
    setup() {
        const product = ref({})
        const setProduct = data => product.value = data

        const error = ref('')
        const setError = err => error.value = err

        onMounted(async () => {
            try {
                const $route = useRoute()
                const { data } = await axios.get(`/api/products/${$route.params.id}`)
    
                if (data.success) setProduct(data.data)
                
            } catch (err) {
                console.log(err, err.response)

                if (!err.response.data.success) setError(err.response.data.message)
            }
        })
        
        return {
            product,
            error
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
