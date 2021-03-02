<template>
<ul class="nav nav-tabs nav-justified">
    <li class="nav-item">
        <router-link
            class="nav-link"
            style="pointer-events: none; cursor: default;"
            :to="{ name: 'Login' }"
            tabindex="-1"
            aria-disabled="true"
        >
            Sign In
        </router-link>
    </li>
    <li class="nav-item">
        <router-link
            class="nav-link"
            :to="{ name: 'Shipping' }"
            :class="{'active': step1 === 'active'}"
        >
            Shipping
        </router-link>
    </li>
    <li class="nav-item">
        <router-link
            class="nav-link"
            :to="{ name: 'Payment' }"
            :class="{'disabled': !step2, 'active': step2 === 'active'}"
            :tabindex="step2 ? undefined : -1"
            :aria-disabled="step2 ? undefined : true"
        >
            Payment
        </router-link>
    </li>
    <li class="nav-item">
        <router-link
            class="nav-link"
            :to="{ name: 'Place Order' }"
            :class="{'disabled': !step3, 'active': step3 === 'active'}"
            :tabindex="step3 ? undefined : -1"
            :aria-disabled="step3 ? undefined : true"
        >
            Place Order
        </router-link>
    </li>
</ul>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'VCheckoutSteps',
    props: {
        step1: { type: String, default: '' },
        step2: { type: [Boolean, String], default: false },
        step3: { type: [Boolean, String], default: false }
    }
}
</script>

<style scoped lang="scss">
.nav-item {
    .nav-link {
        font-weight: 600;
        color: var(--dark);

        &.active { color: var(--secondary) }
        &.disabled {
            background-color: var(--light);
            color: var(--gray);
            text-decoration: line-through;
        }
    }
}
</style>
