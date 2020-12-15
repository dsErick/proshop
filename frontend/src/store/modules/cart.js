import axios from 'axios'
import actionHandler from '../actionHandler'

const state = {
    items: JSON.parse(localStorage.getItem('cartItems')) ?? [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) ?? {},
    paymentMethod: 'PayPal'
}

const getters = {
    getCartItems: state => state.items,
    getCartCount: state => state.items.length,

    getShippingAddress: state => state.shippingAddress,
    getPaymentMethod: state => state.paymentMethod
}

const actions = {
    /*
     * @desc        Add or update a cart item
     * @access      Public
     */
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
    
    /*
     * @desc        Remove a cart item
     * @access      Public
     */
    removeItem({ commit, state }, id) {
        commit('removeCartItem', id)
        localStorage.setItem('cartItems', JSON.stringify(state.items))
    },

    /*
     * @desc        Save the user shipping address on localStorage
     * @access      Public
     */
    saveShippingAddress({ commit, state }, { address, city, postalCode, country }) {
        commit('setShippingAddress', { address, city, postalCode, country })
        localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },

    /*
     * @desc        Save the user payment method on localStorage
     * @access      Public
     */
    savePaymentMethod({ commit }, paymentMethod) {
        commit('setPaymentMethod', paymentMethod)
    }
}

const mutations = {
    addItemToCart: (state, item) => state.items.unshift(item),
    updateCartItem: (state, newItem) => {
        const item = state.items.find(item => item.product === newItem.product)
        Object.keys(newItem).forEach(key => item[key] = newItem[key])
    },
    removeCartItem: (state, id) => state.items = state.items.filter(item => item.product !== id),

    setShippingAddress: (state, shippingAddress) => Object.keys(shippingAddress).forEach(key => state.shippingAddress[key] = shippingAddress[key]),
    setPaymentMethod: (state, paymentMethod) => state.paymentMethod = paymentMethod
}

export default {
    state,
    getters,
    actions,
    mutations
}
