import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default function useCart() {
    const store = useStore()
    const router = useRouter()

    
    const cartItems = computed(() => store.getters['getCartItems'])
    const shippingAddress = computed(() => store.getters['getShippingAddress'])
    const paymentMethod = computed(() => store.getters['getPaymentMethod'])

    const cartSummary = reactive({
        itemsPrice: cartItems.value.reduce((acc, item) => acc + item.quantity * item.price, 0)
    })
    cartSummary.shippingPrice = cartSummary.itemsPrice > 100 ? 0 : 50
    cartSummary.taxPrice = Number((0.15 * cartSummary.itemsPrice).toFixed(2))
    cartSummary.totalPrice = Number((cartSummary.itemsPrice + cartSummary.shippingPrice + cartSummary.taxPrice).toFixed(2))


    const checkout = () => router.push({ name: 'Shipping' })
    const saveShippingAddress = shippingAddress => {
        store.dispatch('saveShippingAddress', shippingAddress)
        router.push({ name: 'Payment' })
    }
    const savePaymentMethod = paymentMethod => {
        store.dispatch('savePaymentMethod', paymentMethod)
        router.push({ name: 'Place Order' })
    }
    const placeOrder = async () => {
        if (await store.dispatch('createOrder', cartSummary)) router.push({ name: 'Order Details', params: { id: (store.getters['getSingleOrder'])._id }})
    }

    
    return {
        cartItems,
        shippingAddress,
        paymentMethod,
        cartSummary,

        checkout,
        saveShippingAddress,
        savePaymentMethod,
        placeOrder,
        
        isLoading: computed(() => store.getters['utils/isLoading']),
        error: computed(() => store.getters['utils/getError'])
    }
}