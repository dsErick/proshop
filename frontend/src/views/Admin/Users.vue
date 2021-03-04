<template>
<div id="users" class="container-lg container-fluid">
    <h2 class="font-weight-bold mb-3">Users</h2>
    
    <v-loader v-if="isLoading" />
    <v-alert v-else-if="error.message">
        {{ error.message }}
    </v-alert>

    <div class="table-responsive" v-else>
        <table class="table table-striped table-bordered table-hover table-sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th class="min-width">Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td>{{ user._id }}</td>
                    <td>{{ user.name }}</td>
                    <td>
                        <a :href="`mailto:${user.email}`">{{ user.email }}</a>
                    </td>
                    <td>
                        <font-awesome-icon :icon="['fas', user.isAdmin ? 'check' : 'times']" />
                    </td>
                    <td>
                        <div class="btn-group dropleft">
                            <button type="button" class="btn btn-dark btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <font-awesome-icon :icon="['fas', 'chevron-left']" />
                            </button>

                            <div class="dropdown-menu">
                                <h6 class="dropdown-header">{{ user.name }}</h6>
                                <router-link :to="`/admin/users/${user._id}/edit`" class="dropdown-item">
                                    <font-awesome-icon :icon="['fas', 'user-edit']" class="mr-2" /> Editar
                                </router-link>

                                <button class="dropdown-item" @click.prevent="deleteUser(user._id)">
                                    <font-awesome-icon :icon="['fas', 'user-times']" class="mr-2" /> Excluir
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useUsersDetails from '@/composables/useUsersDetails'

export default {
    name: 'Users',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { users, fetchAllUsers, deleteUser, isLoading, error } = useUsersDetails()

        fetchAllUsers()

        return {
            users,
            deleteUser,
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
            &.fa-check { color: var(--success) }
            &.fa-times { color: var(--danger) }
        }
        
        .btn-group.dropleft {
            .dropdown-menu {
                max-width: 14rem;

                .dropdown-header,
                .dropdown-item {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

    }
}

@media (max-width: 767px) {
    table thead tr th.min-width {
        min-width: 12rem
    }
}
</style>
