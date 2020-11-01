import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faShoppingCart,
    faUser,
    faHome,
    faStar as faStarSolid,
    faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons'

import {
    faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'

library.add(faShoppingCart, faUser, faHome, faStarSolid, faStarRegular, faStarHalfAlt)

export default FontAwesomeIcon