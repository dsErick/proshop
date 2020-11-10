let isLoading = 0

const state = {
    loading: false,
    error: null
}

const getters = {
    isLoading: state => state.loading,
    getError: state => state.error
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

    resetError: state => state.error = null,
    setError: (state, error) => state.error = error
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
