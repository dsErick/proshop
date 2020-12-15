import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faShoppingCart,
    faUser,
    faHome,
    faStar as faStarSolid,
    faStarHalfAlt,
    faTrash,
    faTimes,
    faCheck,
    faInfoCircle,
    faUserEdit,
    faUserTimes,
    faUserCog
} from '@fortawesome/free-solid-svg-icons'

import {
    faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'

library.add(faShoppingCart, faUser, faHome, faStarSolid, faStarRegular, faStarHalfAlt, faTrash, faTimes, faCheck, faInfoCircle, faUserEdit, faUserTimes, faUserCog)

export default FontAwesomeIcon