<template>
<div id="shipping" class="container-lg container-fluid">
    <v-checkout-steps step1="active" />
    
    <div class="centered-flex-div">
        <h2 class="my-3">Shipping</h2>

        <form @submit.prevent="saveShippingAddress(shippingAddress)">
            <v-form-input
                v-model="shippingAddress.address"
                inputId="address"
                label="Address"
                :required="true"
                :autofocus="true"
            />
            <v-form-input
                v-model="shippingAddress.city"
                inputId="city"
                label="City"
                :required="true"
            />
            <v-form-input
                v-model="shippingAddress.postalCode"
                inputId="postalCode"
                label="Postal Code"
                :required="true"
            />
            <v-form-input
                v-model="shippingAddress.country"
                inputId="country"
                label="Country"
                :required="true"
            />

            <button type="submit" class="btn btn-dark px-4 mt-3">
                Continue
            </button>
        </form>
    </div>
</div>
</template>

<script>
import { ref } from 'vue'

import VFormInput from '@/components/VFormInput'
import VCheckoutSteps from '@/components/VCheckoutSteps'

import useCart from '@/composables/useCart'

export default {
    name: 'Shipping',
    components: {
        VFormInput,
        VCheckoutSteps
    },
    setup() {
        const { shippingAddress, saveShippingAddress } = useCart()
        const address = ref(shippingAddress.value)
        
        return {
            shippingAddress: address,
            saveShippingAddress
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/centered-flex-div';
</style>
