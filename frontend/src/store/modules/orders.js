import axios from 'axios'
import actionHandler from '../actionHandler'

const initialSingleOrderState = () => ({
    _id: '',
    user: '',
    orderItems: [],
    shippingAddress: {},
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
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
    /*
     * @desc        Fetch the logged in user orders
     * @access      Private
     */
    fetchMyOrders: actionHandler(async ({ commit, rootState }) => {
        commit('resetMyOrders')
        
        const { data } = await axios.get('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setMyOrders', data.data)
    }),
    
    /*
     * @desc        Fetch a user order by id
     * @access      Private
     */
    fetchSingleOrder: actionHandler(async ({ commit, rootState }, orderId) => {
        commit('resetSingleOrder')

        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${rootState.users.loggedUser.token}` }
        })

        commit('setSingleOrder', data.data)
    }),
    
    /*
     * @desc        Creates a new user order
     * @access      Private
     */
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

    /*
     * @desc        Update order paid status
     * @access      Private
     */
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
    
    /*
     * @desc        Fetch the paypal client id
     * @access      Private
     */
    paypalClientId: actionHandler(async () => {
        const { data } = await axios.get('/api/config/paypal')

        return data
    })
}

const mutations = {
    resetMyOrders: state => state.orders = [],
    setMyOrders: (state, orders) => state.orders = orders,
    
    resetSingleOrder: state => state.order = initialSingleOrderState(),
    setSingleOrder: (state, order) => Object.keys(order).forEach(key => state.order[key] = order[key])
}

export default {
    state,
    getters,
    actions,
    mutations
}
