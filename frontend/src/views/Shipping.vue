<template>
<div id="shipping" class="container-lg container-fluid">
    <v-checkout-steps step1="active" />
    
    <div class="d-flex flex-column align-items-center">
        <h2 class="font-weight-bold mb-3">Shipping</h2>

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
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import VFormInput from '@/components/VFormInput'
import VCheckoutSteps from '@/components/VCheckoutSteps'
import useUsersAuthentication from '@/composables/useUsersAuthentication'

export default {
    name: 'Shipping',
    components: {
        VFormInput,
        VCheckoutSteps
    },
    setup() {
        const store = useStore()
        const router = useRouter()

        const { isLogged } = useUsersAuthentication()
        isLogged()
        
        const shippingAddress = computed(() => store.getters['getShippingAddress'])
        const saveShippingAddress = data => {
            store.dispatch('saveShippingAddress', data)
            router.push({ name: 'Login', query: { redirect: 'payment' } })
        }

        return {
            shippingAddress,
            saveShippingAddress
        }
    }
}
</script>

<style scoped lang="scss">
#shipping {
    .d-flex > .alert,
    .d-flex > form {
        min-width: 50%;
    }
}

@media (max-width: 767px) {
    #shipping {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 75%;
        }
    }
}

@media (max-width: 575px) {
    #shipping {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 90%;
        }
    }
}
</style>
