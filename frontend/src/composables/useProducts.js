import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function useProducts() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const products = computed(() => store.getters['getAllProducts'])
    const setProducts = () => store.dispatch('fetchAllProducts')

    const product = computed(() => store.getters['getSingleProduct'])
    const setProduct = () => store.dispatch('fetchSingleProduct', route.params.id)

    const addToCart = (id, qty = 1) => router.push({
        name: 'Cart',
        params: { productId: id },
        query: { qty }
    })

    return {
        products,
        setProducts,
        product,
        setProduct,
        addToCart,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}