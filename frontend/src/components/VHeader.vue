<template>
<header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-lg container-fluid">
            <router-link :to="{ name: 'Home' }" class="navbar-brand">ProShop</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'Home' }" class="nav-link">
                            <font-awesome-icon :icon="['fas', 'home']" fixed-width />
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'Cart' }" class="nav-link">
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
                            <router-link :to="{ name: 'Profile' }" class="dropdown-item">Profile</router-link>

                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item" @click="logoutUser">
                                Logout
                            </button>
                        </div>
                    </li>
                    <li class="nav-item" v-else>
                        <router-link :to="{ name: 'Login' }" class="nav-link">
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
        $(document).on('click', '.navbar-collapse.show .nav-item .nav-link', () => {
            $('.navbar-collapse.show').collapse('hide')
        })
    }
}
</script>

<style scoped lang="scss">
.navbar {
    // .navbar-brand {
    //     color: $navbar-dark-brand-color;

    //     @include hover-focus() {
    //         color: $navbar-dark-brand-hover-color;
    //     }
    // }

    .navbar-nav {
        .nav-link {
            font-weight: 600;

            margin-left: 1.2rem;

            > .badge {
                color: #000;
                background-color: rgba(255, 255, 255, .5);
            }
        }

        // .show > .nav-link,
        // .active > .nav-link,
        // .nav-link.show,
        // .nav-link.active,
        .nav-link.router-link-active {
            color: #42b983;

            > .badge { background-color: #42b983 }
        }
    }

    // .navbar-toggler {
    //     color: $navbar-dark-color;
    //     border-color: $navbar-dark-toggler-border-color;
    // }

    // .navbar-toggler-icon {
    //     background-image: escape-svg($navbar-dark-toggler-icon-bg);
    // }
}
</style>
