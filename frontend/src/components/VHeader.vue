<template>
<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-lg container-fluid">
            <a class="navbar-brand" href="#">ProShop</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <router-link to="/cart" class="nav-link">Cart</router-link> -->
                        <a class="nav-link" href="#">Cart</a>
                    </li>
                    <li class="nav-item">
                        <!-- <router-link to="/login" class="nav-link">Sign In</router-link> -->
                        <a class="nav-link" href="#">Sign In</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import 'bootstrap/js/dist/collapse'

export default {
    name: 'VHeader',
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
        }

        .show > .nav-link,
        .active > .nav-link,
        .nav-link.show,
        .nav-link.active,
        .nav-link.router-link-exact-active {
            color: #42b983;
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
