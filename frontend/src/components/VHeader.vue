<template>
<header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-lg container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand">ProShop</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            <font-awesome-icon :icon="['fas', 'home']" fixed-width />
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'cart' }" class="nav-link">
                            <font-awesome-icon :icon="['fas', 'shopping-cart']" fixed-width />
                            Cart
                            <span class="badge rounded-circle">{{ cartCount }}</span>
                        </router-link>
                    </li>

                    <li class="nav-item dropdown" v-if="user._id">
                        <a class="nav-link dropdown-toggle" href="#" id="userMenuDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <font-awesome-icon :icon="['fas', 'user']" fixed-width />
                            {{ user.name }}
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userMenuDropdown">
                            <router-link :to="{ name: 'profile' }" class="dropdown-item">Profile</router-link>

                            <div v-if="user.isAdmin">
                                <div class="dropdown-divider"></div>
                                <h6 class="dropdown-header">
                                    <font-awesome-icon :icon="['fas', 'user-cog']" fixed-width />
                                    Admin
                                </h6>

                                <router-link :to="{ name: 'admin.users.index' }" class="dropdown-item">Users</router-link>
                                <router-link :to="{ name: 'admin.products.index' }" class="dropdown-item">Products</router-link>
                                <router-link to="/admin/orders" class="dropdown-item">Orders</router-link>
                            </div>

                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" @click="logoutUser">
                                Logout
                            </button>
                        </div>
                    </li>
                    <li class="nav-item" v-else>
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <font-awesome-icon :icon="['fas', 'user']" fixed-width />
                            Sign In
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
import { computed } from 'vue'
import { useStore } from 'vuex'
import useUsersAuthentication from '@/composables/useUsersAuthentication.js'

export default {
    name: 'VHeader',
    setup() {
        const store = useStore()
        const cartCount = computed(() => store.getters['getCartCount'])
        const { user, logoutUser } = useUsersAuthentication()
    
        return {
            cartCount,
            user,
            logoutUser
        }
    },
    mounted() {
        // Close collapsed navbar after clicking any nav-link
        $(document).on('click', `
            .navbar-collapse.show .nav-item .nav-link:not('.dropdown-toggle'),
            .navbar-collapse.show .nav-item.dropdown .dropdown-menu a.dropdown-item
        `, () => {
            $('.navbar-collapse.show').collapse('hide')
        })
    }
}
</script>

<style scoped lang="scss">
.navbar {
    .navbar-nav {
        .nav-link {
            font-weight: 600;

            margin-left: 1.2rem;

            > .badge {
                color: #000;
                background-color: rgba(255, 255, 255, .5);
            }
        }

        .dropdown-item { font-weight: 600; }

        .dropdown-item.router-link-active,
        .nav-link.router-link-active {
            color: var(--secondary);

            > .badge { background-color: var(--secondary) }
        }
    }
}
</style>
