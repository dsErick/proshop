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
                    value="PagSeguro"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import VFormInput from '@/components/VFormInput'
import VCheckoutSteps from '@/components/VCheckoutSteps'

import useCart from '@/composables/useCart'

export default {
    name: 'Payment',
    components: {
        VFormInput,
        VCheckoutSteps
    },
    setup() {
        const { shippingAddress, paymentMethod, savePaymentMethod } = useCart()
        const method = ref(paymentMethod.value)
        
        if (Object.values(shippingAddress.value).some(value => value.length === 0)) {
            const router = useRouter()
            router.push({ name: 'Shipping' })
        }

        return {
            paymentMethod: method,
            savePaymentMethod
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/centered-flex-div';
</style>
