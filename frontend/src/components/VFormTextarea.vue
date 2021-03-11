<template>
<div class="form-group" :class="{'mb-5': errors.length}">
    <textarea
        :class="['form-control', errors.length ? 'is-invalid' : '']"
        rows="1"
        v-bind="{
            id: inputId,
            required,
            autofocus
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <label :for="inputId">{{ label }}</label>

    <span class="invalid-feedback" role="alert">
        <strong>{{ errors[0] }}</strong>
    </span>
</div>
</template>

<script>
export default {
    name: 'VFormTextarea',
    props: {
        modelValue: { type: String, default: '' },
        inputId: { type: String, required: true },
        label: { type: String, required: true },
        errors: { type: Array, default: [] },
        required: { type: Boolean, default: false },
        autofocus: { type: Boolean, default: false },
    },
    emits: {
        'update:modelValue': null
    },
    updated() {
        this.setElementHeightAndActiveClass()
    },
    methods: {
        setElementHeightAndActiveClass() {
            const textarea = document.getElementById(this.inputId)

            const textareaHeight = textarea.getBoundingClientRect().height
            const scrollHeight = textarea.scrollHeight

            // Set element height
            if (textareaHeight < scrollHeight) textarea.style.height = `${scrollHeight + 4}px`
            
            // Trigger label active class
            textarea.value.length !== 0 ? textarea.classList.add('active') : textarea.classList.remove('active')
        }
    }
}
</script>

<style scoped lang="scss">
// .mb-5 { margin-bottom: 2.25rem !important }

.form-group {
    position: relative;
    background-color: var(--white);

    label {
        position: absolute;
        top: .8em; left: 1.06rem;
        z-index: 1;
        cursor: text;
        transition: all .1s ease-out;
        color: var(--gray);
    }

    textarea.active ~ label,
    textarea:focus ~ label {
        transform: translateY(-1.45em);
        background-color: inherit;
        padding: 0 .25rem;
        font-size: .8em;
        font-weight: 700;
    }

    textarea:focus ~ label { color: var(--primary) }
    textarea.is-invalid ~ label { color: var(--danger) }

    textarea {
        height: calc(1.5em + 1.5rem + 2px);
        max-height: calc(1.5em + 8em);

        padding: .7rem 1rem;
        resize: none;

        &:focus {
            border-color: var(--primary);
            border-width: 2px;
        }
        
        &.is-invalid { border-color: var(--danger) }
    }

    span.invalid-feedback {
        position: absolute;
        top: 100%; left: 0;
    }
}
</style>
