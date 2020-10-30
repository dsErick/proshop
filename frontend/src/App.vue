<template>
    <v-header />
    
    <main class="min-vh-100 py-3">
        <router-view />
    </main>

    <v-footer />
</template>

<script>
import VHeader from './components/VHeader'
import VFooter from './components/VFooter'

export default {
    components: {
        VHeader,
        VFooter
    }
}
</script>

<style lang="scss">
#app {
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
}
</style>
