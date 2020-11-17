<template>
<div class="form-group">
    <input
        class="form-control"
        v-bind="{
            id: inputId,
            type,
            autofocus,
            autocomplete
        }"
        :value="modelValue"
        @input="updateValue"
    >
    <label :for="inputId">{{ label }}</label>
</div>
</template>

<script>
export default {
    name: 'VFormInput',
    props: {
        modelValue: {
            type: [Number, String],
            default: ''
        },
        inputId: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, default: 'text' },
        autofocus: { type: Boolean, default: false },
        autocomplete: { type: Boolean, default: false }
    },
    emits: {
        'update:modelValue': null
    },
    methods: {
        updateValue(e) {
            const input = document.getElementById(this.inputId)

            e.target.value.length !== 0 ? input.classList.add('active') : input.classList.remove('active')
            
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style scoped lang="scss">
.form-group {
    position: relative;
    background-color: white;

    label {
        position: absolute;
        top: 26%; left: 1.06rem;
        z-index: 1;
        cursor: text;
        transition: all .1s ease-out;
        color: #6c757d;
    }
    input.active ~ label,
    input:focus ~ label {
        transform: translateY(-1.75em);
        background-color: inherit;
        padding: 0 .25rem;
        font-size: .8em;
        font-weight: 700;
    }
    input:focus ~ label { color: #007bff }

    input {
        height: calc(1.5em + 1.5rem + 2px);
        padding: .75rem 1rem;

        &:focus {
            border-color: #007bff;
            border-width: 2px;
        }
    }
}
</style>
