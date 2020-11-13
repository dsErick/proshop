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

    const addToCart = (id, qty = 1) => {
        store.dispatch('addItem', {
            id,
            quantity: Number(qty)
        })
        router.push({ name: 'Cart' })
    }
    const removeFromCart = id => store.dispatch('removeItem', id)

    return {
        products,
        setProducts,
        product,
        setProduct,
        addToCart,
        removeFromCart,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}