<template>
<div id="spinner-wraper">
    <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'VLoader'
}
</script>

<style scoped lang="scss">
#spinner-wraper {
    position: fixed;
    top: 0; right: 0;
    bottom: 0; left: 0;
    z-index: 1030;
    
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .2);

    .spinner-border {
        width: 3rem;
        height: 3rem;
    }
}
</style>
