import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default function useProducts() {
    const store = useStore()
    const route = useRoute()

    const products = computed(() => store.getters['getAllProducts'])
    const setProducts = () => store.dispatch('fetchAllProducts')

    const product = computed(() => store.getters['getSingleProduct'])
    const setProduct = () => store.dispatch('fetchSingleProduct', route.params.id)

    return {
        products,
        setProducts,
        product,
        setProduct,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}