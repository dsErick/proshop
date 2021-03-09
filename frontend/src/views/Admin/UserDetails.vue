<template>
<div id="user-details" class="container-lg container-fluid">
    <h2 class="mb-4">
        <router-link :to="{ name: 'admin.users.index' }" class="text-secondary">
            Users
        </router-link>
        <span class="text-muted">/</span>
        {{ user.name }}
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
            <h3 class="mb-3">Orders <sup>{{ orders.length }}</sup></h3>

            <v-alert type="alert-info" v-if="!isLoading && orders.length === 0">
                {{ user.name }} don't have any order yet.
            </v-alert>
            
            <div class="table-responsive" v-else>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th class="min-width">Date</th>
                            <th>Total</th>
                            <th :class="{'min-width': orders.some(order => order.isPaid)}">Paid</th>
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
                                    :to="{ name: 'orders.show', params: { id: order._id }}"
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
import { useRoute } from 'vue-router'
import VFormInput from '@/components/VFormInput'

import useUsersDetails from '@/composables/useUsersDetails'
import useOrders from '@/composables/useOrders'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

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
        const { orders, fetchAllOrders } = useOrders();

        fetchUserDetails(route.params.id)
        fetchAllOrders(route.params.id)

        const user = ref(userDetails.value)

        return {
            success,
            user,
            orders,
            updateUserDetails,
            dayjs,
            isLoading,
            error
        }
    }
}
</script>

<style scoped lang="scss">
.row > div {
    h3 sup {
        font-size: 45%;
        vertical-align: top;
        top: .3em;
        font-weight: 900;
    }
}

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
    table thead tr th.min-width {
        min-width: 11.5rem
    }
}

@media (max-width: 767px) {
    #user-details {
        > .row {
            margin: 0;
        
            > div { padding: 0; }
        }
    }
}
</style>