<template>
<div id="login" class="container-lg container-fluid">
    <div class="centered-flex-div">
        <h2 class="mb-3 mt-4">Sign In</h2>

        <v-loader v-if="isLoading" />

        <v-alert v-else-if="error.message">
            {{ error.message }}
        </v-alert>

        <form @submit.prevent="loginUser(formData)">
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
                    <router-link :to="{ name: 'Register', query: { redirect }}">Sign Up</router-link>
                </p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { reactive, defineAsyncComponent } from 'vue'
import VFormInput from '@/components/VFormInput'
import useUsersAuthentication from '@/composables/useUsersAuthentication.js'

export default {
    name: 'Login',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { user, loginUser, redirect, redirectWatch, isLoading, error } = useUsersAuthentication()
        const formData = reactive({
            email: '',
            password: ''
        })
        
        redirectWatch()
        
        return {
            formData,
            loginUser,
            redirect,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/centered-flex-div';
</style>
