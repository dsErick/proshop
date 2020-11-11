<template>
<div class="container-lg container-fluid">
    <h2>Cart</h2>

    <v-loader v-if="isLoading" />

    <v-alert
        v-else-if="error"
        :message="error"
    />
    
    <pre>{{ cart }}</pre>
</div>
</template>

<script>
import { computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'Cart',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const route = useRoute()
        const store = useStore()

        const cart = computed(() => store.getters['getCart'])

        onMounted(() => {
            if (route.query.product) store.dispatch('addItem', {
                id: route.query.product,
                quantity: route.query.qty ?? 1
            })
        })
        
        return {
            cart,
            isLoading: computed(() => store.getters['utils/isLoading']),
            error: computed(() => store.getters['utils/getError'])
        }
    }
}
</script>

<style scoped lang="scss">
</style>
