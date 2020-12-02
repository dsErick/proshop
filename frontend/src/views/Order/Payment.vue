<template>
<div id="payment" class="container-lg container-fluid">
    <v-checkout-steps step2="active" />
    
    <div class="centered-flex-div">
        <h2 class="font-weight-bold my-3 text-center">Payment</h2>

        <form @submit.prevent="savePaymentMethod(paymentMethod)">
            <legend>Payment Method</legend>

            <div class="form-check">
                <input
                    id="paypal"
                    class="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="PayPal"
                    v-model="paymentMethod"
                >
                <label class="form-check-label" for="paypal">PayPal or Credit Card</label>
            </div>
            <!-- <div class="form-check">
                <input
                    id="pagseguro"
                    class="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="pagseguro"
                    v-model="paymentMethod"
                >
                <label class="form-check-label" for="pagseguro">PagSeguro</label>
            </div> -->
            
            <button type="submit" class="btn btn-dark px-4 mt-4">
                Continue
            </button>
        </form>
    </div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useUsersAuthentication from '@/composables/useUsersAuthentication'
import VFormInput from '@/components/VFormInput'
import VCheckoutSteps from '@/components/VCheckoutSteps'

export default {
    name: 'Payment',
    components: {
        VFormInput,
        VCheckoutSteps
    },
    setup() {
        const { isLogged } = useUsersAuthentication()
        isLogged()
        
        const store = useStore()
        const router = useRouter()

        const shippingAddress = computed(() => store.getters['getShippingAddress'])
        if (Object.keys(shippingAddress.value).length === 0 ) router.push({ name: 'Shipping' })

        const paymentMethod = ref(store.getters['getPaymentMethod'])
        const savePaymentMethod = data => {
            store.dispatch('savePaymentMethod', data)
            router.push({ name: 'Place Order' })
        }
        
        return {
            paymentMethod,
            savePaymentMethod
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_centeredFlexDiv.scss';
</style>
