import axios from 'axios'
import actionHandler from '../actionHandler'

const initialSingleOrderState = () => ({
    _id: '',
    user: '',
    orderItems: [],
    shippingAddress: {}
})

const state = {
    orders: [],
    order: initialSingleOrderState()
}

const getters = {
    getAllOrders: state => state.orders,
    getSingleOrder: state => state.order
}

const actions = {
    fetchSingleOrder: actionHandler(async ({ commit, rootState }, order) => {
        const { data } = await axios.get(`/api/orders/${order}`, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setSingleOrder', data.data)
    }),
    createOrder: actionHandler(async ({ commit, rootState }, cartSummary) => {
        const { items, shippingAddress, paymentMethod } = rootState.cart

        const { data } = await axios.post('/api/orders', {
            orderItems: items,
            shippingAddress,
            paymentMethod,
            ...cartSummary
        }, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setSingleOrder', data.data)
    })
}

const mutations = {
    setSingleOrder: (state, order) => Object.keys(order).forEach(key => state.order[key] = order[key])
}

export default {
    state,
    getters,
    actions,
    mutations
}
