export default fn => (context, payload) => {
    context.commit('utils/setLoading', true, { root: true })

    return Promise.resolve(fn(context, payload))
        .then(res => {
            context.commit('utils/resetError', null, { root: true })

            return res ?? true
        })
        .catch(err => {
            console.log(err, err.response)
            const error = {
                message: err.response && err.response.data.message ? err.response.data.message : err.message,
                errors: err.response && err.response.data.errors ? err.response.data.errors : undefined,
                status: err.response ? err.response.status : undefined,
            }

            if (err.response && err.response.data.message === 'Authentication token expired') 
                context.dispatch('logoutUser')
                
            context.commit('utils/setError', error, { root: true })
        })
        .finally(() => {
            context.commit('utils/setLoading', false, { root: true })
        })
}