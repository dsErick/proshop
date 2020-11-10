export default fn => (context, payload) => {
    context.commit('utils/setLoading', true, { root: true })

    Promise.resolve(fn(context, payload))
        .catch(err => {
            console.log(err, err.response)
        })
        .finally(() => {
            context.commit('utils/setLoading', false, { root: true })
        })
}