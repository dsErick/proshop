<template>
<div id="login" class="container-lg container-fluid">
    <div class="d-flex flex-column align-items-center">
        <h2 class="font-weight-bold mb-3 mt-4">Sign In</h2>

        <v-loader v-if="isLoading" />

        <v-alert v-else-if="error.message">
            {{ error.message }}
        </v-alert>

        <form @submit.prevent="authUser(formData)">
            <v-form-input
                v-model="formData.email"
                inputId="email"
                label="Email Address"
                :autofocus="true"
                :autocomplete="true"
            />
            <v-form-input
                class="mb-1"
                v-model="formData.password"
                inputId="password"
                label="Password"
                type="password"
                :autocomplete="true"
            />

            <div class="d-flex align-items-center justify-content-between mt-4">
                <button type="submit" class="btn btn-dark px-4">
                    Login
                </button>

                <p class="mb-0">
                    New Costumer? 
                    <!-- <router-link :to="{ name: 'Register', query: { redirect }}">Sign Up</router-link> -->
                    <a href="/register">Sign Up</a>
                </p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { reactive, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VFormInput from '@/components/VFormInput'
import useUsers from '@/composables/useUsers.js'

export default {
    name: 'Login',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const { user, authUser, isLoading, error } = useUsers()
        
        const formData = reactive({
            email: '',
            password: ''
        })
        const redirect = route.query.redirect ?? ''

        watch(user.value, user => {
            if (user._id) router.push(`/${redirect}`)
        }, { immediate: true })
        
        return {
            formData,
            redirect,
            authUser,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
#login {
    .d-flex > .alert,
    .d-flex > form {
        min-width: 50%;
    }
}

@media (max-width: 767px) {
    #login {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 75%;
        }
    }
}

@media (max-width: 575px) {
    #login {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 90%;
        }
    }
}
</style>
