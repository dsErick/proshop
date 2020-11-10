import axios from 'axios'

const state = {
    products: []
}

const getters = {
    getProducts: state => state.products
}

const actions = {
    fetchProducts: async ({ commit }) => {
        try {
            commit('utils/setLoading', true, { root: true })

            const { data } = await axios.get('/api/products')

            commit('setProducts', data.data)
            
        } catch (err) {
            console.log(err, err.response)
            
        } finally {
            commit('utils/setLoading', false, { root: true })
        }
    }
}

const mutations = {
    setProducts: (state, products) => state.products = products
}

export default {
    state,
    getters,
    actions,
    mutations
}
