export default fn => (context, payload) => {
    context.commit('utils/setLoading', true, { root: true })

    return Promise.resolve(fn(context, payload))
        .then(() => {
            context.commit('utils/resetError', null, { root: true })

            return true
        })
        .catch(err => {
            console.log(err, err.response)
            const error = {
                message: err.response && err.response.data.message ? err.response.data.message : err.message,
                errors: err.response && err.response.data.errors ? err.response.data.errors : undefined
            }

            // if (err.response.status === 422) {
            //     error = {
            //         message: err.response.data.message,
            //         errors: err.response.data.errors
            //     }
            // }
                
            context.commit('utils/setError', error, { root: true })
        })
        .finally(() => {
            context.commit('utils/setLoading', false, { root: true })
        })
}