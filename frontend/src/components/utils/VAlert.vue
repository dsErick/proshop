<template>
<div
    class="alert"
    :class="type"
    role="alert"
>
    <strong>
        <slot />
    </strong>
</div>
</template>

<script>
export default {
    name: 'VAlert',
    props: {
        type: {
            type: String,
            default: 'alert-danger'
        }
    }
}
</script>

<style scoped lang="scss">
</style>
