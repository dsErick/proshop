import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default function useProducts() {
    const products = ref([])
    const setProducts = async () => {
        try {
            const { data } = await axios.get('/api/products')
    
            if (data.success) products.value = data.data

        } catch (err) {
            console.log(err, err.response)
        }
    }

    const product = ref({})
    const error = ref('')
    const setProduct = async () => {
        try {
            const $route = useRoute()
            const { data } = await axios.get(`/api/products/${$route.params.id}`)

            if (data.success) product.value = data.data
            
        } catch (err) {
            console.log(err, err.response)

            if (!err.response.data.success) error.value = err.response.data.message
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