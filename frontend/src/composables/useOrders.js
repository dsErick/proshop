import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default function useOrders() {
    const store = useStore()
    const router = useRouter()

    const orders = computed(() => store.getters['getAllOrders'])
    const order = computed(() => store.getters['getSingleOrder'])

    const fetchAllOrders = (userId = undefined) => store.dispatch('fetchAllOrders', userId)
    const fetchMyOrders = () => store.dispatch('fetchMyOrders')
    const fetchSingleOrder = orderId => store.dispatch('fetchSingleOrder', orderId)
    
    const placeOrder = async cartSummary => {
        if (await store.dispatch('createOrder', cartSummary)) router.push({ name: 'Order Details', params: { id: order.value._id }})
    }
    
    const payOrder = (orderId, details) => store.dispatch('payOrder', { orderId, details })
    const fetchPaypalClientId = () => store.dispatch('paypalClientId')

    
    return {
        orders,
        order,

        fetchAllOrders,
        fetchMyOrders,
        fetchSingleOrder,
        placeOrder,
        payOrder,
        fetchPaypalClientId,

        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}
