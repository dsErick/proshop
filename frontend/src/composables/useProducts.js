import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default function useProducts() {
    const products = ref([])
    const setProducts = async () => {
        try {
            const { data } = await axios.get('/api/products')
    
            products.value = data.data

        } catch (err) {
            console.log(err, err.response)
        }
    }

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
        error,
        setProduct
    }
}