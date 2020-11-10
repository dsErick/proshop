<template>
<div
    class="alert"
    :class="type"
    role="alert"
>
    <strong>{{ message }}</strong>
</div>
</template>

<script>
export default {
    name: 'VAlert',
    props: {
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'alert-danger'
        }
    }
}
</script>

<style scoped lang="scss">
</style>
