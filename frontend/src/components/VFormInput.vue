<template>
<div class="form-group" :class="{'mb-5': errors.length}">
    <input
        :class="['form-control', errors.length ? 'is-invalid' : '']"
        v-bind="{
            id: inputId,
            type,
            autofocus,
            autocomplete
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
    <label :for="inputId">{{ label }}</label>

    <span class="invalid-feedback" role="alert">
        <strong>{{ errors[0] }}</strong>
    </span>
</div>
</template>

<script>
export default {
    name: 'VFormInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        inputId: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        errors: { type: Array, default: [] },
        autofocus: { type: Boolean, default: false },
        autocomplete: { type: Boolean, default: false }
    },
    emits: {
        'update:modelValue': null
    },
    mounted() {
        this.triggerLabelActiveClass()
    },
    updated() {
        this.triggerLabelActiveClass()
    },
    methods: {
        triggerLabelActiveClass() {
            const input = document.getElementById(this.inputId)
            input.value.length !== 0 ? input.classList.add('active') : input.classList.remove('active')
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.mb-5 { margin-bottom: 2.25rem !important }

.form-group {
    position: relative;
    background-color: $white;

    label {
        position: absolute;
        top: 26%; left: 1.06rem;
        z-index: 1;
        cursor: text;
        transition: all .1s ease-out;
        color: $gray-600;
    }
    input.active ~ label,
    input:focus ~ label {
        transform: translateY(-1.75em);
        background-color: inherit;
        padding: 0 .25rem;
        font-size: .8em;
        font-weight: 700;
    }
    input:focus ~ label { color: $primary }
    input.is-invalid ~ label { color: $danger }

    input {
        height: calc(1.5em + 1.5rem + 2px);
        padding: .75rem 1rem;

        &:focus {
            border-color: $primary;
            border-width: 2px;
        }
        &.is-invalid { border-color: $danger }
    }

    span.invalid-feedback {
        position: absolute;
        top: 100%; left: 0;
    }
}
</style>
