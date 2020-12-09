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
    getMyOrders: state => state.orders,
    getSingleOrder: state => state.order
}

const actions = {
    fetchMyOrders: actionHandler(async ({ commit, rootState }) => {
        const { data } = await axios.get('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setMyOrders', data.data)
    }),
    fetchSingleOrder: actionHandler(async ({ commit, rootState }, orderId) => {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setSingleOrder', data.data)
    }),
    createOrder: actionHandler(async ({ commit, rootState }, cartSummary) => {
        const { items: orderItems, shippingAddress, paymentMethod } = rootState.cart

        const { data } = await axios.post('/api/orders', {
            orderItems,
            shippingAddress,
            paymentMethod,
            ...cartSummary
        }, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setSingleOrder', data.data)
    }),

    payOrder: actionHandler(async ({ commit, rootState }, { orderId, details }) => {
        const { id, status, update_time: updateTime, payer: { email_address: emailAddress } } = details
        
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, {
            id,
            status,
            updateTime,
            emailAddress
        }, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })
        
        commit('setSingleOrder', data.data)
    }),
    paypalClientId: actionHandler(async () => {
        const { data } = await axios.get('/api/config/paypal')

        return data
    })
}

const mutations = {
    setMyOrders: (state, orders) => state.orders = orders,
    setSingleOrder: (state, order) => Object.keys(order).forEach(key => state.order[key] = order[key])
}

export default {
    state,
    getters,
    actions,
    mutations
}
