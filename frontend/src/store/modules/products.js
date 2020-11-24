import axios from 'axios'
import actionHandler from '@/store/actionHandler'

const initialSingleProductState = () => ({
    user: '',
    name: '',
    image: '',
    brand: '',
    category: '',
    description: '',
    reviews: [],
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0
})

const state = {
    products: [],
    product: initialSingleProductState()
}

const getters = {
    getAllProducts: state => state.products,
    getSingleProduct: state => state.product
}

const actions = {
    fetchAllProducts: actionHandler(async ({ commit }) => {
        const { data } = await axios.get('/api/products')

        commit('setAllProducts', data.data)
    }),
    fetchSingleProduct: actionHandler(async ({ commit }, product) => {
        const { data } = await axios.get(`/api/products/${product}`)

        commit('setSingleProduct', data.data)
    })
}

const mutations = {
    setAllProducts: (state, products) => state.products = products,
    setSingleProduct: (state, newProduct) => Object.keys(newProduct).forEach(key => state.product[key] = newProduct[key])
}

export default {
    state,
    getters,
    actions,
    mutations
}
