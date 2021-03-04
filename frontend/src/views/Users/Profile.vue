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
        <div class="col-lg-9 mt-lg-0 mt-4">
            <h2 class="mb-3">My Orders</h2>

            <v-alert type="alert-info" v-if="orders.length === 0">
                You don't have any order yet.
            </v-alert>
            
            <div class="table-responsive" v-else>
                <table class="table table-striped table-bordered table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th class="min-width">Date</th>
                            <th>Total</th>
                            <th class="min-width">Paid</th>
                            <th :class="{'min-width': orders.some(order => order.isDelivered)}">Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order._id">
                            <td>{{ order._id }}</td>
                            <td>{{ dayjs(order.createdAt).format('lll') }}</td>
                            <td>
                                {{
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(order.totalPrice)
                                }}
                            </td>
                            <td>
                                <span v-if="order.isPaid">
                                    {{ dayjs(order.paidAt).format('lll') }}
                                </span>
                                <font-awesome-icon :icon="['fas', 'times']" v-else />
                            </td>
                            <td>
                                <span v-if="order.isDelivered">
                                    {{ dayjs(order.deliveredAt).format('lll') }}
                                </span>
                                <font-awesome-icon :icon="['fas', 'times']" v-else />
                            </td>
                            <td>
                                <router-link
                                    :to="{ name: 'Order Details', params: { id: order._id }}"
                                    class="btn btn-link btn-sm"
                                >
                                    <font-awesome-icon :icon="['fas', 'info-circle']" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import useUsersDetails from '@/composables/useUsersDetails'
import VFormInput from '@/components/VFormInput'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

export default {
    name: 'Profile',
    components: {
        VFormInput,
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { success, userDetails, userOrders: orders, fetchUserDetails, fetchMyOrders, updateUserProfile, isLoading, error } = useUsersDetails()
        
        fetchUserDetails()
        fetchMyOrders()

        const user = ref(userDetails.value)

        return {
            success,
            user,
            orders,
            updateUserProfile,
            dayjs,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
table {
    thead tr th,
    tbody tr td {
        text-align: center;
        vertical-align: middle;

        svg {
            &.fa-times { color: var(--danger) }
        }
    }
}

@media (max-width: 991px) {
    form {
        max-width: 50%;
        margin: 0 auto;
    }
    
    table thead tr th.min-width {
        min-width: 11.5rem
    }
}

@media (max-width: 767px) {
    #profile {
        > .row {
            margin: 0;
        
            > div { padding: 0; }
        }
    }

    form { max-width: 75% }
}

@media (max-width: 575px) {
    form { max-width: unset }
}
</style>
