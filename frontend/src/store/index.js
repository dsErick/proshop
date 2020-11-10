import { createStore } from 'vuex'

import products from './modules/products'
import utils from './modules/utils'

export default createStore({
    modules: {
        products,
        utils
    }
})
