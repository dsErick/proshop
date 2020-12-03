import { createStore } from 'vuex'

import cart from './modules/cart'
import orders from './modules/orders'
import products from './modules/products'
import users from './modules/users'
import utils from './modules/utils'

export default createStore({
    modules: {
        cart,
        orders,
        products,
        users,
        utils
    }
})
