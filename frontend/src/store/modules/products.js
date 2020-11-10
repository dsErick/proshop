import axios from 'axios'
import actionHandler from '@/utils/actionHandler'

const state = {
    products: []
}

const getters = {
    getProducts: state => state.products
}

const actions = {
    fetchProducts: actionHandler(async ({ commit }) => {
        const { data } = await axios.get('/api/products')

        commit('setProducts', data.data)
    })
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
