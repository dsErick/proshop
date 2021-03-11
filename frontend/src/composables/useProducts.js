import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default function useProducts() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const success = ref(false)
    const products = computed(() => store.getters['getAllProducts'])
    const product = computed(() => store.getters['getSingleProduct'])

    /**
     * Product CRUD
     */
    const setProducts = () => store.dispatch('fetchAllProducts')
    const setProduct = () => store.dispatch('fetchSingleProduct', route.params.id)
    const createProduct = async () => {
        const productId = await store.dispatch('createProduct')
        
        if (productId) router.push(`/admin/products/${productId}`)
    }
    const updateProduct = async product => {
        success.value = await store.dispatch('updateProduct', product)
    }
    const deleteProduct = productId => {
        if (window.confirm(`Do you really want to remove the product ${productId}`)) store.dispatch('deleteProduct', productId)
    }
    
    /**
     * Add and Remove product from cart
     */
    const addToCart = (id, qty = 1) => {
        store.dispatch('addItem', {
            id,
            quantity: Number(qty)
        })
        router.push({ name: 'cart' })
    }
    const removeFromCart = id => store.dispatch('removeItem', id)

    return {
        success,
        products,
        product,

        setProducts,
        setProduct,
        createProduct,
        updateProduct,
        deleteProduct,

        addToCart,
        removeFromCart,

        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}