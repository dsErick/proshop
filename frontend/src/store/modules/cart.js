import axios from 'axios'
import actionHandler from '../actionHandler'

const state = {
    items: JSON.parse(localStorage.getItem('cartItems')) ?? []
}

const getters = {
    getCartItems: state => state.items,
    getCartCount: state => state.items.length
}

const actions = {
    addItem: actionHandler(async ({ commit, state }, { id, quantity }) => {
        const { data } = await axios.get(`/api/products/${id}`)
        const { _id, name, image, price, countInStock } = data.data
        
        const existItem = state.items.findIndex(item => item.product === _id)
        
        commit(existItem !== -1 ? 'updateCartItem' : 'addItemToCart', {
            product: _id,
            name,
            image,
            price,
            countInStock,
            quantity
        })

        localStorage.setItem('cartItems', JSON.stringify(state.items))
    }),
    removeItem({ commit, state }, id) {
        commit('removeCartItem', id)
        
        localStorage.setItem('cartItems', JSON.stringify(state.items))
    }
}

const mutations = {
    addItemToCart: (state, item) => state.items.unshift(item),
    updateCartItem: (state, newItem) => {
        const item = state.items.find(item => item.product === newItem.product)
        Object.keys(newItem).forEach(key => item[key] = newItem[key])
    },
    removeCartItem: (state, id) => state.items = state.items.filter(item => item.product !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}
