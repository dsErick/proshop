<template>
<div id="product" class="container-lg container-fluid">
    <h2>Product</h2>

    <pre>{{ $route }}</pre>
</div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'Product',
    setup() {
        const route = useRoute()

        onMounted(() => {
            console.log(`Getting product with id of %c${route.params.productId}`, 'color: cyan')
        })
    }
}
</script>

<style scoped lang="scss">
</style>
