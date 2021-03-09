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
    /*
     * @desc        Fetch all products
     * @access      Public
     */
    fetchAllProducts: actionHandler(async ({ commit }) => {
        const { data } = await axios.get('/api/products')

        commit('setAllProducts', data.data)
    }),

    /*
     * @desc        Fetch a single products by id
     * @access      Public
     */
    fetchSingleProduct: actionHandler(async ({ commit }, productId) => {
        const { data } = await axios.get(`/api/products/${productId}`)

        commit('setSingleProduct', data.data)
    }),
    
    /*
     * @desc        Create a new product with sample data
     * @access      Admin
     */
    createProduct: actionHandler(async ({ rootState }) => {
        const { data } = await axios.post('/api/products', {}, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        return data.data._id
    }),
    
    /*
     * @desc        Delete product by id
     * @access      Admin
     */
    deleteProduct: actionHandler(async ({ dispatch, rootState }, productId) => {
        await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        dispatch('fetchAllProducts')
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
