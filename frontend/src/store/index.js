import { createStore } from 'vuex'

import cart from './modules/cart'
import products from './modules/products'
import utils from './modules/utils'

export default createStore({
    modules: {
        cart,
        products,
        utils
    }
})
