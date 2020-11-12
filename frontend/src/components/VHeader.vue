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
                            <span class="badge rounded-circle">
                                {{ cart }}
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <router-link to="/login" class="nav-link">
                            <font-awesome-icon :icon="['fas', 'user']" fixed-width />
                            Sign In
                        </router-link> -->
                        <a class="nav-link" href="#">
                            <font-awesome-icon :icon="['fas', 'user']" fixed-width />
                            Sign In
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import 'bootstrap/js/dist/collapse'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'VHeader',
    setup() {
        const store = useStore()

        const cart = computed(() => store.getters['getCartCount'])

        return {
            cart
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
