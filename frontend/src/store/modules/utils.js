let isLoading = 0

const state = {
    loading: false,
    errors: null
}

const getters = {
    isLoading: state => state.loading,
    getErrors: state => state.errors
}

const mutations = {
    setLoading: (state, value) => {
        if (value) {
            state.loading = true
            isLoading++

        } else {
            isLoading--
            if (isLoading === 0) state.loading = false
        }
    },

    resetErrors: state => state.errors = null,
    setErrors: (state, errors) => state.errors = errors
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
