<template>
<div class="card">
    <!-- <router-link :to="`/products/${product._id}`" class="text-dark"> -->
    <router-link :to="''" class="text-dark">
        <img :src="product.image" class="card-img-top">

        <div class="card-body">
            <h5 class="card-title"><strong>{{ product.name }}</strong></h5>

            <div class="card-text my-3">
                <v-rating
                    :value="product.rating"
                    :text="` from ${product.numReviews} reviews`"
                />
            </div>

            <h3 class="card-text my-3">${{ product.price }}</h3>
        </div>
    </router-link>
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
