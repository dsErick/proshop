import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function useProducts() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const products = computed(() => store.getters['getAllProducts'])
    const product = computed(() => store.getters['getSingleProduct'])

    const setProducts = () => store.dispatch('fetchAllProducts')
    const setProduct = () => store.dispatch('fetchSingleProduct', route.params.id)
    const createProduct = async () => {
        const productId = await store.dispatch('createProduct')
        
        if (productId) router.push(`/admin/products/${productId}`)
    }
    const deleteProduct = productId => {
        if (window.confirm(`Do you really want to remove the product ${productId}`)) store.dispatch('deleteProduct', productId)
    }
    
    const addToCart = (id, qty = 1) => {
        store.dispatch('addItem', {
            id,
            quantity: Number(qty)
        })
        router.push({ name: 'cart' })
    }
    const removeFromCart = id => store.dispatch('removeItem', id)

    return {
        products,
        product,

        setProducts,
        setProduct,
        createProduct,
        deleteProduct,

        addToCart,
        removeFromCart,

        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}