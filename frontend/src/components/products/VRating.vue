<template>
<div class="rating">
    <span :class="color">
        <font-awesome-icon :icon="value >= 1 ? ['fas', 'star'] : value >= 0.5 ? ['fas', 'star-half-alt'] : ['far', 'star']" />
        <font-awesome-icon :icon="value >= 2 ? ['fas', 'star'] : value >= 1.5 ? ['fas', 'star-half-alt'] : ['far', 'star']" />
        <font-awesome-icon :icon="value >= 3 ? ['fas', 'star'] : value >= 2.5 ? ['fas', 'star-half-alt'] : ['far', 'star']" />
        <font-awesome-icon :icon="value >= 4 ? ['fas', 'star'] : value >= 3.5 ? ['fas', 'star-half-alt'] : ['far', 'star']" />
        <font-awesome-icon :icon="value >= 5 ? ['fas', 'star'] : value >= 4.5 ? ['fas', 'star-half-alt'] : ['far', 'star']" />
    </span>
    <span v-if="text">
        {{ text }}
    </span>
</div>
</template>

<script>
export default {
    name: 'VRating',
    props: {
        value: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'text-warning'
        }
    }
}
</script>

<style scoped lang="scss">
.rating {
    span:first-of-type {
        svg {
            margin-right: .0625rem;
        }
    }
}
</style>
