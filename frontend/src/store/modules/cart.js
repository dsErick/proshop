import axios from 'axios'
import actionHandler from '../actionHandler'

const state = {
    items: JSON.parse(localStorage.getItem('cartItems')) ?? []
}

const getters = {
    getCart: state => state.items
}

const actions = {
    addItem: actionHandler(async ({ commit, state }, { id, quantity }) => {
        const { data } = await axios.get(`/api/products/${id}`)
        const { _id, name, image, price } = data.data
        
        const existItem = state.items.find(item => item.product === _id)

        commit(existItem ? 'updateCartItem' : 'addItemToCart', {
            product: _id,
            name,
            image,
            price,
            quantity
        })

        localStorage.setItem('cartItems', JSON.stringify(state.items))
    }),
    removeItem() {
        console.log('Remove item from cart')
    }
}

const mutations = {
    addItemToCart: (state, item) => state.items.unshift(item),
    updateCartItem: (state, newItem) => {
        const item = state.items.find(item => item.product === newItem.product)
        Object.keys(newItem).forEach(key => item[key] = newItem[key])
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
