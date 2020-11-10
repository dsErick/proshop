import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default function useProducts() {
    const store = useStore()

    const products = computed(() => store.getters.getProducts)
    const setProducts = () => store.dispatch('fetchProducts')


    const product = ref({})
    const error = ref('')
    const setProduct = async () => {
        const $route = useRoute()
        try {
            const { data } = await axios.get(`/api/products/${$route.params.id}`)

            product.value = data.data
            
        } catch (err) {
            console.log(err, err.response)

            if (err.response.status === 404) error.value = err.response.data.message

            if (err.response.status === 422) error.value = `Product not found with the id of ${$route.params.id}`
        }
    }

    return {
        products,
        setProducts,
        product,
        setProduct,
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}