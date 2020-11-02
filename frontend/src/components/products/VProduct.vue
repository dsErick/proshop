<template>
<div class="card">
    <router-link :to="{ name: 'Product', params: { productId: product._id } }">
        <img :src="product.image" class="card-img-top">
    </router-link>

    <div class="card-body">
        <router-link :to="{ name: 'Product', params: { productId: product._id } }" class="text-dark">
            <h5 class="card-title"><strong>{{ product.name }}</strong></h5>
        </router-link>

        <div class="card-text my-3">
            <v-rating
                :value="product.rating"
                :text="` from ${product.numReviews} reviews`"
            />
        </div>

        <h3 class="card-text my-3">${{ product.price }}</h3>
    </div>
</div>
</template>

<script>
import VRating from './VRating'

export default {
    name: 'VProduct',
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
    components: {
        VRating
    }
}
</script>

<style scoped lang="scss">
</style>
