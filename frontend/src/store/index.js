import { createStore } from 'vuex'

import cart from './modules/cart'
import products from './modules/products'
import users from './modules/users'
import utils from './modules/utils'

export default createStore({
    modules: {
        cart,
        products,
        users,
        utils
    }
})
