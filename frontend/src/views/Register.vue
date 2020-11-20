<template>
<div id="register" class="container-lg container-fluid">
    <div class="d-flex flex-column align-items-center">
        <h2 class="font-weight-bold mb-3 mt-4">Sign Up</h2>

        <v-loader v-if="isLoading" />

        <v-alert class="mb-3" v-else-if="error.message">
            {{ error.message }}
        </v-alert>

        <form @submit.prevent="registerUser(formData)">
            <v-form-input
                v-model="formData.name"
                inputId="name"
                label="Name"
                :errors="error.errors ? error.errors.name : undefined"
                :autofocus="true"
            />
            <v-form-input
                v-model="formData.email"
                inputId="email"
                label="Email Address"
                :errors="error.errors ? error.errors.email : undefined"
            />
            <v-form-input
                v-model="formData.password"
                inputId="password"
                label="Password"
                type="password"
                :errors="error.errors ? error.errors.password : undefined"
            />
            <v-form-input
                v-model="formData.confirmPassword"
                inputId="confirmPassword"
                label="Confirm Password"
                type="password"
            />

            <div class="d-flex align-items-center justify-content-between mt-4">
                <button type="submit" class="btn btn-dark px-4">
                    Register
                </button>

                <p class="mb-0">
                    Have an account? 
                    <router-link :to="{ name: 'Login', query: { redirect }}">Sign In</router-link>
                </p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { reactive, defineAsyncComponent } from 'vue'
import VFormInput from '@/components/VFormInput'
import useUsers from '@/composables/useUsers.js'

export default {
    name: 'Register',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { registerUser, redirect, error, isLoading } = useUsers()
        const formData = reactive({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })

        return {
            formData,
            registerUser,
            redirect,
            error,
            isLoading
        }
    }
}
</script>

<style scoped lang="scss">
#register {
    .d-flex > .alert,
    .d-flex > form {
        min-width: 50%;
    }
}

@media (max-width: 767px) {
    #register {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 75%;
        }
    }
}

@media (max-width: 575px) {
    #register {
        .d-flex > .alert,
        .d-flex > form {
            min-width: 90%;
        }
    }
}
</style>
