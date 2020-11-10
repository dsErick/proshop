export default fn => (context, payload) => {
    context.commit('utils/setLoading', true, { root: true })

    Promise.resolve(fn(context, payload))
        .catch(err => {
            console.log(err, err.response)
            let error = err.response && err.response.data.message
                ? err.response.data.message
                : err.message

            context.commit('utils/setError', error, { root: true })
        })
        .finally(() => {
            context.commit('utils/setLoading', false, { root: true })
        })
}