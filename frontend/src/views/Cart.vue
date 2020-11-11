<template>
<div>
    <h2>Cart</h2>
    <pre>{{ $route.query }}</pre>
    <pre>{{ $route.params }}</pre>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
    name: 'Cart',
    setup() {
        const route = useRoute()

        console.log(route.params, route.query)
        
        return {}
    }
}
</script>

<style scoped lang="scss">
</style>
