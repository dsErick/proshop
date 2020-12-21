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
                    <th>Name</th>
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
                        <router-link
                            :to="`/admin/users/${user._id}/edit`"
                            class="btn btn-link btn-sm text-dark"
                        >
                            <font-awesome-icon :icon="['fas', 'user-edit']" />
                        </router-link>
                        <button class="btn btn-link btn-sm text-danger" @click.prevent="deleteUser(user._id)">
                            <font-awesome-icon :icon="['fas', 'user-times']" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import useUsersAuthentication from '@/composables/useUsersAuthentication'

export default {
    name: 'Users',
    components: {
        VLoader: defineAsyncComponent(() => import(/* webpackChunkName: "loader-component" */ '@/components/utils/VLoader')),
        VAlert: defineAsyncComponent(() => import(/* webpackChunkName: "message-component" */ '@/components/utils/VAlert'))
    },
    setup() {
        const { isLogged } = useUsersAuthentication()
        isLogged()

        const store = useStore()

        store.dispatch('fetchAllUsers')
        const users = computed(() => store.getters['getAllUsers'])
        const deleteUser = userId => console.log(userId)
        
        return {
            users,
            deleteUser,
            isLoading: computed(() => store.getters['utils/isLoading']),
            error: computed(() => store.getters['utils/getError']),
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

table {
    thead tr th,
    tbody tr td {
        text-align: center;
        vertical-align: middle;

        svg {
            &.fa-check { color: $success }
            &.fa-times { color: $danger }
        }
    }
}
</style>
