import axios from 'axios'
import actionHandler from '../actionHandler'

const initialUserState = () => (JSON.parse(localStorage.getItem('user')) ?? {
    _id: '',
    name: '',
    email: '',
    isAdmin: false,
    token: null
})

const state = {
    user: initialUserState()
}

const getters = {
    getUser: state => state.user
}

const actions = {
    loginUser: actionHandler(async ({ commit }, { email, password }) => {
        const { data } = await axios.post('/api/users/login', { email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        
        commit('setUser', data.data)
        commit('utils/resetError', null, { root: true })
    }),
    logoutUser({ commit }) {
        localStorage.removeItem('user')
        commit('resetUser')
    },
    registerUser: actionHandler(async ({ commit }, { name, email, password }) => {
        const { data } = await axios.post('/api/users', { name, email, password })

        localStorage.setItem('user', JSON.stringify(data.data))
        
        commit('setUser', data.data)
        commit('utils/resetError', null, { root: true })
    })
}

const mutations = {
    setUser: (state, newUser) => Object.keys(newUser).forEach(key => state.user[key] = newUser[key]),
    resetUser: state => state.user = initialUserState()
}

export default {
    state,
    getters,
    actions,
    mutations
}
