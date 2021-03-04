<template>
<div id="user-details" class="container-lg container-fluid">
    <h2 class="mb-4">
        <router-link :to="{ name: 'Admin - Users' }" class="text-secondary">
            Users
        </router-link>
        <span class="text-secondary">/</span>
        {{ $route.params.id }}
    </h2>

    <v-loader v-if="isLoading" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <div class="row">
        <div class="col-lg-3">
            <h3 class="mb-3">Details</h3>

            <v-alert v-if="success" type="alert-success">
                Profile updated
            </v-alert>

            <form @submit.prevent="updateUserDetails(user)">
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
                    class="mb-2"
                    :errors="error.errors ? error.errors.email : undefined"
                />

                <div class="form-check mb-3">
                    <input id="isAdmin" type="checkbox" class="form-check-input" v-model="user.isAdmin">
                    <label for="isAdmin" class="form-check-label">Is Admin</label>
                </div>
                
                <button type="submit" class="btn btn-dark btn-block">
                    Update
                </button>
            </form>
        </div>
        <div class="col-lg-9 mt-lg-0 mt-4">
            <h3 class="mb-3">Orders</h3>

            <!-- <v-alert type="alert-info" v-if="orders.length === 0">
                {{ user.name }} don't have any order yet.
            </v-alert> -->
            
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th class="min-width">Date</th>
                            <th>Total</th>
                            <th class="min-width">Paid</th>
                            <th class="min-width">Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import useUsersDetails from '@/composables/useUsersDetails'
import VFormInput from '@/components/VFormInput'

export default {
    name: 'User Details',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const route = useRoute()
        const { success, userDetails, fetchUserDetails, updateUserDetails, isLoading, error } = useUsersDetails()

        fetchUserDetails(route.params.id)

        const user = ref(userDetails.value)

        return {
            success,
            user,
            updateUserDetails,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
</style>