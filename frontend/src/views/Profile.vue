<template>
<div id="profile" class="container-lg container-fluid">
    <v-loader v-if="isLoading" />

    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <div class="row">
        <div class="col-lg-3">
            <h2 class="mb-3">User Profile</h2>

            <v-alert v-if="success" type="alert-success">
                Profile updated
            </v-alert>

            <form @submit.prevent="updateUserProfile(user)">
                <v-form-input
                    v-model="user.name"
                    inputId="name"
                    label="Name"
                    :errors="error.errors ? error.errors.name : undefined"
                />
                <v-form-input
                    v-model="user.email"
                    inputId="email"
                    label="Email Address"
                    :errors="error.errors ? error.errors.email : undefined"
                />
                <v-form-input
                    v-model="user.password"
                    inputId="password"
                    label="Password"
                    type="password"
                    :errors="error.errors ? error.errors.password : undefined"
                />
                <v-form-input
                    v-model="user.confirmPassword"
                    inputId="confirmPassword"
                    label="Confirm Password"
                    type="password"
                />

                <button type="submit" class="btn btn-dark btn-block">
                    Update
                </button>
            </form>
        </div>
        <div class="col-lg-9">
            <h2>My Orders</h2>
        </div>
    </div>
</div>
</template>

<script>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import VFormInput from '@/components/VFormInput'
import useUsersAuthentication from '@/composables/useUsersAuthentication'

export default {
    name: 'Profile',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const store = useStore()
        const router = useRouter()

        const { isLogged } = useUsersAuthentication()
        isLogged()

        const success = ref(false)
        const user = computed(() => store.getters['getUserDetails'])
        store.dispatch('fetchUserDetails')

        const updateUserProfile = async user => {
            user.password !== user.confirmPassword
                ? store.commit('utils/setError', { message: 'The password confirmation must match' }, { root: true })
                : (await store.dispatch('updateUserProfile', user))
                    ? success.value = true
                    : success.value = false
        }
        
        return {
            success,
            user,
            updateUserProfile,
            isLoading: computed(() => store.getters['utils/isLoading']),
            error: computed(() => store.getters['utils/getError'])
        }
    }
}
</script>

<style scoped lang="scss">
</style>
